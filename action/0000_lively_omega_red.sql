-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `Main` (
	`id` int NOT NULL,
	`nameMain` varchar(10),
	`stateMain` tinyint,
	CONSTRAINT `Main_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Temp` (
	`id` int NOT NULL,
	`nameTemp` varchar(20),
	`state` tinyint,
	CONSTRAINT `Temp_id` PRIMARY KEY(`id`)
);

*/