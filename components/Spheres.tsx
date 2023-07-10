import React from 'react';
import {Dimensions, StyleSheet, Animated} from 'react-native';

const dimension = Dimensions.get('screen');

const SpheresAnimation = ({slideIndex}: {slideIndex: number}) => {
  const animatedValue = React.useRef(new Animated.Value(36)).current;
  const animatedGreenCircle = React.useRef(new Animated.Value(86)).current;
  const animatedThirdCircle = React.useRef(new Animated.Value(46)).current;

  const AnimateSVGForward = React.useCallback(
    () =>
      Animated.timing(animatedValue, {
        toValue: 306,
        duration: 600,
        useNativeDriver: false,
      }).start(),
    [animatedValue],
  );

  const AnimateSVGBack = React.useCallback(
    () =>
      Animated.timing(animatedValue, {
        toValue: 36,
        duration: 600,
        useNativeDriver: false,
      }).start(),
    [animatedValue],
  );

  React.useEffect(() => {
    if (slideIndex % 2 === 1) {
      AnimateSVGForward();
    } else {
      AnimateSVGBack();
    }
  }, [slideIndex, AnimateSVGForward, AnimateSVGBack]);

  const AnimateSVGForwardGreenCircle = React.useCallback(
    () =>
      Animated.timing(animatedGreenCircle, {
        toValue: 266,
        duration: 600,
        useNativeDriver: false,
      }).start(),
    [animatedGreenCircle],
  );

  const AnimateSVGBackGreenCircle = React.useCallback(
    () =>
      Animated.timing(animatedGreenCircle, {
        toValue: 86,
        duration: 600,
        useNativeDriver: false,
      }).start(),
    [animatedGreenCircle],
  );

  React.useEffect(() => {
    if (slideIndex % 2 === 1) {
      AnimateSVGForwardGreenCircle();
    } else {
      AnimateSVGBackGreenCircle();
    }
  }, [slideIndex, AnimateSVGForwardGreenCircle, AnimateSVGBackGreenCircle]);

  const AnimateSVGForwardThirdCircle = React.useCallback(
    () =>
      Animated.timing(animatedThirdCircle, {
        toValue: 36,
        duration: 600,
        useNativeDriver: false,
      }).start(),
    [animatedThirdCircle],
  );

  const AnimateSVGBackThirdCircle = React.useCallback(
    () =>
      Animated.timing(animatedThirdCircle, {
        toValue: 56,
        duration: 600,
        useNativeDriver: false,
      }).start(),
    [animatedThirdCircle],
  );

  React.useEffect(() => {
    if (slideIndex > 0) {
      AnimateSVGForwardThirdCircle();
    } else {
      AnimateSVGBackThirdCircle();
    }
  }, [slideIndex, AnimateSVGForwardThirdCircle, AnimateSVGBackThirdCircle]);

  return (
    <>
      <Animated.Text style={[styles.sphere1, {right: animatedGreenCircle}]}>
        {'\u2B24'}
      </Animated.Text>
      <Animated.Text style={[styles.sphere2, {right: animatedThirdCircle}]}>
        {'\u2B24'}
      </Animated.Text>
      <Animated.Text style={[styles.sphere3, {left: animatedValue}]}>
        {'\u2B24'}
      </Animated.Text>
    </>
  );
};

const styles = StyleSheet.create({
  sphere1: {
    fontSize: 66,
    textAlign: 'center',
    color: 'lightgreen',
    top: dimension.height * 0.5,
    zIndex: 11,
    position: 'absolute',
  },
  sphere2: {
    fontSize: 36,
    textAlign: 'center',
    color: 'white',
    top: dimension.height * 0.58,
    zIndex: 11,
    position: 'absolute',
  },
  sphere3: {
    fontSize: 56,
    textAlign: 'center',
    color: 'white',
    top: dimension.height * 0.5,
    zIndex: 11,
    position: 'absolute',
  },
});

export {SpheresAnimation};
