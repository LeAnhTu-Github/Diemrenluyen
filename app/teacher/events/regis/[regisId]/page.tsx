
import { redirect } from "next/navigation";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb"


import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const RegisPage = async ({ params }: { params: { regisId: string } }) => {
  const currentUser = await getCurrentUser();
  const userId = currentUser?.id;
  if (!userId) {
    return redirect("/");
  }

  const regisUser = await prisma.userRegister.findMany({
    where: {
      eventId: params.regisId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={regisUser} users={regisUser} />
    </div>
  );
};

export default RegisPage;
