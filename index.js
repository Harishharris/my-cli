#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { client: db } = require('./db/db');

try {
  db.connect();
  db.query(
    'CREATE TABLE IF NOT EXISTS tasks (id SERIAL PRIMARY KEY, name TEXT, status BOOLEAN, created_at TIMESTAMP DEFAULT NOW())'
  );
  console.log('Connected to the database');
} catch (error) {
  console.error('Error connecting to the database', error);
}

program.version('1.0.0').description('My Node CLI');

program.option('-n, --name <type>', 'Add your name').action((options) => {
  console.log('here', options);
  console.log(`Hey, ${options.name || 'Harish'}!`);
});

/**
 * id
 * task
 * status
 * createdAt
 */

const data = fs.readFileSync(path.join(__dirname, 'db', 'data.json'), 'utf-8');
const items = JSON.parse(data);
console.log('items', items);

program
  .command('add <item...>')
  .description('Add an item')
  .action((newTasks) => {
    for (const task of newTasks) {
      const newItem = {
        id: items.at(-1).id + 1,
        name: task,
      };
      items.push(newItem);
    }
    fs.writeFileSync(
      path.join(__dirname, 'db', 'data.json'),
      JSON.stringify(items, null, 2)
    );
    console.table(newTasks);
    db.end();
    process.exit(0);
  });

program
  .command('update <id> <newItem>')
  .description('Update an item')
  .action((id, newItem) => {
    const updatedItems = items.map((task) => {
      if (task.id === Number.parseInt(id)) {
        return { ...task, name: newItem };
      }
      return task;
    });
    fs.writeFileSync(
      path.join(__dirname, 'db', 'data.json'),
      JSON.stringify(updatedItems, null, 2)
    );
    console.log(`Updated Successfully item: ${id}`);
    db.end();
    process.exit(0);
  });

program
  .command('del <item...>')
  .description('Delete an item')
  .action((itemsToDelete) => {
    const toBeDeletedItems = new Set();

    for (let i = 0; i < itemsToDelete.length; i++) {
      itemsToDelete[i] = Number.parseInt(itemsToDelete[i]);
      toBeDeletedItems.add(itemsToDelete[i]);
    }

    const filteredTasks = items.filter(
      (task) => !toBeDeletedItems.has(task.id)
    );

    fs.writeFileSync(
      path.join(__dirname, 'db', 'data.json'),
      JSON.stringify(filteredTasks, null, 2)
    );

    // console.log(filteredTasks);
    console.log(`Deleted Successfully item(s): ${itemsToDelete}`);
    db.end();
    process.exit(0);
  });

program
  .command('list')
  .option('-a, --all', 'List all items')
  .option('-n --number <number>', 'List n items')
  .description('List all items')
  .action((options) => {
    if (options.all) {
      console.log('here we are');
      console.table(items);
      return;
    }
    if (options.number) {
      console.log('here', options.number);
      const nItems = items.slice(0, Number.parseInt(options.number));
      console.table(nItems);
      return;
    }
    console.table(items);
    db.end();
    process.exit(0);
  });

program.parse(process.argv);
