import getCurrentUser from "@/app/actions/getCurrentUser";
import UserManagement from "./UserManagement";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Quản lý người dùng</h1>
      <UserManagement />
    </div>
  );
}
