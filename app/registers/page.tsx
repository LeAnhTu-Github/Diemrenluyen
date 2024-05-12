export const dynamic = "force-dynamic";
import React from "react";
import RegisterPage from "./RegisterPage";
import ClientOnly from "../components/ClientOnly";
import getRegister from "../actions/getRegister";
import { RegisParam } from "../actions/getRegister";
import getCurrentUser from "../actions/getCurrentUser";
interface HomeProps {
  searchParams: RegisParam;
}
const page = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const regis = await getRegister(searchParams);
  return (
    <ClientOnly>
      <RegisterPage regis={regis} />
    </ClientOnly>
  );
};

export default page;
