const { connectToDB, client: db } = require('../config/db');

const doneCommand = async (tasks) => {
  await connectToDB();
  for (const task of tasks) {
    await db.query('UPDATE tasks SET status = $1 WHERE id = $2', [
      'done',
      Number.parseInt(task),
    ]);
  }
  await db.end();
  console.log('Tasks marked as done successfully!');
  process.exit(0);
};

module.exports = {
  doneCommand,
};
