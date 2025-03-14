import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.pathname.split('/')[3]

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  try {
    const backendUrl = process.env.NEXT_PUBLIC_BASE_URL
    return NextResponse.redirect(`${backendUrl}/checkout/${userId}`)
  } catch (error) {
    console.error("Error redirecting to checkout:", error)
    return NextResponse.json({ error: "Failed to redirect to checkout" }, { status: 500 })
  }
}
