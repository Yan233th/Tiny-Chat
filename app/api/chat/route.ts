import { streamText, convertToModelMessages } from "ai";
import { createDifyProvider } from "dify-ai-provider";

const difyApiKey = process.env.DIFY_API_KEY;
const difyBaseUrl = process.env.DIFY_BASE_URL;

const difyProvider = createDifyProvider({
  baseURL: difyBaseUrl,
});

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
