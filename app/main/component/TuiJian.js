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
    ListView,
    TextInput
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import Pixel from '../../utils/PixelUtil';
import * as fontAndColor from '../../constant/fontAndColor';
export  default class TuiJian extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: 'row'
        };
    }

    render() {
        return (
            <TouchableOpacity onPress={()=>{

            }} style={{width: width,height:Pixel.getPixel(50),
            flexDirection:'row'}}>
                <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
                    <Image source={this.props.data.left} style={{
                        width:Pixel.getPixel(25),height:Pixel.getPixel(25),
                        marginLeft:Pixel.getPixel(15)
                    }}></Image>
                    <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),
                    color:'#000',fontWeight:'bold',marginLeft:Pixel.getPixel(15)}}>{this.props.data.name}</Text>
                </View>
                <View style={{flex:2, flexDirection:'row',alignItems:'center'}}>
                    <TextInput
                        onChangeText={(text) => {
                            this.props.callBack(text);
                        }}
                        style={{
                            //backgroundColor: 'transparent',
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            color: '#000',
                            padding: 0,
                            borderWidth: 1,
                            height: Pixel.getPixel(30),
                            width: Pixel.getPixel(180),
                            borderColor: fontAndColor.COLORA4,
                            marginLeft:Pixel.getPixel(15),
                            textAlign:'left'
                        }}
                        underlineColorAndroid="transparent"
                    />
                </View>
            </TouchableOpacity>
        );
    }

}