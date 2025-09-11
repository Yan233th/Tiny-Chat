import { streamText, convertToModelMessages } from "ai";
import { createDifyProvider } from "dify-ai-provider";

const difyProvider = createDifyProvider({
  baseURL: "http://172.24.250.22/v1",
});

const dify = difyProvider("dify-application-id", {
  responseMode: "streaming",
  apiKey: "app-r2zUpFkzbqjoNGO4IEdNxu8Y",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: dify,
    messages: convertToModelMessages(messages),
  });

  // 👇 返回 AI SDK 标准的 UIMessageStreamResponse
  return result.toUIMessageStreamResponse();
}

// import { generateText, UIMessage } from "ai";

// import { createDifyProvider } from "dify-ai-provider";
// const difyProvider = createDifyProvider({
//   baseURL: "http://172.24.250.22/v1",
// });
// const dify = difyProvider("dify-application-id", {
//   responseMode: "blocking",
//   apiKey: "app-r2zUpFkzbqjoNGO4IEdNxu8Y",
// });

// // console.log(text);
// // console.log("conversationId", conversationId);
// // console.log("messageId", messageId);

// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     // 解析请求内容
//     const { messages }: { messages: UIMessage[] } = await req.json();

//     // 转换成 generateText 需要的格式
//     const formattedMessages = messages.map((m) => ({
//       role: m.role,
//       content: m.parts
//         .map((p) => ("text" in p ? p.text : "")) // 提取文字
//         .join(" "),
//     }));

//     // 调用 Dify 生成回答
//     const { text, providerMetadata } = await generateText({
//       model: dify,
//       messages: formattedMessages,
//       headers: { "user-id": "test-user" },
//     });
//     console.log(text);
//     // 返回 JSON 格式的响应
//     return NextResponse.json({
//       success: true,
//       message: text,
//       metadata: providerMetadata,
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, error: error.message ?? "Unknown error" },
//       { status: 500 }
//     );
//   }
// }

// import { useChat } from "@ai-sdk/react";
// import { streamText, UIMessage, convertToModelMessages } from "ai";

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// // const siliconflow = createOpenAICompatible({
// //   name: "siliconflow",
// //   apiKey: process.env.SILICON_FLOW_API_KEY,
// //   baseURL: "https://api.siliconflow.cn/v1",
// // });

// const { messages, sendMessage } = useChat({
//   transport: new DefaultChatTransport({
//     api: "http://localhost/v1/chat-messages",
//     headers: {
//       Authorization: "Bearer app-r2zUpFkzbqjoNGO4IEdNxu8Y",
//       "Content-Type": "application/json",
//     },
//   }),
// });

// export async function POST(req: Request) {
//   const { messages }: { messages: UIMessage[] } = await req.json();

//   const result = streamText({
//     model: siliconflow("deepseek-ai/DeepSeek-V3"),
//     messages: convertToModelMessages(messages),
//   });

//   return result.toUIMessageStreamResponse();
// }
