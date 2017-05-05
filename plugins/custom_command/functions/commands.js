var main = function(msg, db) {

	// Check the user level
	if (JSON.parse(msg).rank >= 1) {
		// Get a list of commands
		var comms = db.prepare('SELECT command FROM main.commands').all();

		// Build the final statement
		var finish = "Current active commands are: ";
		for (var i = 0; i<comms.length; i++){
			finish += (comms[i].command + ", ");
		};

		return finish;
	};
};

module.exports.main = main;
