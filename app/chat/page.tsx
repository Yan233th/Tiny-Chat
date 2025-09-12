import { ChatInterface } from "@/app/components/chat-interface";

export default function ChatPage() {
  return (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-3xl mx-auto">
        <ChatInterface />
      </div>
    </div>
  );
}
