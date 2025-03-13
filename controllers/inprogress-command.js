const { connectToDB, client: db } = require('../config/db');

const inProgressCommand = async (id) => {
  try {
    await connectToDB();
    await db.query('UPDATE tasks SET status = $1 WHERE id = $2', [
      'inprogress',
      Number.parseInt(id),
    ]);
    console.log(`Updated Successfully item: ${id}`);
    db.end();
  } catch (err) {
    console.log('Error Updating Tasks:', err);
    process.exit(1);
  }
  process.exit(0);
};

module.exports = {
  inProgressCommand,
};
