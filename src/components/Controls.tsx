import React from 'react';
import {StyleSheet, View} from 'react-native';
import TrackPlayer, {Progress, useIsPlaying} from 'react-native-track-player';

import ControlButton from './ControlButton';

import Icon from 'react-native-vector-icons/FontAwesome6';
const playIcon = <Icon name="play" size={24} color="black" />;
const pauseIcon = <Icon name="pause" size={24} color="black" />;
const stepForwardIcon = <Icon name="forward-step" size={24} color="black" />;
const stepBackwardIcon = <Icon name="backward-step" size={24} color="black" />;

export default function Controls({progress}: {progress: Progress}) {
  const {playing, bufferingDuringPlay} = useIsPlaying();
  return (
    <View style={styles.controls}>
      <ControlButton
        onPress={() =>
          progress.position < 1
            ? TrackPlayer.skipToPrevious()
            : TrackPlayer.seekTo(0)
        }
        icon={stepBackwardIcon}
      />
      <ControlButton
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
        icon={playing ? pauseIcon : playIcon}
      />
      <ControlButton
        onPress={() => TrackPlayer.skipToNext()}
        icon={stepForwardIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    height: 48,
    width: '100%',
  },
});
