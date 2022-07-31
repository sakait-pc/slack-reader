export interface User {
  id: string;
  name: string;
  image: string;
}

export interface Channel {
  id: string;
  name: string;
  topic: string;
  purpose: string;
}

export interface Post {
  date: string;
  ts: string;
  user: string;
  text: string;
  client_msg_id: string | undefined;
  thread_ts: string | undefined;
  reply_count: number | undefined;
  reply_users: Array<string> | undefined;
  replies: Array<any> | undefined;
  parent_user_id: string | undefined;
  files: Array<any> | undefined;
  attachments: Array<any> | undefined;
}

export interface PostByChannel {
  channel: string;
  channelId: string;
  posts: Array<Post>;
}

export interface Data {
  users: Array<User>;
  channels: Array<Channel>;
  posts: Array<PostByChannel>;
}
