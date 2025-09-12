import { cn } from "@/lib/utils";

const Dot = ({ className }: { className?: string }) => (
  <span
    className={cn("h-2 w-2 rounded-full bg-zinc-500", className)}
    style={{ animationDelay: "0.2s", animationDuration: "1.2s" }}
  />
);

export const LoadingDots = () => {
  return (
    <div className="flex items-center justify-center space-x-2 animate-pulse">
      <Dot />
      <Dot className="animate-bounce" />
      <Dot />
    </div>
  );
};
