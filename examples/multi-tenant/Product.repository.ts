import { MultiTenantCrudRepository } from '../../src';
import { ProductTable } from './schema';
import { InjectDb, NestByteOrmDb } from '@nestbyte/orm';
import { eq, InferModel } from 'drizzle-orm';

export class ProductRepository extends MultiTenantCrudRepository<
  typeof ProductTable
> {
  constructor(@InjectDb() db: NestByteOrmDb) {
    super(db, ProductTable);
  }

  async getProducts(userAccessibleTenants: string[]) {
    return await this.findWithAccessibleTenantId(
      userAccessibleTenants,
    ).execute();
  }

  async getProductById(userAccessibleTenants: string[], productId: string) {
    return await this.findWithAccessibleTenantId(userAccessibleTenants)
      .where(eq(ProductTable.id, productId))
      .execute();
  }

  async deleteProductById(userAccessibleTenants: string[], productId: string) {
    await this.deleteWithAccessibleTenantId(
      userAccessibleTenants,
      eq(ProductTable.id, productId),
    ).execute();
  }

  async updateProductById(
    userAccessibleTenants: string[],
    productId: string,
    product: InferModel<typeof ProductTable, 'insert'>,
  ) {
    await this.updateWithAccessibleTenantId(userAccessibleTenants, {
      ...product,
      id: productId,
    }).execute();
  }
}
