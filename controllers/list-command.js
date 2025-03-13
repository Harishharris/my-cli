const { connectToDB, client: db } = require('../config/db');

const listCommand = async (options) => {
  await connectToDB();
  if (options.all) {
    const tasks = await db.query('SELECT * FROM tasks ORDER BY id');
    console.table(tasks.rows);
    db.end();
    process.exit(0);
    return;
  }
  if (options.number) {
    const tasks = await db.query(
      'SELECT * FROM tasks ORDER By id OFFSET 0 LIMIT $1',
      [Number.parseInt(options.number)]
    );
    console.table(tasks.rows);
    db.end();
    process.exit(0);
    return;
  }
  if (options.done) {
    const doneTasks = await db.query('SELECT * FROM tasks WHERE status = $1', [
      'done',
    ]);
    db.end();
    console.table(doneTasks.rows);
    process.exit(0);
    return;
  }
  if (options.inprogress) {
    const inProgressTasks = await db.query(
      'SELECT * FROM tasks WHERE status = $1',
      ['inprogress']
    );
    db.end();
    console.table(inProgressTasks.rows);
    process.exit(0);
    return;
  }
  if (options.todo) {
    const todoTasks = await db.query('SELECT * FROM tasks WHERE status = $1', [
      'todo',
    ]);
    db.end();
    console.table(todoTasks.rows);
    process.exit(0);
    return;
  }
  const tasks = await db.query('SELECT * FROM tasks ORDER BY id');
  db.end();
  console.table(tasks.rows);
  process.exit(0);
};

module.exports = {
  listCommand,
};
