"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LoadingDots } from "@/app/components/loading-dots";

export function ChatInterface() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    setIsLoading(true);
    await sendMessage({ text: input });
    setIsLoading(false);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full">
      <header className="p-4 border-b dark:border-zinc-800">
        <h1 className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-200">
          上海电力大学咨询助手
        </h1>
      </header>

      <main className="flex-grow h-0 overflow-y-auto">
        <div className="space-y-4 p-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-4 ${
                message.role === "user" ? "justify-end" : ""
              }`}
            >
              {message.role !== "user" && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-xl ${
                  message.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-200 rounded-bl-none"
                }`}
              >
                <div className="whitespace-pre-wrap">
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <span key={`${message.id}-${i}`}>{part.text}</span>
                        );
                    }
                  })}
                </div>
              </div>
              {message.role === "user" && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>我</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-4">
              <Avatar className="w-8 h-8">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-xl bg-zinc-200 dark:bg-zinc-800">
                <LoadingDots />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="p-4 border-t dark:border-zinc-800">
        <form
          onSubmit={handleSubmit}
          className="flex items-center w-full space-x-2"
        >
          <Input
            className="flex-1 dark:bg-zinc-900 dark:border-zinc-800"
            value={input}
            placeholder="请输入您的问题..."
            onChange={(e) => setInput(e.currentTarget.value)}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            发送
          </Button>
        </form>
      </footer>
    </div>
  );
}
