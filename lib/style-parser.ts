import { Dimensions, StyleSheet, PixelRatio } from 'react-native';
import deepMap from './deep-map';

const WINDOW_WIDTH = Dimensions.get('window').width;

export default class StyleParser {
  private guidelineBaseWidth: number = 375;
  private shouldScaleFont: boolean = false;

  constructor(guidelineBaseWidth: number = 375, scaleFont: boolean = false) {
    this.guidelineBaseWidth = guidelineBaseWidth;
    this.shouldScaleFont = scaleFont;
  }

  public setGuidelineBaseWidth(width: number) {
    this.guidelineBaseWidth = width;
  }

  public setScaleFont(scale: boolean) {
    this.shouldScaleFont = scale;
  }

  public scaleView = (size: number) => {
    if (size === StyleSheet.hairlineWidth) {
      return size;
    }
    return WINDOW_WIDTH / this.guidelineBaseWidth * size;
  }

  public scaleFont = (size: number) => {
    if (this.shouldScaleFont) {
      return this.scaleView(size);
    }
    return size * PixelRatio.getFontScale();
  }

  public parse<T extends StyleSheet.NamedStyles<T>>(style: T): T {
    return deepMap(style, this.scaleView, this.scaleFont);
  }
}