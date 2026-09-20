import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const webhookUrl = process.env.WEBHOOK_URL;

    if (webhookUrl) {
      // 构造符合钉钉机器人格式的 Markdown 消息
      const dingtalkPayload = {
        msgtype: "markdown",
        markdown: {
          title: "🎉 YoTravel 新 VIP 预订线索",
          text: `### 🎉 YoTravel 新 VIP 预订线索\n\n` +
                `- **用户 Email**: ${body.email || "未填写"}\n` +
                `- **预计出行日期**: ${body.tripDate || "未选择"}\n` +
                `- **提交时间**: ${body.submittedAt ? new Date(body.submittedAt).toLocaleString("zh-CN") : "未知"}\n`
        }
      };

      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dingtalkPayload),
      });

      // 接收并输出钉钉返回的真正响应，方便在 Vercel Logs 中排查
      const dingResponse = await res.json();
      console.log("=== 钉钉 API 响应 (leads) ===", dingResponse);
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