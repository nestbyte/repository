import { pgEnum, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const authProviders = pgEnum('auth_provider', ['local', 'google']);

export const ProductTable = pgTable('user_credential', {
  id: uuid('id').primaryKey().defaultRandom(),
  username: varchar('user_name', { length: 256 }).notNull(),
  tenantId: varchar('tenant_id', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const ProductRelations = relations(ProductTable, ({ one }) => ({
  tenant: one(Tenant, {
    fields: [ProductTable.tenantId],
    references: [Tenant.id],
  }),
}));

export const Tenant = pgTable('tenant', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
});
