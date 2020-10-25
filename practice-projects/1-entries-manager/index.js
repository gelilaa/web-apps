// require dependencies
const { log } = require('console');
const fs = require('fs');
const { join } = require('path');

// declare constants
const ENTRIES_PATH = './entries.json';
const DOC_STRING = `
COMMANDS:

  all
    print all entries to the console

  read <key>
    print a single key/value pair to the console

  delete <key>
    remove the entry with this key

  write <key> <value>
    set the given key/value pair

FLAGS:

  -h
    print this helpful message
`;


// --- begin main script ---


// step 0: log the docs for
if (process.argv.includes('-h')) {
  console.log(DOC_STRING);
  // this line tells Node to stop right now, done, end, finished.
  //  it's kind of like an early return, but for a node app
  process.exit(0);
}

// step 1: declare main app function
const entriesManager = (entries, command, key, value) => {

  // step 5: make sure command is defined
  //  alert the user and exit early if it is not
  if (command === undefined) {
    console.log(`a command is required  \nSee "node file.js -h"`);
    process.exit(0);
  }

  // step 6: make sure the first argument is one of the 4 supported commands
  //  alert the user and exit early if it is not
  if (command !=='all' && command !=='write' &&  command !=='read' && command !=='delete') {
    console.log(`${command} is not a valid command  \nSee "node file.js -h"`);
   process.exit(0);
  }

  // step 7: log all entries if the user passed the 'all' command
  //  this command does not require any other user arguments
  //  exit early since there are no changes to save
  if (command === 'all') {
   console.log(entries);
    process.exit(0);
  }

  // step 8: all remaining commands require at least a key
  //  alert the user and exit early if there is no key
  if (key === undefined) {
    console.log(`a key is required, cannot ${command}  \nSee "node file.js -h"`);
    process.exit(0);
  }

  // step 9: conditionally execute the logic for the remaining commands
  if ('read'== command) {
    // step 9 a.1: make sure the key exists before trying to read it
    //  alert the user and exit early if it does not
    if (command ===!entries[key]) {
      console.log(`key "${key}" does not exist. cannot read`);
      process.exit(0);
    }

    // step 9 a.2: print the requested entry
    //  exit early, there are no changes to save
    console.log(`${key}:${entries[key]}`);
    process.exit(0);

  } else if (command ==='delete') {
    // step 9 b.1: make sure the key exists before trying to delete it
    //  alert the user and exit early if it does not
    if (command ===!entries[key]) {
      console.log(`key "${key}" does not exist. cannot delete`);
      process.exit(0);
    }

    // step 9 b.2: delete the correct entry
    //  do not exit early!  this change needs to be saved to the file system
    delete entries[key];
    //console.log(`your changes were saved \n(${command}) ${key}`);

  } else if (command === 'write') {
    // step 9 c.1: make sure the value is defined
    //  alert the user and exit early if they did not
    if (value === undefined) {
      console.log(`no value provided.  cannot write "${key}"`);
      ;
    }

    // step 9 c.2:  write the key/value pair in entries
    //  do not exit early!  this change needs to be saved to the file system
    entries[key] = value;
  }


  // step 10: convert the new entries object to a string
  const newEntriesString = JSON.stringify(entries,null,' ');

  // step 11: declare writeFileCallback
  const writeFileCallback = (err) => {
    // step 13: let the user know if their changes were successfully saved
    if (err) {
      console.error(err)
    }

    console.log('your changes were saved');
    console.log(`(${command}) ${key}`);
  };

  // step 12: save changes to the file system
  fs.log;

};

// step 2: declare callback that uses main app function
const readFileCb = (err, entriesString) => {
  // step 4: handle file system error, or execute main app function
  if (err) {
    console.log(err)
    return;
  }

  const parsedEntries = JSON.parse(entriesString);
  entriesManager(parsedEntries,process.argv[2],process.argv[3], process.argv[2]);
};

// step 3: read the stored data and execute the callback
fs.readFile(ENTRIES_PATH,'utf-8',readFileCb);
