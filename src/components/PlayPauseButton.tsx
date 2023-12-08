import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function PlayPauseButton({
  onPress,
  playing,
}: {
  onPress: () => void;
  playing: boolean;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name={playing ? 'pause' : 'play'} size={24} color="black" />
    </TouchableOpacity>
  );
}
