class DdlQueryGenerator {
  getCreationInstructions(model, DEFAULT_AUTO_INCREMENT_KEY = 'id') {
    function withAutoIncrement(table) {
      const createSequence = `CREATE SEQUENCE ${table}_id_seq START WITH 1 INCREMENT BY 1`
      const createTrigger = `
CREATE OR REPLACE TRIGGER ${table}_insert
BEFORE INSERT ON ${table}
FOR EACH ROW
BEGIN
  SELECT ${table}_id_seq.nextval INTO :new.${DEFAULT_AUTO_INCREMENT_KEY} FROM dual;
END;`

      return [createSequence, createTrigger]
    }

    const { table, types, primary, foreign } = model.dbprops
    const createTable = `
CREATE TABLE ${table} (
${Object.keys(types).map(prop => `  ${prop} ${types[prop]}`).join(',\n')},
${foreign ? foreign.map(([key, tableWithKey]) => `  FOREIGN KEY (${key}) REFERENCES ${tableWithKey}`).join(',\n') + ',': ''}
  PRIMARY KEY (${primary.join(', ')})
)`

    return DEFAULT_AUTO_INCREMENT_KEY in types
      ? [createTable, ...withAutoIncrement(table)]
      : [createTable]
  }

  getTeardownInstructions(model, DEFAULT_AUTO_INCREMENT_KEY = 'id') {
    function teardownAutoIncrement(table) {
      const dropTrigger = `DROP TRIGGER ${table}_insert`
      const dropSequence = `DROP SEQUENCE ${table}_id_seq`

      return [dropTrigger, dropSequence]
    }

    const { table, types, primary, foreign } = model.dbprops

    const dropTable = `DROP TABLE ${table}`

    return DEFAULT_AUTO_INCREMENT_KEY in types
      ? [...teardownAutoIncrement(table), dropTable]
      : [dropTable]
  }

  flattenInstructions(models, generator) {
    return models.reduce(
      (result, model) => result.concat(generator(model)),
      []
    )
  }
}

const dqg = new DdlQueryGenerator
module.exports = dqg
