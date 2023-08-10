import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const authProviders = pgEnum('auth_provider', ['local', 'google']);

export const UserCredentialsTable = pgTable('user_credential', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('user_name', { length: 256 }).unique().notNull(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  provider: authProviders('provider').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
