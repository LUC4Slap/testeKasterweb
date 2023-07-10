import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {Icon} from './Icon';

import {UnorderedList, Color, Spacing, Button} from '../styles';

interface Dots {
  slides: Array<any>;
  activeIndex: number;
}
const PaginationDots = ({slides, activeIndex}: Dots) => {
  return (
    <View style={styles.dotsContainer}>
      {slides.map((_, index) => (
        <Text
          key={index}
          style={[
            UnorderedList.large,
            {
              marginLeft:
                index === 0 || index === slides.length
                  ? undefined
                  : Spacing[12],
              color:
                activeIndex === index
                  ? Color.primary.riptide
                  : Color.neutral.white,
            },
          ]}>
          {'\u2B24'}
        </Text>
      ))}
    </View>
  );
};

interface PaginationButtons {
  slide: {backButtonText: string; text: string; done: string};
  scrollToNext?: () => void;
  scrollToPrevious?: () => void;
  done?: () => void;
}
const PaginationButtons = ({
  slide,
  scrollToNext,
  scrollToPrevious,
  done,
}: PaginationButtons) => {
  return (
    <>
      {slide.backButtonText && (
        <TouchableOpacity
          style={[styles.buttonContainer, {left: Spacing[16]}]}
          onPress={scrollToPrevious}>
          <Icon name="arrow" size={12} color={Color.neutral.white} />
          <Text style={[Button.default, styles.button, styles.buttonPrevious]}>
            Anterior
          </Text>
        </TouchableOpacity>
      )}
      {slide.text && (
        <TouchableOpacity
          style={[styles.buttonContainer, {right: Spacing[16]}]}
          onPress={scrollToNext}>
          <Text style={[Button.default, styles.button, styles.buttonNext]}>
            Próximo
          </Text>
          <Icon
            name="arrow"
            size={12}
            color={Color.neutral.white}
            style={{transform: [{rotateY: '180deg'}]}}
          />
        </TouchableOpacity>
      )}
      {slide.done && (
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            {
              right: Spacing[16],
            },
          ]}
          onPress={done}>
          <Text style={[Button.default, styles.done, styles.buttonNext]}>
            Login
          </Text>
          <Icon
            name="arrow"
            size={12}
            color={Color.neutral.white}
            style={{transform: [{rotateY: '180deg'}]}}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

interface Navigation {
  slides: Array<any>;
  activeIndex: number;
  slide: {backButtonText: string; text: string; done: string};
  scrollToNext?: () => void;
  scrollToPrevious?: () => void;
  done?: () => void;
}
function SlideNavigation({
  slides,
  slide,
  scrollToNext,
  scrollToPrevious,
  done,
  activeIndex,
}: Navigation) {
  return (
    <>
      <PaginationDots slides={slides} activeIndex={activeIndex} />
      <PaginationButtons
        slide={slide}
        scrollToNext={scrollToNext}
        scrollToPrevious={scrollToPrevious}
        done={done}
      />
    </>
  );
}
const styles = StyleSheet.create({
  dotsContainer: {
    position: 'absolute',
    top: '24%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: '56%',
  },
  button: {
    color: Color.neutral.white,
    paddingBottom: Spacing[4],
  },
  buttonNext: {
    marginRight: Spacing[12],
  },
  buttonPrevious: {
    marginLeft: Spacing[12],
  },
  done: {
    color: Color.primary.riptide,
    paddingBottom: Spacing[4],
  },
});
export {SlideNavigation, PaginationDots, PaginationButtons};
