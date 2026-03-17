'use client';

import { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, Window, MessageList, MessageInput } from 'stream-chat-react';

import 'stream-chat-react/dist/css/v2/index.css';

const client = StreamChat.getInstance(process.env.NEXT_PUBLIC_STREAM_API_KEY!);

export default function SupportChat({ userId }: { userId: string }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const connect = async () => {
      // Token lekérése a backendről
      const res = await fetch('/api/stream/token', {
        method: 'POST',
        body: JSON.stringify({ userId }),
      });
      const { token } = await res.json();

      // Csatlakozás
      await client.connectUser({ id: userId, name: userId }, token);
      setReady(true);
    };

    connect();

    return () => { client.disconnectUser(); };
  }, [userId]);

  if (!ready) return <div>Betöltés...</div>;

  return (
    <Chat client={client}>
      {/* Channel setup jön ide */}
    </Chat>
  );
}