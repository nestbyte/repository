import { PgColumn } from 'drizzle-orm/pg-core';

export type TenantModel = {
  tenantId: PgColumn;
};
