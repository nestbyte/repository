import { UserCredentialsTable } from './schema';
import { InferModel } from 'drizzle-orm';

export type CreateUserCredentialsModel = Omit<
  InferModel<typeof UserCredentialsTable, 'insert'>,
  'id'
>;
