import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const loginUrl = new URL("/login", request.url);

  if (!token) {
    return NextResponse.redirect(loginUrl);
  }

  try {
    const authServiceUrl = process.env.AUTH_SERVICE_URL || "http://localhost:8000";
    const response = await fetch(`${authServiceUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    if (response.ok) {
      return NextResponse.next();
    }
  } catch (error) {
    console.error("Unable to validate dashboard session:", error);
  }

  const redirect = NextResponse.redirect(loginUrl);
  redirect.cookies.delete("token");
  return redirect;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
