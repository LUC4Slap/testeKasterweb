import React from 'react';

import { View, Modal, ActivityIndicator, Text, StyleSheet } from 'react-native';

import { Color, Spacing, Subtitle } from '../styles';

export function LoadingModal({ state, message }: { state: boolean, message?: string; }) {
  return (
    <Modal animationType="fade" transparent={true} visible={state}>
      <View style={styles.modalBackground}>
        <View style={styles.modalInner}>
          <ActivityIndicator size="large" color={Color.primary.royalBlue} />
          <Text style={[Subtitle[1], styles.text]}>{message || "Carregando"}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInner: {
    minWidth: 100,
    maxWidth: 200,
    minHeight: 100,
    maxHeight: 200,
    backgroundColor: Color.neutral.white,
    borderRadius: 20,
    justifyContent: 'center',
    padding: Spacing[12],
  },
  text: {
    textAlign: 'center',
    color: Color.primary.royalBlue,
    marginTop: Spacing[16],
  },
});
