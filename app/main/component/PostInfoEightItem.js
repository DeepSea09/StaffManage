/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ListView
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import Pixel from '../../utils/PixelUtil';
import * as fontAndColor from '../../constant/fontAndColor';
import PostInfoOneTab from './PostInfoOneTab';
import {MapView} from 'react-native-amap3d'
export default class PostInfoEightItem extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: 'row'
        };
    }

    render() {
        return (
            <View style={{
                width: width - Pixel.getPixel(30), marginTop: Pixel.getPixel(20),
                justifyContent: 'center', alignItems: 'center',
                marginLeft: Pixel.getPixel(15),height:Pixel.getPixel(200),
            }}>
                <MapView style={{flex:1}}
                         coordinate={{
                             latitude: 31.280516,
                             longitude: 120.937104,
                         }}
                         zoomLevel={18}
                         tilt={45}
                >
                    <MapView.Marker
                        color='red'
                        coordinate={{
                            latitude: 31.280516,
                            longitude: 120.937104,
                        }}
                    />
                </MapView>
            </View>
        );
    }

}