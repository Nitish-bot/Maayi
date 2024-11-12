"use client";

import { useChat } from "ai/react";
import InputForm from "@/components/input";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({api: "@/app/api/chat"});

  return (
    <main className="dark">
      {/* form */}
      <InputForm input={input} handleInputChange={handleInputChange} handleSubmit={handleSubmit}></InputForm>
      <div >
        {messages.map( message => (
          <div key={message.id} className="">
            <div>{message.content}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
