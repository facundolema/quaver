import {
  SafeAreaView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Information, Controls, ProgressSlider} from '../components';
import {useProgress} from 'react-native-track-player';
import Icon from 'react-native-vector-icons/FontAwesome6';

export default function PlayerScreen({currentTrack, navigation}) {
  const progress = useProgress();

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />
      <View style={styles.container}>
        <View style={{width: '100%', marginTop: 30}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Playlist')}
            style={{
              alignSelf: 'flex-start',
              borderColor: 'black',
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              borderBottomWidth: 5,
            }}>
            <Text style={{color: 'black', fontSize: 16}}>
              <Icon name="angle-left" size={16} color="black" /> Back
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '100%',
            gap: 20,
          }}>
          <Information track={currentTrack} />
          <Controls progress={progress} />
          <ProgressSlider progress={progress} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
    flex: 1,
    gap: 50,
  },
});
