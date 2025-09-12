import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">欢迎使用</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
          上海电力大学咨询助手
        </p>
        <Button asChild>
          <Link href="/chat">开始咨询</Link>
        </Button>
      </div>
    </div>
  );
}
