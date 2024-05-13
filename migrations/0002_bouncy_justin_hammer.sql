ALTER TABLE users ADD `salt` text;
CREATE UNIQUE INDEX `books_title_unique` ON `books` (`title`);
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);