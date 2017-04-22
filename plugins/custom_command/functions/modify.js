var main = function(msg, db) {

	// Check if the user can create a command
	if(JSON.parse(msg).rank >= 3) {
		var split_msg = JSON.parse(msg).msg.split(' ');
		if(split_msg[2].indexOf('~') == 0) {
			var com = db.prepare('SELECT res FROM main.commands WHERE command LIKE ' + '"' + split_msg[2].toLowerCase()  + '"').get();
			if(com) {
				if(split_msg.length == 5) {
					db.prepare('UPDATE main.commands SET res="' +  split_msg[3] + '", ul="' + split_msg[4]  + '" WHERE command LIKE ' + '"' + split_msg[2].toLowerCase()  + '"').run();
				} else {
					var full_res = JSON.parse(msg).msg.replace(split_msg[0], '').replace(split_msg[1], '').replace(split_msg[2], '').replace(split_msg[(split_msg.length - 1)], '').replace('   ', '');
					db.prepare('UPDATE main.commands SET res="' +  full_res + '", ul="' + split_msg[(split_msg.length - 1)]  + '" WHERE command LIKE ' + '"' + split_msg[2].toLowerCase()  + '"').run();
				};
				return 'Command Modified';
			} else {
				return 'Command not found!';
			};
		};
	} else {
		return "You're not important enough!";
	};
};

module.exports.main = main;
