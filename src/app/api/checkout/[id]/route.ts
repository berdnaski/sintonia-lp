import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  try {
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3333"

    return NextResponse.redirect(`${backendUrl}/checkout/${userId}`)
  } catch (error) {
    console.error("Error redirecting to checkout:", error)
    return NextResponse.json({ error: "Failed to redirect to checkout" }, { status: 500 })
  }
}

