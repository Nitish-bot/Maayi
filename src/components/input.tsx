"use client";

import React, { Dispatch }  from "react";
import { Input } from "@/components/ui/input";
import {
  IconSend,
} from "@tabler/icons-react";
import { Message } from "@/types";

interface Props {
  formQuery: string;
  handleSetFormQuery: Dispatch<string>;
  messages: Message[];
  setMessages: Dispatch<Message>;
}

class InputForm extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.handleSetFormQuery(event.target.value);
  };

  handleSubmit = (data: FormData) => {    
    try {
      const userContent = data.get("query") as string;

      if (!userContent) {
        return;
      }

      const newUserMessage: Message = {
        id: this.props.messages.length,
        role: "user",
        content: userContent,
      };
      
      this.props.setMessages(newUserMessage);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input dark:bg-black">
        <form action={this.handleSubmit}>
          <div className="flex flex-row items-center justify-center md:space-x-2 mb-4">

            <div className="flex flex-col space-y-2 w-full">
              <Input name="query" id="query" placeholder="Puchiye.. " type="text" onChange={this.handleInputChange}/>
            </div>

            <div className="flex flex-row align-middle items-center h-full w-auto">
              <button
                className="bg-gradient-to-br relative group/btn p-2.5 from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 text-white rounded-md h-full w-full font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit">
                <IconSend className="h-5 w-5 text-neutral-800 dark:text-neutral-300" />
              </button>
            </div>
          </div>

        </form>
        {this.props.messages && (
          <div >
            {this.props.messages.map((message :Message) => (
              <div key={message.id} className="text-sky-200">
                <div>{message.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default InputForm;
