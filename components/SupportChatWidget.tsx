'use client';

import { useEffect, useState, useCallback } from 'react';
import { StreamChat, Channel as StreamChannel } from 'stream-chat';
import {
  Chat,
  Channel,
  Window,
  MessageList,
  MessageInput,
  Thread,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;


function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return '';
  
  const storageKey = 'support_visitor_id';
  let visitorId = localStorage.getItem(storageKey);
  
  if (!visitorId) {
    visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(storageKey, visitorId);
  }
  
  return visitorId;
}

export default function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<StreamChannel | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const initChat = useCallback(async () => {
    if (client) return;
    
    setIsLoading(true);
    
    try {
      const visitorId = getOrCreateVisitorId();
      
      // Token + channel a szerverről
      const res = await fetch('/api/stream/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId }),
      });
      const { token, channelId } = await res.json();

      const chatClient = StreamChat.getInstance(apiKey);

      // Csatlakozás tokennel
      await chatClient.connectUser(
        { id: visitorId, name: 'Látogató' },
        token
      );

      // Channel watch
      const supportChannel = chatClient.channel('messaging', channelId);
      await supportChannel.watch();
      
      setClient(chatClient);
      setChannel(supportChannel);

      setUnreadCount(supportChannel.countUnread());
      supportChannel.on('message.new', (event) => {
        if (event.user?.id !== visitorId) {
          setUnreadCount((prev) => prev + 1);
        }
      });
    } catch (error) {
      console.error('Chat init error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [client]);

  useEffect(() => {
    return () => {
      client?.disconnectUser();
    };
  }, [client]);

  const handleOpen = useCallback(async () => {
    setIsOpen(true);
    await initChat();
    setUnreadCount(0);
    channel?.markRead();
  }, [initChat, channel]);

  return (
    <>
      {!isOpen && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 
                     text-white rounded-full shadow-lg flex items-center justify-center
                     transition-all hover:scale-110 z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">💬</div>
              <div>
                <h3 className="font-semibold">Gyors segítség</h3>
                <p className="text-xs text-blue-100">Általában perceken belül válaszolunk</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : client && channel ? (
              <Chat client={client} theme="str-chat__theme-light">
                <Channel channel={channel}>
                  <Window>
                    <MessageList  />
                    <MessageInput placeholder="Írj üzenetet..." />
                  </Window>
                  <Thread />
                </Channel>
              </Chat>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}