import {  User } from "@prisma/client";

// export type SafeListing = Omit<Score, "createdAt"> & {
//   createdAt: string;
// };
// export type SafeRegis = Omit<Register, "createdAt"> & {
//   createdAt: string;
// };

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export enum STEPS {
  INCREASE = 0,
  REDUCE = 1,
  PROOF = 2,
}
export enum STATUS {
  all = 0,
  join = 1,
  signup = 2,
  notjoin = 3,
}

