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
    res[key] = fn(key, obj[key]);
    return res;
  }, {});

function isObject<T>(val: T): boolean {
  return !!(val && typeof val === 'object');
}

export default function deepMap<T extends StyleSheet.NamedStyles<T>>(obj: T, viewScaler: ScaleFunc, fontScaler: ScaleFunc): T {
  function scaleValue(key: string, val: T) {
    let scaleFunc;
    if (parseableStyleProperty[key]) {
      scaleFunc = viewScaler;
    } else if (parseableFontProperty[key]) {
      scaleFunc = fontScaler;
    }
    let value: any = val;
    if ((typeof val === 'string' || val instanceof String) && val.match(/^\d+(\.\d+)?$/)) {
      value = Number(val);
    }
    if ((typeof value === 'number' || value instanceof Number) && scaleFunc) {
      return scaleFunc(value as number);
    }
    return value;
    
  }
  const deepMapper = (key: string, val: T) => {
    if (isObject(val)) {
      return deepMap(val, viewScaler, fontScaler);
    } else {
      return scaleValue(key, val);
    }
  };
  if (isObject(obj)) {
    return mapObject(obj, deepMapper);
  }
  return obj;
};