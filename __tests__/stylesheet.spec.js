jest.mock('react-native');
import StyleSheet from '../lib';

test('StyleSheet property equal', () => {
    expect(StyleSheet.absoluteFill).toBe('mock');
    expect(StyleSheet.absoluteFillObject).toBe('mock');
    expect(StyleSheet.flatten).toBe('mock');
    expect(StyleSheet.hairlineWidth).toBe('mock');
});

test('scaleable property get scaled', () => {
    const style = {
        container: {
            marginTop: 60,
            fontSize: 20,
            borderWidth: 1,
            borderRadius: 10,
        },
    };
    // default guidelineBaseWidth is 375 and mock window.width is 750
    expect(StyleSheet.create(style).container.marginTop).toBe(60 * 750 / 375);
    expect(StyleSheet.create(style).container.borderWidth).toBe(1 * 750 / 375);
    expect(StyleSheet.create(style).container.borderRadius).toBe(10 * 750 / 375);
    // mock fontScale is 2
    expect(StyleSheet.create(style).container.fontSize).toBe(40);
});

test('not scaleable property can not got scaled', () => {
    const style = {
        container: {
            zIndex: 60,
            fontFamily: 'test'
        },
    };
    expect(StyleSheet.create(style).container.zIndex).toBe(60);
    expect(StyleSheet.create(style).container.fontFamily).toBe('test');
});

test('setGuildlineBaseWidth works', () => {
    StyleSheet.setGuidelineBaseWidth(750);
    const style = {
        container: {
            marginTop: 60,
            fontSize: 20,
            borderWidth: 1,
            borderRadius: 10,
            width: 123.5
        },
    };
    expect(StyleSheet.create(style).container.marginTop).toBe(60);
    expect(StyleSheet.create(style).container.borderWidth).toBe(1);
    expect(StyleSheet.create(style).container.borderRadius).toBe(10);
    expect(StyleSheet.create(style).container.fontSize).toBe(40);
    expect(StyleSheet.create(style).container.width).toBe(123.5);
});

test('scale string value', () => {
    StyleSheet.setGuidelineBaseWidth(375);
    const style = {
        container: {
            marginTop: '60',
            width: '123.5'
        },
    };
    expect(StyleSheet.create(style).container.marginTop).toBe(60 * 2);
    expect(StyleSheet.create(style).container.width).toBe(123.5 * 2);
});

test('invalid string value can not be scaled', () => {
    const style = {
        container: {
            marginTop: '60d',
            width: '123345.',
            height: '.123345',
        },
    };
    expect(StyleSheet.create(style).container.marginTop).toBe('60d');
    expect(StyleSheet.create(style).container.width).toBe('123345.');
    expect(StyleSheet.create(style).container.height).toBe('.123345');
});

test('no abject style', () => {
    const style = 'no a object';
    expect(StyleSheet.create(style)).toBe(style);
});

test('width configuration', () => {
    const config = {
        width: 375,
    };
    StyleSheet.configure(config);
    const style = {
        container: {
            marginTop: 60,
        },
    };
    expect(StyleSheet.create(style).container.marginTop).toBe(60 * 2);
});

test('scaleFont configuration', () => {
    StyleSheet.setGuidelineBaseWidth(750);
    const config = {
        scaleFont: true,
    };
    StyleSheet.configure(config);
    const style = {
        container: {
            fontSize: 60,
        },
    };
    expect(StyleSheet.create(style).container.fontSize).toBe(60);
});

test('scaleView', () => {
    StyleSheet.setGuidelineBaseWidth(750);
    expect(StyleSheet.scaleView(60)).toBe(60);
    expect(StyleSheet.scaleView(StyleSheet.hairlineWidth)).toBe(StyleSheet.hairlineWidth);
});

test('scaleFont', () => {
    StyleSheet.setGuidelineBaseWidth(750);
    StyleSheet.configure({
        scaleFont: false,
    });
    expect(StyleSheet.scaleFont(60)).toBe(60 * 2);
});

test('hairlineWidth in create()', () => {
    StyleSheet.setGuidelineBaseWidth(750);
    StyleSheet.configure({
        shouldScaleFont: false,
    });
    const style = {
        container: {
            width: StyleSheet.hairlineWidth,
        },
    };
    expect(StyleSheet.create(style).container.width).toBe(StyleSheet.hairlineWidth);
});

