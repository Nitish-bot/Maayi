"use client";

import React, { useState } from "react";
import InputForm from "@/components/input";
import { Message, HandleSubmit } from "@/types";

export default function Home() {
  const [formQuery, setFormQuery] = useState<string>("");
  const [messages ,setMessages] = useState<Array<Message>>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormQuery(event.target.value);
    return;
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const newUserMessage: Message = {
        id: messages.length,
        role: "user",
        content: formQuery,
      };

      setMessages(messages.concat(newUserMessage));

      const response = await fetch("@/app/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserMessage),
      });

      if (response.ok) {
        const data = await response.json();
        const newModelMessage: Message = {
          id: messages.length,
          role: "model",
          content: data,
        }
        setMessages(messages.concat(newModelMessage));
      }
    } catch (error) {
      console.error(error);
    }
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });
    const data = await response.json();
    setMessages(data);

    return new Promise<void>((resolve) => {
      resolve();
    });
  };
  return (
    <main className="dark">
      {/* form */}
      <InputForm handleSubmit={handleSubmit} handleInputChange={handleInputChange}></InputForm>
      {messages && (
        <div >
          {messages.map((message :Message) => (
            <div key={message.id} className="">
              <div>{message.content}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
