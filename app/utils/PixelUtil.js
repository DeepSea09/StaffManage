import React, {Component} from 'react';
import {
    PixelRatio,
    Platform,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default class PixelUtil {

    static getPixel (px) {

        if (Platform.OS === 'android') {
            return Math.round((px / 375.0) * width);
        } else {
            return Math.round((px / 375.0) * width);
        }
    }


    static getFontPixel(px){
        if (Platform.OS === 'android') {
            return Math.round((px / 375.0) * width);
        } else {
            return Math.round((px / 375.0) * width);

        }
    }


    static getTitlePixel(px) {
        console.log(Math.round(((px - 20) / 375.0) * width));
        if (Platform.OS === 'android') {
            return Math.round(((px - 20) / 375.0) * width);
        } else {
            return Math.round((px / 375.0) * width);

        }
    }


    static getBottomPixel(px) {
        if (Platform.OS === 'android') {
            return Math.round(((px + 20) / 375.0) * width);
        } else {
            return Math.round((px / 375.0) * width);

        }
    }
}
