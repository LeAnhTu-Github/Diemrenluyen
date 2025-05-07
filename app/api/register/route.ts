import { NextResponse } from 'next/server';
import prisma from "@/app/libs/prismadb";
import bcrypt from 'bcrypt';
import { Role } from '@prisma/client'; // Import Enum Role

// POST - Tạo mới tài khoản User (Đăng ký)
export async function POST(req: Request) {
  let requestData: any;
  try {
    requestData = await req.json();
    const {
      email,
      password,
      confirmPassword,
      role,
      isActive,
      name,
      className, // Thêm các trường khác của User nếu cần khi đăng ký
      image
    } = requestData;

    // 1. Validation cơ bản
    if (!email || !password || !confirmPassword || !role) {
      return NextResponse.json({ message: 'Thiếu thông tin bắt buộc: Email, Mật khẩu, Nhập lại mật khẩu, Phân quyền.' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ message: 'Mật khẩu và Nhập lại mật khẩu không khớp.' }, { status: 400 });
    }

    if (password.length < 6) {
        return NextResponse.json({ message: 'Mật khẩu phải có ít nhất 6 ký tự.' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Email này đã được sử dụng.' }, { status: 409 });
    }

    const roleValue = role.toUpperCase() as Role;
    if (!Object.values(Role).includes(roleValue)) {
        return NextResponse.json({ message: `Phân quyền '${role}' không hợp lệ.` }, { status: 400 });
    }

    // 2. Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. Tạo User mới
    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        hashedPassword: hashedPassword,
        role: roleValue,
        isActive: isActive === undefined ? true : Boolean(isActive),
        name: name || email.split('@')[0],
        className: className || null,
        image: image || null,
        // emailVerified có thể để null ban đầu
      },
      select: { // Chỉ trả về các trường an toàn
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        className: true,
        image: true,
        createdAt: true,
      }
    });

    return NextResponse.json(newUser, { status: 201 });

  } catch (error: any) {
    console.error('POST /api/users/register error:', error);
    if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
      return NextResponse.json({ message: 'Email này đã được sử dụng (P2002).' }, { status: 409 });
    }
    return NextResponse.json(
      { message: 'Lỗi máy chủ nội bộ khi tạo tài khoản.', error: error.message },
      { status: 500 }
    );
  }
}