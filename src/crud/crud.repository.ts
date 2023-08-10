import { NestByteOrmDb } from '@nestbyte/orm';
import { eq, InferModel } from 'drizzle-orm';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';

export abstract class CrudRepository<T extends PgTableWithColumns<any>> {
  protected constructor(protected db: NestByteOrmDb, private table: T) {}

  protected create(model: InferModel<T, 'insert'>) {
    return this.db.insert(this.table).values(model);
  }

  protected find() {
    return this.db.select().from(this.table);
  }

  protected deleteById(id: string) {
    return this.db.delete(this.table).where(eq(this.table.id, id));
  }

  protected updateById(id: string, model: Omit<InferModel<T, 'insert'>, 'id'>) {
    return this.db
      .update(this.table)
      .set({
        id,
        ...model,
      })
      .where(eq(this.table.id, id));
  }
}
