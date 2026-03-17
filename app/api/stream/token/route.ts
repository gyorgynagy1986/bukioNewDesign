// app/api/stream/token/route.ts
import { StreamChat } from 'stream-chat';
import { NextResponse } from 'next/server';

const serverClient = StreamChat.getInstance(
  process.env.NEXT_PUBLIC_STREAM_API_KEY!,
  process.env.STREAM_API_SECRET!
);

export async function POST(req: Request) {
  const { visitorId } = await req.json();

  try {
    // Vendég user létrehozása (normál user, nem "guest" role)
    await serverClient.upsertUser({
      id: visitorId,
      name: 'Látogató',
      role: 'user', // fontos: NEM guest!
    });

    // Support agent
    await serverClient.upsertUser({
      id: 'support-agent',
      name: 'Ügyfélszolgálat',
      role: 'admin',
    });

    // Channel létrehozása
    const channelId = `support-${visitorId}`;
    const channel = serverClient.channel('messaging', channelId, {
      members: [visitorId, 'support-agent'],
      created_by_id: 'support-agent',
    });

    await channel.create();

    // Token generálás
    const token = serverClient.createToken(visitorId);

    return NextResponse.json({ token, channelId });
  } catch (error: unknown) {
    // Ha Error instance-ként akarod kezelni:
    if (error instanceof Error) {
      console.error('Stream error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // Ismeretlen hiba esetén
    console.error('Unknown error:', error);
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  } 
    
}