import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const books = sqliteTable("books", {
	id: integer("id").primaryKey(),
	title: text("title"),
	author: text("author"),
	description: text("description"),
});

export const users = sqliteTable("users", {
	id: integer("id").primaryKey(),
	username: text("username"),
	password: text("password"),
});
