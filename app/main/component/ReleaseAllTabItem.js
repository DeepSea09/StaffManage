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
    NativeModules
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import Pixel from '../../utils/PixelUtil';

import * as fontAndColor from '../../constant/fontAndColor';

export default class ReleaseAllTabItem extends PureComponent {

    constructor(props) {
        super(props);
        this.py = 0;
        this.px = 0;
        this.state = {
            select: false
        };
    }

    render() {
        let m = true;
        if(this.props.id==0||this.props.id==4){
            m = false;
        }
        return (
            <TouchableOpacity onPress={()=>{
                this.setState({select:!this.state.select},()=>{
                    this.props.callBack(this.props.title,this.state.select);
                });
            }} style={{
                width:  (width-Pixel.getPixel(100))/4,
                 height: Pixel.getPixel(30),
                borderRadius:10,backgroundColor:this.state.select?fontAndColor.COLORB0:fontAndColor.COLORA1,
                alignItems:'center',justifyContent:'center',marginLeft:m?Pixel.getPixel(15):0
            }}>
                <Text style={{color:'#fff',fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28)}}>{
                    this.props.title
                }</Text>
            </TouchableOpacity>
        );
    }

}