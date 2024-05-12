import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const books = sqliteTable("books", {
  id: integer("id").primaryKey(),
  title: text("title").unique().notNull(),
  author: text("author").notNull(),
  description: text("description").notNull(),
});

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  salt: text("salt").notNull(),
});
