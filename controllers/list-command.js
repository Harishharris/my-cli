const { connectToDB, client: db } = require('../config/db');

const listCommand = async (options) => {
  await connectToDB();
  if (options.all) {
    const tasks = await db.query('SELECT * FROM tasks');
    console.table(tasks.rows);
    db.end();
    return;
  }
  if (options.number) {
    const tasks = await db.query('SELECT * FROM tasks OFFSET 0 LIMIT $1', [
      Number.parseInt(options.number),
    ]);
    console.table(tasks.rows);
    db.end();
    return;
  }
  const tasks = await db.query('SELECT * FROM tasks');
  console.table(tasks.rows);
  db.end();
};

module.exports = {
  listCommand,
};
