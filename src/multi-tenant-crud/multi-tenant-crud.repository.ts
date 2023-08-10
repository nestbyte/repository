import { PgTableWithColumns } from 'drizzle-orm/pg-core';
import { NestByteOrmDb } from '@nestbyte/orm';
import { and, inArray, InferModel, SQL } from 'drizzle-orm';
import { CrudRepository } from '../crud/crud.repository';
import { TenantModel } from './model';

export abstract class MultiTenantCrudRepository<
  T extends PgTableWithColumns<any> & TenantModel,
> extends CrudRepository<T> {
  protected constructor(db: NestByteOrmDb, table: T) {
    super(db, table);
  }

  protected findWithAccessibleTenantId(accessibleTenantIds: string[]) {
    return super
      .find()
      .where(inArray(this.table.tenantId, accessibleTenantIds));
  }

  protected deleteWithAccessibleTenantId(
    accessibleTenantIds: string[],
    ...filters: SQL[]
  ) {
    return super
      .delete()
      .where(
        and(inArray(this.table.tenantId, accessibleTenantIds), ...filters),
      );
  }

  protected updateWithAccessibleTenantId(
    accessibleTenantIds: string[],
    model: InferModel<T, 'insert'>,
  ) {
    return super
      .update(model)
      .where(inArray(this.table.tenantId, accessibleTenantIds));
  }
}
