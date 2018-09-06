import { StyleSheet } from 'react-native';

interface ScaleFunc {
  (size: number): number;
}

const parseableStyleProperty: {
  [key: string]: boolean;
} = {
  borderBottomEndRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderBottomStartRadius: true,
  borderBottomWidth: true,
  borderLeftWidth: true,
  borderRadius: true,
  borderRightWidth: true,
  borderTopEndRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderTopStartRadius: true,
  borderTopWidth: true,
  borderWidth: true,
  height: true,
  letterSpacing: true,
  lineHeight: true,
  margin: true,
  marginBottom: true,
  marginLeft: true,
  marginRight: true,
  marginTop: true,
  padding: true,
  paddingBottom: true,
  paddingLeft: true,
  paddingRight: true,
  paddingTop: true,
  textShadowRadius: true,
  width: true,
}

const parseableFontProperty: {
  [key: string]: boolean;
} = {
  fontSize: true,
};

const mapObject = (obj: any, fn: any) => Object.keys(obj).reduce(
  (res: any, key) => {
    res[key] = fn(obj[key]);
    return res;
  }, {});

function isObject<T>(val: T): boolean {
  return !!(val && typeof val === 'object');
}

function noop(val: any) {
  return val;
}

export default function deepMap<T extends StyleSheet.NamedStyles<T>>(obj: T, viewScaler: ScaleFunc, fontScaler: ScaleFunc) {
  function scaleValue(val: keyof T) {
    let scaleFunc = noop;
    if (parseableStyleProperty[val as string]) {
      scaleFunc = viewScaler;
    } else if (parseableFontProperty[val as string]) {
      scaleFunc = fontScaler;
    }
    let value: any = val;
    if (typeof val === 'string' || val instanceof String) {
      value = Number(val);
    }
    return scaleFunc(value as number);
  }
  const deepMapper = (val: T) => {
    if (isObject(val)) {
      deepMap(val, viewScaler, fontScaler);
    } else {
      return scaleValue(val);
    }
  };
  if (Array.isArray(obj)) {
    return obj.map(deepMapper);
  }
  if (isObject(obj)) {
    return mapObject(obj, deepMapper);
  }
  return obj;
};