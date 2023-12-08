import {View, Text, StyleSheet} from 'react-native';
import {Track} from 'react-native-track-player';
import Artwork from './Artwork';

export default function Information({track}: {track: Track | undefined}) {
  return (
    <View style={styles.sectionContainer}>
      <Artwork src={track ? track.artwork : undefined} />
      <View style={styles.description}>
        <Text style={styles.title}>{track ? track.title : 'Loading'}</Text>
        <Text style={styles.artist}>{track ? track.artist : 'Unknown'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
  },
  artist: {
    fontSize: 22,
    fontWeight: '400',
    color: '#555',
  },
  description: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
