import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // Next.js (Server) memanggil API Kampus (Tidak terkena masalah CORS)
  const res = await fetch("https://Payroll.Politekniklp3i-tasikmalaya.ac.id/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}