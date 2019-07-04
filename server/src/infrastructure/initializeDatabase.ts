export const deinitializeDatabase = `
	DROP TABLE cs.assignments;

	DROP TABLE cs.chores;

	DROP TABLE cs.laborers;

	DROP TABLE cs.days_of_week;

	DROP TABLE cs.settings;

	DROP SCHEMA cs;
`;

export const initializeDatabase = `
	CREATE SCHEMA cs;

	CREATE TABLE cs.days_of_week (
		day_of_week_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
		, name VARCHAR(255) NOT NULL
	);
	
	INSERT INTO cs.days_of_week (name)
	VALUES
		('Sunday')
		, ('Monday')
		, ('Tuesday')
		, ('Wednesday')
		, ('Thursday')
		, ('Friday')
		, ('Saturday');

	CREATE TABLE cs.chores (
		chore_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
		, name VARCHAR(255) NOT NULL
		, description VARCHAR(255) NOT NULL
		, day_of_week_id INT NOT NULL REFERENCES cs.days_of_week(day_of_week_id)
		, date_deleted DATE NULL
	);
	
	INSERT INTO cs.chores (name, description, day_of_week_id)
	VALUES
		('Clean up bagels', 'Clean up bagels desc', 3)
		, ('Clean up Wednesday lunch', 'Clean up Wednesday lunch desc', 4)
		, ('Wipe down surfaces', 'Wipe down surfaces desc', 6)
		, ('Tidy up food', 'Tidy up food desc', 6)
		, ('Clean out fridge', 'Clean out fridge desc', 6);

	CREATE TABLE cs.laborers (
		laborer_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
		, name VARCHAR(255) NOT NULL
		, email VARCHAR(255) NOT NULL
		, date_deleted DATE NULL
	);
	
	INSERT INTO cs.laborers (name, email)
	VALUES
		('Test 1', 'test1@gmail.com')
		, ('Test 2', 'test2@gmail.com')
		, ('Test 3', 'test3@gmail.com');

	CREATE TABLE cs.assignments (
		assignment_id INT NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY
		, chore_id INT NOT NULL REFERENCES cs.chores(chore_id)
		, laborer_id INT NOT NULL REFERENCES cs.laborers(laborer_id)
		, assignment_date DATE NOT NULL
	);

	CREATE TABLE cs.settings (
		setting_id VARCHAR(100) NOT NULL PRIMARY KEY
		, value VARCHAR(255) NOT NULL
	);
`;
