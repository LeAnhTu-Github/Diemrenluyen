"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import toast from "react-hot-toast";
import { User } from "@prisma/client";
import { DataTable } from "@/app/components/ui/data-table";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = () => {
    router.push("/teacher/users/create");
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Danh sách người dùng</h2>
        <Button 
          onClick={handleCreateUser}
          className="bg-blue-600 hover:bg-blue-700 text-white transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>
      <div className="rounded-md border">
        <DataTable 
          columns={columns} 
          data={users}
        />
      </div>
    </div>
  );
};

export default UserManagement;
