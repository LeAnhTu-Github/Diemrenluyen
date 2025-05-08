import getCurrentUser from "@/app/actions/getCurrentUser";
import UserForm from "../UserForm";
import { redirect } from "next/navigation";

export default async function CreateUserPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Thêm người dùng mới</h1>
      <UserForm />
    </div>
  );
}
