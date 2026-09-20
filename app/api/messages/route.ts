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
          title: "📩 YoTravel 新咨询留言",
          text: `### 📩 YoTravel 新咨询留言\n\n` +
                `- **用户 Email**: ${body.email || "未填写"}\n` +
                `- **出行月份/日期**: ${body.travelWindow || "未填写"}\n` +
                `- **留言内容**: ${body.message || "无"}\n` +
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
      console.log("=== 钉钉 API 响应 (messages) ===", dingResponse);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error forwarding to webhook:", error);
    return NextResponse.json(
      { error: "Failed to submit message" },
      { status: 500 }
    );
  }
}