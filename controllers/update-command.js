const { connectToDB, client: db } = require('../config/db');

const updateCommand = async (id, newItem) => {
  try {
    await connectToDB();
    await db.query('UPDATE tasks SET name = $1 WHERE id = $2', [
      newItem,
      Number.parseInt(id),
    ]);
    console.log(`Updated Successfully item: ${id}`);
    db.end();
  } catch (err) {
    console.log('Error Updating Tasks:', err);
  }
};

module.exports = {
  updateCommand,
};
