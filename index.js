#!/usr/bin/env node

const { program } = require('commander');
const { addCommand } = require('./controllers/add-command');
const { updateCommand } = require('./controllers/update-command');
const { deleteCommand } = require('./controllers/delete-command');
const { listCommand } = require('./controllers/list-command');
const { doneCommand } = require('./controllers/done-command');
const { inProgressCommand } = require('./controllers/inprogress-command');
require('dotenv').config();

/**
 * id
 * task
 * status
 * createdAt
 */

program.version('1.0.0').description('My Node CLI');
program.option('-n, --name <type>', 'Add your name').action((options) => {
  console.log(`Hey, ${options.name || 'Harish'}!`);
});

program.command('add <item...>').description('Add an item').action(addCommand);

program
  .command('update <id> <newItem>')
  .description('Update an item')
  .action(updateCommand);

program
  .command('done <item...>')
  .description('Mark an item as done')
  .action(doneCommand);

program
  .command('inprogress <item...>')
  .description('Mark an item as inprogress')
  .action(inProgressCommand);

program
  .command('del <item...>')
  .description('Delete an item')
  .action(deleteCommand);

program
  .command('list')
  .option('-a, --all', 'List all items')
  .option('-n <number>', 'List n items')
  .option('-d, --done', 'List done items')
  .option('-i, --inprogress', 'List inprogress items')
  .option('-t, --todo', 'List todo items')
  .description('List all items')
  .action(listCommand);

program.parse(process.argv);
