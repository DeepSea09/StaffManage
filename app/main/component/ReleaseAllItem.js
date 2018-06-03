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
import ReleaseAllTabItem from './ReleaseAllTabItem';
export default class ReleaseAllItem extends PureComponent {

    constructor(props) {
        super(props);
        this.py = 0;
        this.px = 0;
        this.state = {
            select: ''
        };
    }

    render() {
        let itemList = [];
        let outList = [];
        for (let i = 0;i<this.props.data.content.length;i++){
            if(i<=3){
                itemList.push(<ReleaseAllTabItem key={i+'11'} title={this.props.data.content[i]} 
                                                 callBack={(content,is)=>{
                        this.props.callBack(content,is);
                }} id={i}/>);
            }else{
                outList.push(<ReleaseAllTabItem key={i+'11'} title={this.props.data.content[i]} 
                                                callBack={(content,is)=>{
                    this.props.callBack(content,is);
                }} id={i}/>);
            }
        
            
        }
        return (
            <View style={{
                width: width - Pixel.getPixel(40),
                 marginHorizontal: Pixel.getPixel(20)
            }}>
                <View style={{width:width - Pixel.getPixel(40), justifyContent: 'center'}}>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        color: '#000'
                    }}>{this.props.data.name}</Text>
                </View>
                <View style={{width:width - Pixel.getPixel(40),marginTop:Pixel.getPixel(10),
                    flexDirection:'row',justifyContent:'center'}}>
                    {itemList}
                </View>
                <View style={{width:width - Pixel.getPixel(40),marginTop:Pixel.getPixel(10),
                    flexDirection:'row',justifyContent:'center',marginBottom:Pixel.getPixel(10)}}>
                    {outList}
                </View>
            </View>
        );
    }

}