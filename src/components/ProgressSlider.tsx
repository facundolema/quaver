import {Slider} from '@react-native-assets/slider';
import {View, StyleSheet, Text} from 'react-native';
import TrackPlayer, {Progress} from 'react-native-track-player';

export default function ProgressSlider({progress}: {progress: Progress}) {
  const position = new Date(1000 * progress.position)
    .toISOString()
    .split('T')[1]
    .slice(3, 8);
  const duration = new Date(1000 * progress.duration)
    .toISOString()
    .split('T')[1]
    .slice(3, 8);
  return (
    <View style={styles.sliderContainer}>
      <Slider
        style={{width: '100%', margin: 0, padding: 0}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="black"
        maximumTrackTintColor="white"
        thumbTintColor="black"
        thumbStyle={{
          height: 16,
          width: 16,
          borderRadius: 4,
          borderColor: 'black',
          borderWidth: 1,
          padding: 0,
          margin: 0,
          backgroundColor: 'white',
        }}
        trackStyle={{
          height: 8,
          borderRadius: 2,
          borderColor: 'black',
          borderWidth: 1,
          padding: 0,
          margin: 0,
        }}
        value={
          progress.position && progress.duration
            ? progress.position / progress.duration
            : 0
        }
        onValueChange={value => {
          let newTime = value * progress.duration;
          TrackPlayer.seekTo(newTime);
        }}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}>
        <Text style={{color: 'black', marginHorizontal: 2}}>{position}</Text>
        <Text style={{color: 'black', marginHorizontal: 2}}>{duration}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  slider: {
    height: 40,
  },
});
