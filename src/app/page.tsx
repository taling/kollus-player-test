// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { playlist } from './playlist';

export default function PlaylistPage() {
  const [selectedVideo, setSelectedVideo] = useState(playlist[0]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchJwt = async () => {
      const res = await fetch('/api/jwt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedVideo),
      });

      if (!res.ok) {
        const error = await res.text();
        console.error('JWT 생성 실패:', error);
        return;
      }

      const data = await res.json();
      setVideoUrl(data.video_url);
    };

    fetchJwt();
  }, [selectedVideo]); // 💡 선택된 영상이 바뀔 때마다 요청

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* 왼쪽: 영상 영역 */}
      <div style={{ flex: 2, marginRight: '20px' }}>
        {videoUrl ? (
          <iframe
            src={videoUrl}
            width="100%"
            height="500"
            allow="fullscreen; encrypted-media"
            frameBorder="0"
          />
        ) : (
          <div>영상 로딩 중...</div>
        )}
      </div>

      {/* 오른쪽: 재생목록 */}
      <div style={{ flex: 1 }}>
        <h3>재생 목록</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {playlist.map((video) => (
            <li
              key={video.id}
              onClick={() => setSelectedVideo(video)}
              style={{
                padding: '10px',
                marginBottom: '8px',
                cursor: 'pointer',
                backgroundColor: selectedVideo.id === video.id ? '#e0f0ff' : '#f9f9f9',
                border: '1px solid #ccc',
                borderRadius: '5px',
                color: '#0070f3',
              }}
            >
              {video.id}. {video.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
