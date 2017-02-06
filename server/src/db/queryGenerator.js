class QueryGenerator {
  get helpers() {
    return {
      unzip(props) {
        function handleVal(value) {
          if (typeof(value) === 'number') {
            return value.toString()
          } else if (typeof(value) === 'string') {
            return `'${value}'`
          }
        }

        function handleKey(key) {
          return key.toUpperCase()
        }

        return Object.keys(props).reduce(([keys, vals],  key) => (
          key && props[key] !== undefined && props[key] !== null
            ? [keys.concat([handleKey(key)]),
              vals.concat([handleVal(props[key])])]
            : [keys, vals]
        ), [[], []])
      },

      constructCondsString(conds) {
        function handleStringCond(string) {
          /* Given `prop` returns `PROP`
           * Given `table.prop` return `table.PROP`
           */
          const toks = string.split('.')
          return toks.length === 2
            ? [toks[0].toLowerCase(), toks[1].toUpperCase()].join('.')
            : string.toUpperCase()
        }

        function handleSingleCond(cond) {
          if (typeof(cond) === 'object') {
            return cond.map(l => handleStringCond(l.toString())).join(' ')
          } else if (typeof(cond) === 'string') {
            return handleStringCond(cond)
          }
        }

        return conds.map(handleSingleCond).join(' ')
      }
    }
  }

  select(table) {
    const self = this

    function constructFieldsString(fields) {
      return fields.map(p => p.toUpperCase()).join(', ')
    }

    function setFields(fields) {
      return !fields
        ? `SELECT * FROM ${table}`
        : `SELECT ${constructFieldsString(fields)} FROM ${table}`
    }

    function setConds(query, where) {
      return !where
        ? query
        : `${query} WHERE ${self.helpers.constructCondsString(where)}`
    }

    function setJoins(query, joinProps) {
      function handleJoinProp({ table, on }) {
        return `INNER JOIN ${table} ON ${self.helpers.constructCondsString(on)}`
      }
      return !joinProps
        ? query
        : `${query} ${joinProps.map(handleJoinProp).join(' ')}`
    }

    return ({ fields, where, join } = {}) => {
      /* fields: List[String] - case-insensitive properties list:
       *                        to extract props A and B pass in ['a', 'b']
       *
       * where: List[List[String]] - list of conditions with [left, op, right] format
       *                             to extract entries with ids that are greater than 3:
       *                             [['id', '>', 3]]
       *                             to construct a boolean statement do
       *                             [['id', '>', 3], 'and', ['id', '<', 6]]
       * join: List[Object] - each object is { table: String, on: List[List[String]]}
       *                      table is target table
       *                      on is a list of conditions similar to `where` in structure
       */
      const base = setFields(fields)
      const withJoins = setJoins(base, join)

      return setConds(withJoins, where)
    }
  }

  insert(table) {
    const self = this

    return (props) => {
      const [keys, vals] = self.helpers.unzip(props)

      return `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${vals.join(', ')})`
    }
  }

  update(table) {
    const self = this

    return ({ props, where }) => {
      const [keys, vals] = self.helpers.unzip(props)
      const conds = self.helpers.constructCondsString(where)

      return `UPDATE ${table} SET ${keys.map((key, i) => `${key} = ${vals[i]}`).join(', ')} WHERE ${conds}`
    }
  }

  delete(table) {
    const self = this

    return ({ where }) => {
      const conds = self.helpers.constructCondsString(where)

      return `DELETE FROM ${table} WHERE ${conds}`
    }
  }
}

const qg = new QueryGenerator()

module.exports = qg
