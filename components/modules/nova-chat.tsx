"use client";

import { useState } from "react";
import { Mic, Send, Sparkles, Wand2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Message = { role: "user" | "assistant"; content: string };

export function NovaChat({ initialMessages = [] }: { initialMessages?: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.length
      ? initialMessages
      : [
          {
            role: "assistant",
            content: "I checked your Aura. Tonight I would keep it simple: one concept, one practice set, one quick revision. What should we attack first?"
          }
        ]
  );
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim()) return;
    const next = [...messages, { role: "user" as const, content: message }];
    setMessages(next);
    setMessage("");
    setLoading(true);
    const response = await fetch("/api/nova/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    setMessages([...next, { role: "assistant", content: data.message?.content ?? "Nova could not respond yet." }]);
    setLoading(false);
  }

  return (
    <div className="grid min-h-[76vh] grid-rows-[auto_1fr_auto] overflow-hidden rounded-[2rem] border bg-[rgba(var(--surface),0.78)] shadow-2xl backdrop-blur-2xl">
      <div className="hero-gradient flex items-center gap-4 p-5">
        <motion.div animate={{ rotate: [0, -4, 4, 0], scale: [1, 1.04, 1] }} transition={{ duration: 4, repeat: Infinity }} className="relative grid h-16 w-16 place-items-center rounded-[1.5rem] bg-white/65 shadow-xl">
          <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-secondary text-xs font-black">AI</span>
          <Sparkles className="h-8 w-8 text-primary" />
        </motion.div>
        <div>
          <h1 className="text-2xl font-black">Nova is with you</h1>
          <p className="text-sm font-semibold text-foreground/70">Personal mentor, doubt solver, study friend.</p>
        </div>
      </div>
      <div className="space-y-3 overflow-y-auto p-4">
        {messages.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={item.role === "user" ? "ml-auto max-w-[86%] rounded-[1.4rem] bg-primary p-4 text-sm font-semibold leading-6 text-primary-foreground" : "max-w-[88%] rounded-[1.4rem] bg-muted p-4 text-sm font-semibold leading-6"}
          >
            {item.content}
          </motion.div>
        ))}
        {loading && (
          <div className="flex max-w-[70%] items-center gap-2 rounded-[1.4rem] bg-muted p-4 text-sm font-bold">
            <span className="flex gap-1">
              {[0, 1, 2].map((dot) => (
                <motion.span key={dot} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.7, repeat: Infinity, delay: dot * 0.12 }} className="h-2 w-2 rounded-full bg-primary" />
              ))}
            </span>
            Nova is thinking
          </div>
        )}
      </div>
      <div className="border-t bg-white/35 p-3">
        <div className="no-scrollbar mb-3 flex gap-2 overflow-x-auto">
          {["Explain like I am 15", "Make a 30-min plan", "Quiz me", "Fix my mistake"].map((suggestion) => (
            <button key={suggestion} onClick={() => setMessage(suggestion)} className="shrink-0 rounded-full bg-white/70 px-4 py-2 text-sm font-black shadow-sm">
              {suggestion}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-2">
          <Textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Ask a doubt or request a study plan..." className="min-h-12" />
          <Button variant="outline" aria-label="Start voice input" className="rounded-full bg-white/70">
            <Mic className="h-4 w-4" />
          </Button>
          <Button onClick={sendMessage} aria-label="Send message" className="rounded-full">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 flex items-center gap-1 text-xs font-semibold text-muted-foreground">
          <Wand2 className="h-3.5 w-3.5" />
          Context-aware using Aura, Pulse, Vault, and Orbit.
        </p>
      </div>
    </div>
  );
}
