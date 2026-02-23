import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Di sini biasanya Anda menyimpan ke database (Prisma/MongoDB/dll)
    console.log("User mendaftar:", { name, email, password });

    // Simulasi berhasil
    return NextResponse.json({ 
      message: "Registrasi Berhasil",
      user: { name, email } 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Gagal memproses data" }, { status: 400 });
  }
}