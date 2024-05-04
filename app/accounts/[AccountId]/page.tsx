import React from "react";
import getScore, { IListingsParams } from "@/app/actions/getScore";
import ClientOnly from "@/app/components/ClientOnly";
import ScoreUser from "./ScoreUser";
import getCurrentUser from "@/app/actions/getCurrentUser";
interface IParams {
  AccountId?: string;
}
interface HomeProps {
  searchParams: IListingsParams;
}

const ProfileAcc = async (
  { params }: { params: IParams },
  { searchParams }: HomeProps = { searchParams: {} }
) => {
  const scores = await getScore(searchParams);
  const scoreFilter = scores.find(
    (score) => score.tradeId === params.AccountId
  );
  return (
    <div className="max-w-[2520px] mx-auto ">
      <div className="w-full h-auto rounded-3xl flex flex-col gap-4">
        <ClientOnly>
          <ScoreUser score={scoreFilter} />
          {/* Pass the resolved value of user */}
        </ClientOnly>
      </div>
    </div>
  );
};

export default ProfileAcc;
