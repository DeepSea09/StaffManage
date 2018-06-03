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

export default class ReleaseSelectItem extends PureComponent {

    constructor(props) {
        super(props);
        this.py = 0;
        this.px = 0;
        this.state = {
            select: ''
        };
    }

    render() {
        return (
            <View style={{
                width: width - Pixel.getPixel(40), height: Pixel.getPixel(40),
                flexDirection: 'row', marginHorizontal: Pixel.getPixel(20)
            }}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                        color: '#000'
                    }}>{this.props.data.name}</Text>
                </View>
                <View style={{flex: 2, alignItems: 'center', flexDirection: 'row'}}
                      >
                    <TouchableOpacity onPress={()=>{
                        this.setState({select:this.props.data.content[0]},()=>{
                            this.props.callBack(this.state.select);
                        });
                    }} style={{flex:1,flexDirection:'row',alignItems:'center',
                    justifyContent:'center'}}>
                        <View style={{width:Pixel.getPixel(20),height:Pixel.getPixel(20),
                        borderWidth:1,borderRadius:100,borderColor:this.state.select==this.props.data.content[0]?
                                fontAndColor.COLORB0:fontAndColor.COLORA1,
                        alignItems:'center',justifyContent:'center'}}>
                            <View style={{width:Pixel.getPixel(10),height:Pixel.getPixel(10),
                                borderRadius:100,backgroundColor:this.state.select==this.props.data.content[0]?
                                    fontAndColor.COLORB0:fontAndColor.COLORA1}}>

                            </View>
                        </View>
                        <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORA1,
                        marginLeft:Pixel.getPixel(5)}}>{this.props.data.content[0]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.setState({select:this.props.data.content[1]},()=>{
                            this.props.callBack(this.state.select);
                        });
                    }} style={{flex:1,flexDirection:'row',alignItems:'center',
                        justifyContent:'center'}}>
                        <View style={{width:Pixel.getPixel(20),height:Pixel.getPixel(20),
                            borderWidth:1,borderRadius:100,borderColor:this.state.select==this.props.data.content[1]?
                                fontAndColor.COLORB0:fontAndColor.COLORA1,
                            alignItems:'center',justifyContent:'center'}}>
                            <View style={{width:Pixel.getPixel(10),height:Pixel.getPixel(10),
                                borderRadius:100,backgroundColor:this.state.select==this.props.data.content[1]?
                                    fontAndColor.COLORB0:fontAndColor.COLORA1}}>

                            </View>
                        </View>
                        <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORA1,
                            marginLeft:Pixel.getPixel(5)}}>{this.props.data.content[1]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{
                        this.setState({select:this.props.data.content[2]},()=>{
                            this.props.callBack(this.state.select);
                        });
                    }} style={{flex:1,flexDirection:'row',alignItems:'center',
                        justifyContent:'center'}}>
                        <View style={{width:Pixel.getPixel(20),height:Pixel.getPixel(20),
                            borderWidth:1,borderRadius:100,borderColor:this.state.select==this.props.data.content[2]?
                                fontAndColor.COLORB0:fontAndColor.COLORA1,
                            alignItems:'center',justifyContent:'center'}}>
                            <View style={{width:Pixel.getPixel(10),height:Pixel.getPixel(10),
                                borderRadius:100,backgroundColor:this.state.select==this.props.data.content[2]?
                                    fontAndColor.COLORB0:fontAndColor.COLORA1}}>

                            </View>
                        </View>
                        <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),color:fontAndColor.COLORA1,
                            marginLeft:Pixel.getPixel(5)}}>{this.props.data.content[2]}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

}