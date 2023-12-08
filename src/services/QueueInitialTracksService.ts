import TrackPlayer, {Track} from 'react-native-track-player';
const server = 'http://192.168.0.235:8080';

export const QueueInitialTracksService = async (): Promise<void> => {
  const data = await fetch(`${server}/playlist`);
  const playlist = (await data.json()).map((track: Track) => ({
    ...track,
    url: server + track.path,
    artwork: server + track.artwork,
  }));
  await TrackPlayer.add(playlist);
};
