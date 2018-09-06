import { Dimensions, StyleSheet, PixelRatio } from 'react-native';
import deepMap from './deep-map';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default class StyleParser {
  private guidelineBaseWidth: number = 375;

  constructor(guidelineBaseWidth: number = 375) {
    this.guidelineBaseWidth = guidelineBaseWidth;
  }

  public setGuidelineBaseWidth(width: number) {
    this.guidelineBaseWidth = width;
  }

  private scaleView(size: number) {
    return WINDOW_WIDTH / this.guidelineBaseWidth * size;
  }

  private scaleFont(size: number) {
    return size * PixelRatio.getFontScale();
  }

  public parse<T extends StyleSheet.NamedStyles<T>>(style: T): T {
    deepMap(style, this.scaleView, this.scaleFont);
    return style;
  }
}