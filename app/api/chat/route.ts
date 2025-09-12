import { streamText, convertToModelMessages } from "ai";
import { createDifyProvider } from "dify-ai-provider";

const difyProvider = createDifyProvider({
  baseURL: "http://172.24.250.22/v1",
});

const difyApiKey = process.env.DIFY_API_KEY;

if (!difyApiKey) {
  throw new Error("Missing DIFY_API_KEY in .env.local");
}

const dify = difyProvider("dify-application-id", {
  responseMode: "blocking",
  apiKey: difyApiKey,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: dify,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
