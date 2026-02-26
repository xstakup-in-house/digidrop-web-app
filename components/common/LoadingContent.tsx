"use client"

import { Card, CardContent } from "../ui/card";
import { motion} from "framer-motion"

interface LoadingProps {
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({
  text = "Loading...",
  fullScreen = false,
}: LoadingProps) {
  if (fullScreen) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
        {/* Animated Starfield Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.15),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.15),transparent_40%)]" />

          {[...Array(40)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/70"
              initial={{
                opacity: 0,
                y: Math.random() * 800,
                x: Math.random() * 1200,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: "+=100",
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <LoadingContent text={text} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-20">
      <LoadingContent text={text} />
    </div>
  );
}


function LoadingContent({ text }: { text: string }) {
  return (
    <Card className="relative w-[380px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
      <CardContent className="flex flex-col items-center justify-center gap-8 p-10">
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            className="absolute h-28 w-28 rounded-full border border-primary/40"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            className="absolute h-20 w-20 rounded-full border border-purple-400/40"
          />

          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="h-6 w-6 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/50"
          />
        </div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm tracking-wide text-muted-foreground"
        >
          {text}
        </motion.p>

        {/* Blockchain Pulse Bar */}
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}
