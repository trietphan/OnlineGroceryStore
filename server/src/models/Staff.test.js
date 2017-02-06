const Staff = require('./Staff')

describe('Staff model', () => {
  it('returns a query that creates a staff member on create()', () => {
    const result = Staff.create({
      name: 'John Doe',
      title: 'Panda',
      salary: 90000,
    })
    const expected = `INSERT INTO staff (NAME, TITLE, SALARY) VALUES ('John Doe', 'Panda', 90000)`
    expect(result).toBe(expected)
  })

  it('returns a query that updates a staff member on update()', () => {
    const result = Staff.update(25, {
      title: 'Penguin',
      salary: 10000,
    })
    const expected = `UPDATE staff SET TITLE = 'Penguin', SALARY = 10000 WHERE ID = 25`
    expect(result).toBe(expected)
  })

  it('returns a query that deletes a staff member on delete()', () => {
    const result = Staff.delete(10)
    const expected = `DELETE FROM staff WHERE ID = 10`
    expect(result).toBe(expected)
  })
})
