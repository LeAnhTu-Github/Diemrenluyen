export const dynamic = "force-dynamic";
import React from "react";
import AccountPage from "./AccountPage";
import ClientOnly from "../components/ClientOnly";
import getScore, { IListingsParams } from "../actions/getScore";
import getCurrentUser from "../actions/getCurrentUser";
interface HomeProps {
  searchParams: IListingsParams;
}
const page = async ({ searchParams }: HomeProps) => {
  const currentUser = await getCurrentUser();
  const scores = await getScore(searchParams);
  return (
    <ClientOnly>
      <AccountPage scores={scores} />
    </ClientOnly>
  );
};

export default page;
