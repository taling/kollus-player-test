import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { media_content_key, title } = body;

    if (!media_content_key || !title) {
      return Response.json({ error: 'Invalid JSON input' }, { status: 400 });

    }

    const secretKey = process.env.SECURITY_KEY!;
    const customKey = process.env.CUSTOM_KEY!;
    const cuid = process.env.CUID!;

    // console.log('SECURITY_KEY:', secretKey);
    // console.log('CUSTOM_KEY:', customKey); 
    // console.log('CUID:', cuid);

    const expireTime = Math.floor(Date.now() / 1000) + 60 * 60; // 1시간

    const payload = {
      cuid,
      expt: expireTime,
      next_episode: true,
      playback_rates: [0.5, 0.7, 1, 1.3, 1.5, 1.7, 2],
      playcallback_ignore: true,
      mc: [
        {
          mckey: media_content_key,
          title,
          seek: true,
          disable_playrate: false,
          disable_nscreen: false,
        },
      ],
    };

    const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });

    return Response.json({
      jwt: token,
      custom_key: customKey,
      video_url: `https://v.kr.kollus.com/s?jwt=${token}&custom_key=${customKey}`,
    });
  } catch (e) {
    return new Response('Invalid JSON input', { status: 400 });
  }
}
