import getCurrentUser from "@/app/actions/getCurrentUser";
import { getUserById } from "@/app/actions/getUserById";
import ChangePasswordForm from "./ChangePasswordForm";
import { redirect } from "next/navigation";

interface ChangePasswordPageProps {
  params: {
    userId: string;
  };
}

export default async function ChangePasswordPage({ params }: ChangePasswordPageProps) {
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
      <h1 className="text-2xl font-bold mb-6">Đổi mật khẩu</h1>
      <ChangePasswordForm user={user} />
    </div>
  );
}
