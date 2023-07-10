import { StyleSheet } from "react-native";

/* Constants */
const Color = {
  primary: {
    royalBlue: "#3B60F2",
    riptide: "#75E9A9",
  },
  neutral: {
    black: "#000000",
    mineShaft: "#222222",
    boulder: "#757575",
    silver: "#BFBFBF",
    mercury: "#E5E5E5",
    wildSand: "#F4F4F4",
    white: "#FFFFFF",
    concrete: "#F2F2F2",
  },
  semantic: {
    froly: "#F97C7C",
  },
};

const Spacing = {
  2: 2,
  4: 4,
  8: 8,
  12: 12,
  14: 14,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
  40: 40,
  48: 48,
  56: 56,
  64: 64,
  80: 80,
  96: 96,
  160: 160,
};

/* Base styles */
const Heading = StyleSheet.create({
  h1: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: -0.24,
    lineHeight: 20,
  },
  h2: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: -0.24,
    lineHeight: 18,
  },
  h3: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    fontSize: 16,
    letterSpacing: -0.24,
    lineHeight: 14,
  },
});

const Subtitle = StyleSheet.create({
  1: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: -0.24,
    lineHeight: 20,
  },
  2: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    fontSize: 14,
    letterSpacing: -0.24,
    lineHeight: 18,
  },
  3: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    fontSize: 12,
    letterSpacing: -0.24,
    lineHeight: 14,
  },
});

const Body = StyleSheet.create({
  small: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    fontSize: 12,
    letterSpacing: -0.24,
    lineHeight: 20,
  },
  medium: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    fontSize: 14,
    letterSpacing: -0.24,
    lineHeight: 23,
  },
  large: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    fontSize: 16,
    letterSpacing: -0.24,
    lineHeight: 28,
  },
});

const UnorderedList = StyleSheet.create({
  small: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    fontSize: 12,
    letterSpacing: -0.24,
    lineHeight: 16,
  },
  medium: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    fontSize: 14,
    letterSpacing: -0.24,
    lineHeight: 21,
  },
  large: {
    fontFamily: "Helvetica",
    fontWeight: "normal",
    fontSize: 16,
    letterSpacing: -0.24,
    lineHeight: 26,
  },
});

const Button = StyleSheet.create({
  default: {
    fontFamily: "Helvetica",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: -0.24,
    lineHeight: 20,
  },
});
export { Color, Spacing, Heading, Subtitle, Body, UnorderedList, Button };
