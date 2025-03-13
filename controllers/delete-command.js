const { connectToDB, client: db } = require('../config/db');

const deleteCommand = async (itemsToDelete) => {
  try {
    await connectToDB();
    for (const item of itemsToDelete) {
      await db.query('DELETE FROM tasks WHERE id = $1', [
        Number.parseInt(item),
      ]);
    }
    console.log(`Deleted Successfully item(s): ${itemsToDelete}`);
    db.end();
  } catch (err) {
    console.log('Erro Deleting items:', err);
  }
};

module.exports = {
  deleteCommand,
};
