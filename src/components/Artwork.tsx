import {View, Image, StyleSheet} from 'react-native';

export default function Artwork({src}: {src: string | undefined}) {
  return (
    <View style={styles.artwork}>
      {src ? <Image source={{uri: src}} style={styles.image} /> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  artwork: {
    width: '100%',
    aspectRatio: 1,
    borderColor: 'black',
    borderWidth: 2,
    borderBottomWidth: 6,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    borderColor: 'white',
    borderWidth: 2,
  },
});
