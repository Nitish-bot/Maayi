"use client";

import React, { useState, useEffect } from "react";
import InputForm from "@/components/input";
import { Message } from "@/types";

export default function Home() {
  const [formQuery, setFormQuery] = useState<string>("q");
  const [messages, setMessages] = useState<Array<Message>>([]);

  useEffect(() => {
    const handleSetMessages = async () => {
      console.log("Messages:", messages);
      if (messages.length % 2 !== 0) {
        const requestMessages = JSON.stringify(messages);
        const response =  await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestMessages,
        });
        
        if (response.ok) {
          const data = await response.json();
          const newModelMessage: Message = {
            id: messages.length,
            role: "model",
            content: data,
          }
          setMessages(prevMessages => [...prevMessages, newModelMessage]);
          console.log(messages);
        }    
      }
    };
    handleSetMessages();
  }, [messages]);

  const handleSetFormQuery = async (query: string) => {
    setFormQuery(query);
  };

  const handleSetMessage = (message: Message) => {
    setMessages(prevMessages => [...prevMessages, message]);
  };


  return (
    <main className="dark">
      {/* form */}
      <InputForm formQuery={formQuery} handleSetFormQuery={handleSetFormQuery} messages={messages} setMessages={handleSetMessage} />

    </main>
  );
}
