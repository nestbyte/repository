import { SQL } from 'drizzle-orm';

export type Filter = (...args: any) => SQL;
