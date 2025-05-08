import getCurrentUser from "@/app/actions/getCurrentUser";
import { getUserById } from "@/app/actions/getUserById";
import UserForm from "../../UserForm";
import { redirect } from "next/navigation";

interface EditUserPageProps {
  params: {
    userId: string;
  };
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const currentUser = await getCurrentUser();
  const user = await getUserById(params);

  if (!currentUser || currentUser.role !== "admin") {
    redirect("/");
  }

  if (!user) {
    redirect("/teacher/users");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Chỉnh sửa người dùng</h1>
      <UserForm user={user} />
    </div>
  );
}
