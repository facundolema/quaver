import { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import TrackPlayer, { useTrackPlayerEvents, Event, Track } from 'react-native-track-player';
import { SetupService, QueueInitialTracksService } from './src/services';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlayerScreen from './src/screens/PlayerScreen';
import PlaylistScreen from './src/screens/PlaylistScreen';

const Stack = createNativeStackNavigator();

function useSetupPlayer(setQueueInitialized: (value: boolean) => void) {
  const [playerReady, setPlayerReady] = useState<boolean>(false);

  useEffect(() => {
    let unmounted = false;
    (async () => {
      await SetupService();
      if (unmounted) return;
      setPlayerReady(true);
      const queue = await TrackPlayer.getQueue();
      if (unmounted) return;
      if (queue.length <= 0) {
        await QueueInitialTracksService();
        console.log('Queueing initial tracks')
        setQueueInitialized(true);
      }
    })();
    return () => {
      unmounted = true;
    };
  }, []);
  return playerReady;
}

export default function App(): JSX.Element {
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>(undefined);
  const [queue, setQueue] = useState<Track[]>([]);
  const [queueInitialized, setQueueInitialized] = useState<boolean>(false);

  const isPlayerReady = useSetupPlayer(setQueueInitialized);

  useEffect(() => {
    const fetchActiveTrack = async () => {
      const track = await TrackPlayer.getActiveTrack()
      setCurrentTrack(track)
      console.log('Fetching queue')
      const currentQueue = await TrackPlayer.getQueue();
      console.log('Queue fetched', currentQueue)
      setQueue(currentQueue);
    }
    
    fetchActiveTrack();
  }, [queueInitialized]);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    const activeTrack = await TrackPlayer.getActiveTrack();
    setCurrentTrack(activeTrack);
  });

  if (!isPlayerReady) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor='white' />
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Playlist"
          options={{ headerShown: false }}
        >
          {props =>
            <SafeAreaView style={{ flex: 1 }}>
              <StatusBar backgroundColor='white' barStyle={'dark-content'} />
              <PlaylistScreen {...props} currentTrack={currentTrack} queue={queue}/>
            </SafeAreaView>
          }
        </Stack.Screen>
        <Stack.Screen
          name="Player"
          options={{ headerShown: false }}
        >
          {props =>
            <SafeAreaView style={{ flex: 1 }}>
              <StatusBar backgroundColor='white' barStyle={'dark-content'} />
              <PlayerScreen {...props} currentTrack={currentTrack} />
            </SafeAreaView>
          }
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
