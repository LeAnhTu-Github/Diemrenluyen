export const dynamic = "force-dynamic";
import ClientOnly from "./components/ClientOnly";
import Section from "./components/section/Section";
import New from "./components/news/New";
import UserStatis from "./components/userStatics/UserStatic";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from '@/app/libs/prismadb'
import NotFound from "./components/NotFound";
const Home = async () => {
  // Import the 'auth' module
  const currentUser = await getCurrentUser(); // Await the promise to get the actual value
  const session = await getServerSession(authOptions);
  const events = await prisma.event.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const regisEvents = await prisma.userRegister.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!session) {
    return (
      <ClientOnly>
        <div className="max-w-[2520px] h-[80vh] mx-auto bg-white rounded-3xl">
          <NotFound />
        </div>
      </ClientOnly>
    );
  }
  return (
    <div className=" w-full">
      <ClientOnly>
        <div className="max-w-[2520px] mx-auto">
          <Section currentUser={currentUser} />
          <New events={events} userId={currentUser?.id || null} regis={regisEvents}/>
          <UserStatis />
        </div>
      </ClientOnly>
    </div>
  );
};

export default Home;
