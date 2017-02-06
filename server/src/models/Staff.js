const qg = require('../db/queryGenerator')

class Staff {
  constructor() {
    this.TABLE_NAME = 'staff'
  }

  get dbprops () {
    return {
      table: this.TABLE_NAME,
      types: {
        id: 'NUMBER NOT NULL',
        name: 'VARCHAR(256)',
        title: 'VARCHAR(256)',
        salary: 'NUMERIC(16,2)',
      },
      primary: ['id'],
    }
  }

  create({ name, title, salary }) {
    return qg.insert(this.TABLE_NAME)({ name, title, salary })
  }

  get(id) {
    if (id) {
      return qg.select(this.TABLE_NAME)({ where: [['id', '=', id]]})
    } else {
      return qg.select(this.TABLE_NAME)()
    }
  }

  update(id, { name, title, salary }) {
    return qg.update(this.TABLE_NAME)({
      props: { name, title, salary },
      where: [['id', '=', id]]
    })
  }

  delete(id) {
    return qg.delete(this.TABLE_NAME)({
      where: [['id', '=', id]]
    })
  }

  getAddresses(staffMember) {
    return qg.select('address')({
      where: [['staff_address.staff_id', '=', staffMember.id]],
      join: [{
        table: 'staff_address',
        on: [['staff_address.address_id', '=', 'address.id']]
      }]
    })
  }
}

const staff = new Staff()

module.exports = staff
