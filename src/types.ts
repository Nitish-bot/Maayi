type HandleSubmit = (event: React.FormEvent<HTMLFormElement>) => Promise<void>;

type HandleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => void;

type Message = {
    id: React.Key;
    role: string;
    content: string;
}

export type { HandleSubmit, HandleOnChange, Message};
