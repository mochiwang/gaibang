// utils/startMicStream.ts
import { mediaDevices } from 'react-native-webrtc';

export async function startMicStream(): Promise<any> {
  const stream = await mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });

  return stream;
}
