export interface Channel {
  id: string;
  name: string;
  removable: boolean;
}

export interface Message {
  id: string;
  body: string;
  channelId: string;
  username: string;
}

export interface NewMessage {
  body: string;
  channelId: string | undefined;
  username: string;
}

export interface Values {
  username: string;
  password: string;
}

export interface NewUser {
  username: string;
  password: string;
}

export interface ResponseAuth {
  token: string;
  username: string;
}
