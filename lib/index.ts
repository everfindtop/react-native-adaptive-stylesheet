import { StyleSheet as RNStyleSheet, RegisteredStyle } from 'react-native';
import Parser from './style-parser';

class StyleSheet {
  public hairlineWidth = RNStyleSheet.hairlineWidth;
  public absoluteFill = RNStyleSheet.absoluteFill;
  public absoluteFillObject = RNStyleSheet.absoluteFillObject;
  public flatten = RNStyleSheet.flatten;

  public setGuidelineBaseWidth (width: number) {
    this.parser.setGuidelineBaseWidth(width);
  }

  public create<T extends RNStyleSheet.NamedStyles<T>>(styles: T): { [P in keyof T]: RegisteredStyle<T[P]> } {
    const newStyle = this.parser.parse(styles);
    return RNStyleSheet.create(newStyle);
  }

  private parser: Parser = new Parser();
}

export default new StyleSheet();
