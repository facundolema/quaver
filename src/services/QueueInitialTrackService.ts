import TrackPlayer, {Track} from 'react-native-track-player';
const server = 'http://192.168.0.235:8080';

export const QueueInitialTracksService = async (): Promise<void> => {
  const data = await fetch(`${server}/playlist`);
  const p = await data.json();

  for (let track of p) {
    await TrackPlayer.add({
      id: track.id,
      url: server + track.path,
      title: track.title,
      artist: track.artist,
      artwork: server + track.artwork,
    });
  }
};
