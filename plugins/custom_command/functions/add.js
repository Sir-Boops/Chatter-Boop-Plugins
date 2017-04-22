var main = function(msg, db) {

	// Check if the user can create a command
	if(JSON.parse(msg).rank >= 3) {
		var split_msg = JSON.parse(msg).msg.split(' ');
		if(split_msg[2].indexOf('~') == 0 && split_msg[(split_msg.length - 1)]) {
			var ans = db.prepare('SELECT ul FROM main.commands WHERE command LIKE ' + '"' + split_msg[2].toLowerCase()  + '"').get();
			if(!ans) {
				if(split_msg.length == 5) {
					db.prepare('INSERT INTO main.commands (command, res, ul) VALUES ($command, $res, $ul)').run({command: split_msg[2], res: split_msg[3], ul: split_msg[4]});
				} else {
					//Remove everything that's not the res
					var full_res = JSON.parse(msg).msg.replace(split_msg[0], '').replace(split_msg[1], '').replace(split_msg[2], '').replace(split_msg[(split_msg.length - 1)], '').replace('   ', '');
					db.prepare('INSERT INTO main.commands (command, res, ul) VALUES ($command, $res, $ul)').run({command: split_msg[2], res: full_res, ul: split_msg[(split_msg.length - 1)]});
				};
				return 'Command added';
			} else {
				return 'Command is already regstered';
			};
		} else {
			return 'Error run ~command help for help';
		};
	} else {
		return "You're not important enough!";
	};
};

module.exports.main = main;
