import React, { useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';

interface ModalTypes {
  height: Animated.Value;
  opacity: Animated.Value;
  children: React.ReactElement[] | React.ReactElement | Element;
}

const Modal = ({ height, opacity, children }: ModalTypes) => {
  const animatedStyles = {
    transform: [{ translateY: height }],
    opacity,
  };
  return (
    <Animated.View style={[styles.modal, animatedStyles]}>
      {children}
    </Animated.View>
  );
};

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

interface BottomSheetTypes {
  translationY: Animated.Value;
  children: React.ReactElement[] | React.ReactElement | Element;
  height?: number | undefined;
  setClose: () => void;
}

const ModalBottomsheet = ({
  children,
  translationY,
  height,
  setClose,
}: BottomSheetTypes) => {
  const animatedStyles = {
    transform: [{ translateY: translationY }],
  };

  const bottomDragLimit = dimension.height * 0.78;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: translationY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, _) => {
        if (e.nativeEvent.pageY > bottomDragLimit) {
          setClose();
        }
        Animated.spring(translationY, SPRING_CONFIG(0, 0)).start();
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[styles.modalBottomsheet, { height }, animatedStyles]}
      {...panResponder.panHandlers}>
      <>
        <Handler />
        {children}
      </>
    </Animated.View>
  );
};

interface ModalContainer {
  children: React.ReactElement[] | React.ReactElement | Element;
  isVisible: boolean;
  height?: number | undefined;
  onClose: () => void;
}

const dimension = Dimensions.get('screen');

export const BottomSheetPureReact = ({
  children,
  isVisible,
  height,
  onClose,
}: ModalContainer) => {
  const animatedHeight = useRef(new Animated.Value(dimension.height)).current;
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedTranslation = useRef(
    new Animated.Value(dimension.height / 2),
  ).current;

  const setOpen = useCallback(
    () =>
      Animated.sequence([
        Animated.timing(animatedHeight, {
          toValue: 0,
          duration: 10,
          useNativeDriver: false,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.spring(animatedTranslation, SPRING_CONFIG(0, 310)),
      ]).start(),
    [animatedHeight, animatedOpacity, animatedTranslation],
  );

  const setClose = useCallback(() => {
    Animated.sequence([
      Animated.spring(
        animatedTranslation,
        SPRING_CONFIG(dimension.height / 2, 300),
      ),
      Animated.timing(animatedOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(animatedHeight, {
        toValue: dimension.height,
        duration: 310,
        useNativeDriver: false,
      }),
    ]).start();
    onClose();
  }, [animatedHeight, animatedOpacity, animatedTranslation, onClose]);

  useEffect(() => {
    if (isVisible) {
      setOpen();
    } else {
      setClose();
    }
  }, [isVisible, setOpen, setClose]);

  return (
    <Modal height={animatedHeight} opacity={animatedOpacity}>
      <ModalBottomsheet
        translationY={animatedTranslation}
        height={height}
        setClose={setClose}>
        {children}
      </ModalBottomsheet>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.4)',
  },
  modalBottomsheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 18,
  },
  button: {
    borderRadius: 8,
    backgroundColor: 'purple',
    height: 48,
    margin: 16,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  bottomSheetHandler: {
    minHeight: 40,
    maxHeight: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingTop: 20,
  },
  handler: {
    backgroundColor: 'silver',
    height: 5,
    width: 70,
    borderRadius: 20,
  },
});
