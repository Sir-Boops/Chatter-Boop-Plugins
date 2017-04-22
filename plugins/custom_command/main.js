// Node.JS Imports
var Database = require('better-sqlite3');

var version = function(msg) {

	//Split the command up
	var command = (JSON.parse(msg).msg.split(" "));

	// Init the DB
        var db = new Database('commands.db', {memory: false});

	// Make sure the table is there
	db.prepare('CREATE TABLE IF NOT EXISTS main.commands(command TEXT, res TEXT, ul INT)').run();

	if(command[0].toLowerCase() == '~command') {
		// If just the base command
		if(command.length <= 1) {
			return "~command help for help";
		};

		// If ~command help
		if(command.length == 2 && command[1].toLowerCase() == 'help'){
			return 'help!';
		};

		// If ~command add <command> <res> <ul>
		if(command.length >= 4 && command[1].toLowerCase() == 'add') {
			var add = require('./functions/add.js');
			return add.main(msg, dir, db);
		};

		// If ~command remove <command>
		if(command.length == 3 && command[1].toLowerCase() == 'remove') {
			var remove = require('./functions/remove.js');
			return remove.main(msg, dir, db);
		};

		// If ~command modify <command> <res> <ul>
		if(command.length >= 4 && command[1].toLowerCase() == 'modify') {
			var modify = require('./functions/modify.js');
			return modify.main(msg, dir, db);
		};

	} else {
		// Handle checking for other commands
		var res = db.prepare('SELECT res FROM main.commands WHERE command LIKE ' + '"' +  command[0] + '"').get();
		if(res){return res.res};
	};
};

module.exports.main = version;
