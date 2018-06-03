import React from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    BackAndroid,
    InteractionManager,
    Text,
    AppState,
    ListView
} from 'react-native';

import BaseComponent from '../component/BaseComponent';
let {height, width} = Dimensions.get('window');

import  Pixel from '../utils/PixelUtil'
import * as fontAndColor from '../constant/fontAndColor';
import NavigationView from '../component/AllNavigationView';
import MineAuthItem from './component/MineAuthItem';
import CarIDScene from "./CarIDScene";
import * as Urls from "../constant/appUrls";
import {request} from "../utils/RequestUtil";
import  TuiJianGongYouScene from './TuiJianGongYouScene';
export default class MineMoneyScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.wage=0;
        this.backFee=0;
        this.prize=0;
        this.loan=0;
        this.state = {
            renderPlaceholderOnly: 'blank'
        };
    }

    initFinish = () => {
        let maps = {};
        request(Urls.MYWAGE, 'Post', maps)
            .then((response) => {
                    console.log(response);
                    this.wage=response.mjson.data.wage;
                    this.backFee=response.mjson.data.backFee;
                    this.prize=response.mjson.data.prize;
                    this.loan=response.mjson.data.loan;
                    this.setState({
                        renderPlaceholderOnly: 'success'
                    });
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }

    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return this._renderPlaceholderView();
        }
        return (<View style={{flex:1, backgroundColor:'#fff',alignItems:'center'}}>
            <View style={{width:width,height:Pixel.getPixel(180),justifyContent:'center',
                alignItems:'center',marginTop:Pixel.getTitlePixel(64), backgroundColor:'#0ff'}}>
                <Text style={{fontSize:Pixel.getPixel(fontAndColor.BUTTONFONT30), color:'#000',
                    fontWeight:'bold',marginTop:Pixel.getPixel(10)}}>占位图</Text>
            </View>
            <View style={{width:width,height:Pixel.getPixel(130),marginTop:Pixel.getPixel(30),
            flexDirection:'row'}}>
                <View style={{flex:1}}>
                    <View style={{marginTop:Pixel.getPixel(10),flexDirection:'row'
                    }}>
                        <View style={{flex:1, justifyContent:'center'}}>
                            <View style={{width:Pixel.getPixel(60),height:Pixel.getPixel(25),
                                backgroundColor:fontAndColor.COLORB0,alignItems:'center',
                            justifyContent:'center',borderRadius:5,marginLeft:Pixel.getPixel(15)}}>
                                <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28), color:'#fff'
                                }}>工资</Text>
                            </View>
                        </View>
                        <View style={{flex:1, justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28), color:'#000'
                            ,marginRight:Pixel.getPixel(15)}}>详情</Text>
                        </View>
                    </View>
                    <Text style={{fontSize:Pixel.getPixel(35), color:'#000'
                        ,marginTop:Pixel.getPixel(30),marginLeft:Pixel.getPixel(30)}}>￥<Text style={{fontSize:Pixel.getPixel(30),
                        color:'#F26D0F'}}>{this.wage}</Text></Text>
                </View>
                <View style={{width:1,height:Pixel.getPixel(105), backgroundColor:'#000'}}></View>
                <View style={{flex:1}}>
                    <View style={{marginTop:Pixel.getPixel(10),flexDirection:'row'
                    }}>
                        <View style={{flex:1, justifyContent:'center'}}>
                            <View style={{width:Pixel.getPixel(60),height:Pixel.getPixel(25),
                                backgroundColor:fontAndColor.COLORB0,alignItems:'center',
                                justifyContent:'center',borderRadius:5,marginLeft:Pixel.getPixel(15)}}>
                                <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28), color:'#fff'
                                }}>返费</Text>
                            </View>
                        </View>
                        <View style={{flex:1, justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28), color:'#000'
                                ,marginRight:Pixel.getPixel(15)}}>详情</Text>
                        </View>
                    </View>
                    <Text style={{fontSize:Pixel.getPixel(35), color:'#000'
                        ,marginTop:Pixel.getPixel(30),marginLeft:Pixel.getPixel(30)}}>￥<Text style={{fontSize:Pixel.getPixel(30),
                        color:'#F26D0F'}}>{this.backFee}</Text></Text>
                </View>
            </View>
            <View style={{width:width,height:1, backgroundColor:'#fff',flexDirection:'row'}}>
                <View style={{width:(width-Pixel.getPixel(80))/2,height:1, backgroundColor:'#000',
                marginLeft:Pixel.getPixel(15)}}>

                </View>
                <View style={{width:(width-Pixel.getPixel(80))/2,height:1, backgroundColor:'#000',
                    marginLeft:Pixel.getPixel(50)}}>

                </View>
            </View>
            <View style={{width:width,height:Pixel.getPixel(130),
                flexDirection:'row'}}>
                <View style={{flex:1}}>
                    <View style={{marginTop:Pixel.getPixel(10),flexDirection:'row'
                    }}>
                        <View style={{flex:1, justifyContent:'center'}}>
                            <View style={{width:Pixel.getPixel(60),height:Pixel.getPixel(25),
                                backgroundColor:fontAndColor.COLORB0,alignItems:'center',
                                justifyContent:'center',borderRadius:5,marginLeft:Pixel.getPixel(15)}}>
                                <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28), color:'#fff'
                                }}>奖励</Text>
                            </View>
                        </View>
                        <View style={{flex:1, justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28), color:'#000'
                                ,marginRight:Pixel.getPixel(15)}}>详情</Text>
                        </View>
                    </View>
                    <Text style={{fontSize:Pixel.getPixel(35), color:'#000'
                        ,marginTop:Pixel.getPixel(30),marginLeft:Pixel.getPixel(30)}}>￥<Text style={{fontSize:Pixel.getPixel(30),
                        color:'#F26D0F'}}>{this.prize}</Text></Text>
                </View>
                <View style={{width:1,height:Pixel.getPixel(105), backgroundColor:'#000',
                marginTop:Pixel.getPixel(25)}}></View>
                <View style={{flex:1}}>
                    <View style={{marginTop:Pixel.getPixel(10),flexDirection:'row'
                    }}>
                        <View style={{flex:1, justifyContent:'center'}}>
                            <View style={{width:Pixel.getPixel(60),height:Pixel.getPixel(25),
                                backgroundColor:fontAndColor.COLORB0,alignItems:'center',
                                justifyContent:'center',borderRadius:5,marginLeft:Pixel.getPixel(15)}}>
                                <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28), color:'#fff'
                                }}>借支</Text>
                            </View>
                        </View>
                        <View style={{flex:1, justifyContent:'center',alignItems:'flex-end'}}>
                            <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28), color:'#000'
                                ,marginRight:Pixel.getPixel(15)}}>详情</Text>
                        </View>
                    </View>
                    <Text style={{fontSize:Pixel.getPixel(35), color:'#000'
                        ,marginTop:Pixel.getPixel(30), marginLeft:Pixel.getPixel(30)}}>￥<Text style={{fontSize:Pixel.getPixel(30),
                        color:'#33BF2B'}}>{this.loan}</Text></Text>
                </View>
            </View>
            <View style={{width:Pixel.getPixel(100),height:Pixel.getPixel(30),
                backgroundColor:'red',alignItems:'center',
                justifyContent:'center',borderRadius:10,marginTop:Pixel.getPixel(30)}}>
                <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28), color:'#fff'
                }}>我要提现</Text>
            </View>
            <NavigationView
                title="我的薪水"
                backIconClick={this.backPage}
            />
        </View>)
    }

    _renderPlaceholderView() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
                {this.loadView()}
                <NavigationView
                    title={"我申请的工作"}
                    backIconClick={this.backPage}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    parentStyle: {
        flex: 1
    },
    childStyle: {
        width: width,
        height: height
    },
});

