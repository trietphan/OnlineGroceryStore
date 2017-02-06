const dqg = require('./ddlQueryGenerator')
const getCreationInstructions = dqg.getCreationInstructions
const getTeardownInstructions = dqg.getTeardownInstructions

class Model {
  constructor(dbprops) {
    this.dbprops = dbprops
  }
}

const baseProps = {
  table: 'duck',
  types: {
    id: 'NUMBER NOT NULL',
    name: 'VARCHAR(256)',
    size: 'NUMERIC(6,2)',
  },
  primary: ['id'],
}

const withoutForeign = new Model(baseProps)
const withForeign = new Model({
  ...baseProps,
  foreign: [
    ['address', 'address(id)'],
  ],
})

const withMultipleForeign = new Model({
  ...baseProps,
  foreign: [
    ['address', 'address(id)'],
    ['order', 'order(id)']
  ],
})

describe('getCreationInstructions()', () => {

  it('should produce correct queries for models with no fc', () => {
    const expected = [`
CREATE TABLE duck (
  id NUMBER NOT NULL,
  name VARCHAR(256),
  size NUMERIC(6,2),

  PRIMARY KEY (id)
)`, `CREATE SEQUENCE duck_id_seq START WITH 1 INCREMENT BY 1`, `
CREATE OR REPLACE TRIGGER duck_insert
BEFORE INSERT ON duck
FOR EACH ROW
BEGIN
  SELECT duck_id_seq.nextval INTO :new.id FROM dual;
END;`]
    const result = getCreationInstructions(withoutForeign)

    expected.forEach((expected, i) => {
      expect(result[i]).toBe(expected)
    })

  })

  it('should produce correct queries for models with fc', () => {
    const expected = [`
CREATE TABLE duck (
  id NUMBER NOT NULL,
  name VARCHAR(256),
  size NUMERIC(6,2),
  FOREIGN KEY (address) REFERENCES address(id),
  PRIMARY KEY (id)
)`, `CREATE SEQUENCE duck_id_seq START WITH 1 INCREMENT BY 1`, `
CREATE OR REPLACE TRIGGER duck_insert
BEFORE INSERT ON duck
FOR EACH ROW
BEGIN
  SELECT duck_id_seq.nextval INTO :new.id FROM dual;
END;`]
    const result = getCreationInstructions(withForeign)

    expected.forEach((expected, i) => {
      expect(result[i]).toBe(expected)
    })
  })

  it('should produce correct queries for models with multiple fc', () => {
    const expected = [`
CREATE TABLE duck (
  id NUMBER NOT NULL,
  name VARCHAR(256),
  size NUMERIC(6,2),
  FOREIGN KEY (address) REFERENCES address(id),
  FOREIGN KEY (order) REFERENCES order(id),
  PRIMARY KEY (id)
)`, `CREATE SEQUENCE duck_id_seq START WITH 1 INCREMENT BY 1`, `
CREATE OR REPLACE TRIGGER duck_insert
BEFORE INSERT ON duck
FOR EACH ROW
BEGIN
  SELECT duck_id_seq.nextval INTO :new.id FROM dual;
END;`]
    const result = getCreationInstructions(withMultipleForeign)

    expected.forEach((expected, i) => {
      expect(result[i]).toBe(expected)
    })
  })

})

describe('getTeardownInstructions()', () => {

  it(`should produce correct queries to drop a table and it's id sequence + trigger`, () => {
    const expected = [
      `DROP TRIGGER duck_insert`,
      `DROP SEQUENCE duck_id_seq`,
      `DROP TABLE duck`,
    ]

    const result = getTeardownInstructions(withoutForeign)

    expected.forEach((expected, i) => {
      expect(result[i]).toBe(expected)
    })
  })

})
