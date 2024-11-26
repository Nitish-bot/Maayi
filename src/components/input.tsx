"use client";

import React, { Dispatch }  from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
          <div className="flex flex-row items-center justify-center md:space-x-2 mb-4 w-full">
              <Input name="query" id="query" placeholder="Puchiye.. " type="text" onChange={this.handleInputChange}/>

              <Button type="submit">
                <IconSend />
              </Button>
          </div>
        </form>

        {this.props.messages && (
          <div >
            {this.props.messages.map((message :Message) => (
              <div key={message.id} className="text-sky-200">
                <div>{message.role === 'user' ? 'You' : 'Maayi'}: {message.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default InputForm;
