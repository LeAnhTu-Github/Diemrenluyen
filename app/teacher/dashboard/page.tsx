import getCurrentUser from "@/app/actions/getCurrentUser";
import DashboardContent from "./DashboardContent";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <DashboardContent />
    </div>
  );
}
