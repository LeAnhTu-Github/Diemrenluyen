import { Score, User } from "@prisma/client";
import { Scope } from "eslint";

export type SafeListing = Omit<Score, "createdAt"> & {
  createdAt: string;
};

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

