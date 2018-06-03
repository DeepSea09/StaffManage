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

export default class ReleaseSelectPow extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            show: 'row',
            x: 0,
            y: 0,
            w: 0,
            width:0,
            height:0,
            content:[],
            id:-1
        };
    }
    changeShow=(x,y,content,id)=>{
        console.log('----------------------');
        console.log(x+'----------------------'+y);
        this.setState({
            x:x,y:y,w:180,width:width,
            height:height,content:content,
            id:id
        });
    }

    render() {
        let itemList = [];
        for(let i = 0;i<this.state.content.length;i++){
            itemList.push(<TouchableOpacity onPress={()=>{
                this.props.callBack(this.state.content[i],this.state.id);
                this.setState({
                    width:0,
                    height:0
                });
            }} key={i+'top'} style={{width:Pixel.getPixel(180),height:Pixel.getPixel(25),
            justifyContent:'center',paddingLeft:Pixel.getPixel(5)}}>
                <Text style={{
                    fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                    color: '#000'
                }}>{this.state.content[i]}</Text>
            </TouchableOpacity>);
        }
        return (
            <TouchableOpacity style={{width:this.state.width,height:this.state.height,
            backgroundColor:'rgba(0, 0, 0,0)',position: 'absolute',top:0,left:0}}  onPress={()=>{
                this.setState({
                    width:0,
                    height:0
                });
            }}>
                <View style={{
                    width: Pixel.getPixel(this.state.w),
                    backgroundColor: '#fff', position: 'absolute', overflow: 'hidden',
                    top:this.state.y+Pixel.getPixel(25),left:this.state.x,
                    borderWidth:1,borderTopWidth:0
                }}>
                    {itemList}
                </View>
            </TouchableOpacity>
        );
    }

}