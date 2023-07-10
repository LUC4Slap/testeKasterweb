import React, {useRef} from 'react';
import {StyleSheet, View, Animated, PanResponder} from 'react-native';

import {Color, Spacing} from '../styles';

const SPRING_CONFIG = (
  toValue: number,
  delay: number,
): Animated.SpringAnimationConfig => ({
  toValue,
  damping: 80,
  overshootClamping: true,
  delay,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 1000,
  useNativeDriver: false,
});

const Handler = () => (
  <View style={styles.bottomSheetHandler}>
    <View style={styles.handler} />
  </View>
);
interface BottomSheetType {
  children: React.ReactElement[] | React.ReactElement;
  initialY: number;
  handler?: boolean;
}
function BottomSheet({children, initialY, handler}: BottomSheetType) {
  const translationY = useRef(new Animated.Value(0)).current;

  const animatedStyles = {
    transform: [{translateY: translationY}],
    marginTop: initialY,
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dy: translationY}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        Animated.spring(translationY, SPRING_CONFIG(0, 100)).start();
      },
    }),
  ).current;
  return (
    <Animated.View
      style={[styles.bottomSheetContainer, animatedStyles]}
      {...panResponder.panHandlers}>
      {handler && <Handler />}
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bottomSheetContainer: {
    borderRadius: 20,
    backgroundColor: 'white',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
  bottomSheetHandler: {
    minHeight: 40,
    maxHeight: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: Spacing[20],
  },
  handler: {
    backgroundColor: Color.neutral.mercury,
    height: 5,
    width: 70,
    borderRadius: 20,
  },
});
export {BottomSheet};
