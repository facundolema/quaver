import {View, FlatList, ActivityIndicator} from 'react-native';
import TrackPlayer, {Track} from 'react-native-track-player';
import {PlaylistEntry} from '../components';
import PlayerButtonCard from '../components/PlayerButtonCard';

export default function PlaylistScreen({queue, currentTrack, navigation}) {
  return (
    <View style={{height: '100%'}}>
      {queue.length <= 0 ? (
        <View
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={queue}
          renderItem={({item, index}) => (
            <PlaylistEntry
              item={item}
              onPress={() => {
                TrackPlayer.skip(index);
                TrackPlayer.play();
              }}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}

      <PlayerButtonCard currentTrack={currentTrack} navigation={navigation} />
    </View>
  );
}
