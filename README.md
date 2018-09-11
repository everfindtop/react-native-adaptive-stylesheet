# react-native-adaptive-stylesheet

![npm version](https://badge.fury.io/js/react-native-adaptive-stylesheet.svg)
![build status](https://travis-ci.org/TBingooo/react-native-adaptive-stylesheet.svg?branch=master)
![coverage](https://coveralls.io/repos/github/TBingooo/react-native-adaptive-stylesheet/badge.svg?branch=master)

A stylesheet for scaling the size of your app's UI across different sized devices。  

## Installation
```bash
npm install --save react-native-adaptive-stylesheet
```

## Motivation
When developing with react-native, you need to manually adjust your app to look great on variety of different screen sizes. That's a tedious job.  And additionally, designer offen gives you a guideline size base on a popular device, for example iphone 6/7/8. How could you adjust such a guideline size to other screen sizes? Don't worry, react-native-adaptive-stylesheet will help you make your scaling a whole lot easier.  
As we all know, all dimensions in React Native are unitless, and represent density-independent pixels(dp). The IOS and Android system will help us to adjust actual size of dp in different devices. So the idea is to develop once on a baseline mobile device(like iphone 6) and then simply apply the scale util.  
The core of this library is the ability of scaling guideline size to variety of different screen sizes.  Example code is like follows:
```js
import { Dimensions, PixelRatio } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

function scaleSize(size) {
  return WINDOW_WIDTH / guidelineBaseWidth * size;
}
function scaleFont(size) {
  return size * PixelRatio.getFontScale();
}
```
## Api
The api of react-native-adaptive-stylesheet is just like StyleSheet of React Native.  

* hairlineWidth
* absoluteFill
* absoluteFillObject
* flatten

The above four properities are the same as React Native StyleSheet.  

* setGuidelineBaseWidth  
Set the guideline screen width of your designer's layout. All calculation of scaling will be based on the guideline width you set.
```js
import StyleSheet from 'react-native-adaptive-stylesheet';
StyleSheet.setGuidelineBaseWidth(375);
```

* configure(options)  
Set global configuratioin.  
  - options.width Set the guideline screen width of your designer's layout
  - options.scaleFont If true, all font size will scale according to screen size just like other style properties. If false, scale according to PixelRatio.getFontScale(). Default is false.
```js
import StyleSheet from 'react-native-adaptive-stylesheet';
StyleSheet.configure({
  width: 375,
  scaleFont: true,
});
```

* create  
The same as React Native `StyleSheet.create`, except doing scaling internally.