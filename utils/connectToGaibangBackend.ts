// utils/connectToGaibangBackend.ts

export async function connectToGaibangBackend(
  stream: MediaStream,
  onTranscript: (text: string) => void
): Promise<() => void> {
  const ws = new WebSocket('wss://gaibang-backend.onrender.com');
  ws.binaryType = 'arraybuffer';

  ws.onopen = () => {
    console.log('✅ 已连接到 gaibang-backend');

    const audioTrack = stream.getAudioTracks()[0];
    const mediaStream = new MediaStream([audioTrack]);

    const recorder = new MediaRecorder(mediaStream, {
      mimeType: 'audio/webm;codecs=opus',
    });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
        event.data.arrayBuffer().then((buffer) => {
          ws.send(buffer);
        });
      }
    };

    recorder.start(250); // 每 250ms 发送一次数据块
  };

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.transcript) {
        onTranscript(data.transcript);
      }
    } catch (err) {
      console.error('❌ JSON 解析失败:', err);
    }
  };

  return () => {
    ws.close();
    console.log('🛑 WebSocket 已断开');
  };
}
