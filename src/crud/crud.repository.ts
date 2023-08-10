import { NestByteOrmDb } from '@nestbyte/orm';
import { InferModel } from 'drizzle-orm';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';

export abstract class CrudRepository<T extends PgTableWithColumns<any>> {
  protected constructor(protected db: NestByteOrmDb, protected table: T) {}

  protected create(model: InferModel<T, 'insert'>) {
    return this.db.insert(this.table).values(model);
  }

  protected find() {
    return this.db.select().from(this.table);
  }

  protected delete() {
    return this.db.delete(this.table);
  }

  protected update(model: InferModel<T, 'insert'>) {
    return this.db.update(this.table).set(model);
  }
}
