const reactNative = {
    Dimensions: {
        get: () => ({width: 750, height: 1334})
    },
    StyleSheet: {
        create: x => x,
        hairlineWidth: 'mock',
        absoluteFill: 'mock',
        absoluteFillObject: 'mock',
        flatten: 'mock',
    },
    PixelRatio: {
        get: () => 2,
        getFontScale: () => 2,
    },
};

module.exports = reactNative;
