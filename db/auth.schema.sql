BEGIN TRANSACTION;
CREATE TABLE `users` (
	`username`	TEXT NOT NULL,
	`password`	TEXT DEFAULT 'temp',
	`admin`	INTEGER NOT NULL DEFAULT 0,
	`changePasswordNow`	INTEGER NOT NULL DEFAULT 1,
	PRIMARY KEY(username)
);
COMMIT;
