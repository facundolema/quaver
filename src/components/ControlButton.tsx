import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

export default function ControlButton({
  onPress,
  icon,
}: {
  onPress: () => void;
  icon: JSX.Element;
}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionButton}>
      <Text style={styles.sectionTitle}>{icon}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  actionButton: {
    borderColor: 'black',
    borderWidth: 1,
    borderBottomWidth: 5,
    borderRadius: 10,
    aspectRatio: 5 / 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
