type HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => void;

type Message = {
    id: Number;
    role: string;
    content: string;
}

export type { HandleSubmit, Message};
