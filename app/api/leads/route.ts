import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 从环境变量中获取 Webhook 地址
    const webhookUrl = process.env.WEBHOOK_URL;

    if (webhookUrl) {
      // 在 Vercel 云端发起请求，将数据推送到你的 Webhook
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "lead",
          ...body,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error forwarding to webhook:", error);
    return NextResponse.json(
      { error: "Failed to submit lead" },
      { status: 500 }
    );
  }
}