export const dynamic = "force-dynamic";
import ClientOnly from "./components/ClientOnly";
import Section from "./components/section/Section";
import New from "./components/news/New";
import UserStatis from "./components/userStatics/UserStatic";
import getCurrentUser from "@/app/actions/getCurrentUser";
const Home = async () => {
  const currentUser = await getCurrentUser(); // Await the promise to get the actual value
  return (
    <div className=" w-full">
      <ClientOnly>
        <div className="max-w-[2520px] mx-auto ">
          <Section currentUser={currentUser} />
          <New />
          <UserStatis />
        </div>
      </ClientOnly>
    </div>
  );
};

export default Home;
