import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function ListEntry({item, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Image
        source={{uri: item.artwork}}
        style={{width: 50, height: 50, borderRadius: 5}}
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          flex: 1,
        }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
      </View>
      <Icon name="ellipsis-vertical" size={16} color="black" style={{}} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
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
});
