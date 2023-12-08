import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import PlayPauseButton from './PlayPauseButton';
import TrackPlayer from 'react-native-track-player';
import {useIsPlaying} from 'react-native-track-player';

export default function PlayerButtonCard({currentTrack, navigation}) {
  const {playing, bufferingDuringPlay} = useIsPlaying();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Player');
      }}
      style={styles.card}>
      <View style={{display: 'flex', flexDirection: 'row', gap: 15}}>
        <View style={styles.artwork}>
          <Image source={{uri: currentTrack?.artwork}} style={styles.image} />
        </View>
        <View style={{display: 'flex'}}>
          <Text style={styles.title}>{currentTrack?.title}</Text>
          <Text style={styles.artist}>{currentTrack?.artist}</Text>
        </View>
      </View>

      <PlayPauseButton
        onPress={() => {
          playing ? TrackPlayer.pause() : TrackPlayer.play();
        }}
        playing={playing}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    borderBottomWidth: 5,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
  },
  artist: {
    color: 'black',
    fontSize: 14,
    fontWeight: '400',
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderColor: 'black',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
});
