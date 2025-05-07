import getCurrentUser from "@/app/actions/getCurrentUser";
import { redirect } from "next/navigation";

import prisma from "@/app/libs/prismadb"

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const EventPage = async () => {
  
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  // Add missing properties to the events array
  const updatedEvents = events.map((event) => ({
    ...event,
    price: null,
    categoryId: null,
  }));

  return (
    <div className="p-6">
      <DataTable columns={columns} data={updatedEvents} />
    </div>
  );
};

export default EventPage;
