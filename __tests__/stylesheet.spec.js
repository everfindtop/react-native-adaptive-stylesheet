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
    expect(StyleSheet.create(style).container.marginTop).toBe(60 * 750 / 375);
    expect(StyleSheet.create(style).container.borderWidth).toBe(1 * 750 / 375);
    expect(StyleSheet.create(style).container.borderRadius).toBe(10 * 750 / 375);
    expect(StyleSheet.create(style).container.fontSize).toBe(20);
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
    expect(StyleSheet.create(style).container.fontSize).toBe(20);
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
