import { CrudRepository } from '../../src';
import { UserCredentialsTable } from './schema';
import { InjectDb, NestByteOrmDb } from '@nestbyte/orm';
import { CreateUserCredentialsModel } from './models';

export class SignupRepository extends CrudRepository<
  typeof UserCredentialsTable
> {
  constructor(@InjectDb() db: NestByteOrmDb) {
    super(db, UserCredentialsTable);
  }

  async createUser(createUserCredentialsModel: CreateUserCredentialsModel) {
    await this.create(createUserCredentialsModel).execute();
  }
}
