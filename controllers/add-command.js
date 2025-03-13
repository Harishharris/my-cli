const { connectToDB, client: db } = require('../config/db');

const addCommand = async (newTasks) => {
  try {
    await connectToDB();
    for (const task of newTasks) {
      await db.query('INSERT INTO tasks (name, status) VALUES ($1, $2)', [
        task,
        'todo',
      ]);
    }
    await db.end();
    console.log('Tasks added successfully!');
  } catch (error) {
    console.error('Error adding tasks:', error);
    process.exit(1);
  }
  process.exit(0);
};

module.exports = { addCommand };
