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

import Pixel from '../utils/PixelUtil'

import * as fontAndColor from '../constant/fontAndColor';
import MineAuthItem from "./component/MineAuthItem";
import NavigationView from '../component/AllNavigationView';
import TrainItem from "./component/TrainItem";
import * as Urls from "../constant/appUrls";
import {request} from "../utils/RequestUtil";
export default class MineServiceScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.allData = {};
        this.state = {
            renderPlaceholderOnly: 'loading'
        };
    }

    initFinish = () => {
        let maps = {
        };
        request(Urls.MYKF, 'Post', maps)
            .then((response) => {
                    console.log(response);
                    this.allData = response.mjson.data;
                    this.setState({renderPlaceholderOnly: 'success'});
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }
    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return this._renderPlaceholderView();
        }
        return (<View style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{width: width, backgroundColor: fontAndColor.COLORB0,height:Pixel.getPixel(150),
                flexDirection:'row',marginTop:Pixel.getTitlePixel(64)}}>
                <View style={{flex:1,marginTop:Pixel.getPixel(30),alignItems:'flex-end'}}>
                    <View style={{width:Pixel.getPixel(90),height:Pixel.getPixel(90),
                        backgroundColor:'#fff',borderRadius:100,alignItems:'center',justifyContent:'center'
                    }}><Text>头像</Text></View>
                </View>
                <View style={{flex:1}}>
                    <View style={{flex:1,marginTop:Pixel.getPixel(30),alignItems:'flex-end'}}>
                        <View style={{height:Pixel.getPixel(90),
                            alignItems:'flex-start'
                        }}>
                            <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                backgroundColor:'#00000000',color:'#fff',marginTop:Pixel.getPixel(7),
                                fontWeight:'bold'}}>
                                {this.allData.name}
                            </Text>
                            <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                backgroundColor:'#00000000',color:'#fff',marginTop:Pixel.getPixel(7)}}>
                                {this.allData.phone}
                            </Text>
                            <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                backgroundColor:'#00000000',color:'#fff',marginTop:Pixel.getPixel(7)}}>
                                服务人数：320人
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1}}>
                    <View style={{flex:1,marginTop:Pixel.getPixel(3),alignItems:'flex-end'}}>
                        <View style={{height:Pixel.getPixel(90),
                            alignItems:'flex-start',marginRight:Pixel.getPixel(15)
                        }}>
                            <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),
                                backgroundColor:'#00000000',color:'#ff0',marginTop:Pixel.getPixel(7)}}>
                                投诉
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <MineAuthItem data={{name:'客服微信',content:'',left:require('../../images/leftimage.png')}}
                          callBack={()=>{}}/>
            <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
            <View style={{width:width,height:Pixel.getPixel(200),marginTop:Pixel.getPixel(20),
                justifyContent:'center',alignItems:'center'}}>
                    <Image style={{width:Pixel.getPixel(170),
                    height:Pixel.getPixel(170)}} source={require('../../images/erweimaimage.png')}/>
            </View>
            <MineAuthItem data={{name:'客服QQ',content:'',left:require('../../images/leftimage.png')}}
                          callBack={()=>{}}/>
            <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
            <MineAuthItem data={{name:'说明',content:'',left:require('../../images/leftimage.png')}}
                          callBack={()=>{}}/>
            <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
            <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),
                marginHorizontal:Pixel.getPixel(20),marginTop:Pixel.getPixel(10)}}>
                说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明
                说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明
                说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明
                说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明
            </Text>
            <NavigationView
                title="我的客服"
                backIconClick={this.backPage}
            />
        </View>)
    }

    _renderPlaceholderView() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
                {this.loadView()}
                <NavigationView
                    title="我的客服"
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

