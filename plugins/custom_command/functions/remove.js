var main = function(msg, dir, db) {

	// Check if the user can create a command
	if(JSON.parse(msg).rank >= 3) {
		var split_msg = JSON.parse(msg).msg.split(' ');
		if(split_msg[2].indexOf('~') == 0) {
			var com = db.prepare('SELECT res FROM main.commands WHERE command LIKE ' + '"' + split_msg[2].toLowerCase()  + '"').get();
			if(com) {
				db.prepare('DELETE FROM main.commands WHERE command LIKE ' + '"' + split_msg[2].toLowerCase()  + '"').run();
				return 'Command Removed';
			} else {
				return 'Command not found!';
			};
		};
	} else {
		return "You're not important enough!";
	};
};

module.exports.main = main;
