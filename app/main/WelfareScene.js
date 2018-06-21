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

export default class WelfareScene extends BaseComponent {

    constructor(props) {
        super(props);
    }


    render() {
        return (<View style={{flex: 1, backgroundColor: '#fff'}}>
            <Image source={require('../../images/hyflzwt.jpg')} style={{
                width: width, height: Pixel.getPixel(150),
                flexDirection: 'row', marginTop: Pixel.getTitlePixel(64)
            }}>
            </Image>
            <MineAuthItem data={{name: '福利列表', content: '', left: require('../../images/shu.png')}}
                          callBack={() => {
                          }}/>
            <View style={{width: width, height: 1, backgroundColor: fontAndColor.COLORA3}}></View>
            <View style={{
                width: width, height: Pixel.getPixel(180), marginTop: Pixel.getPixel(20),
                justifyContent: 'center', alignItems: 'center'
            }}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{
                        width: Pixel.getPixel(150), height: Pixel.getPixel(40),
                        backgroundColor: fontAndColor.COLORB0, borderRadius: 5, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                            color: '#fff'
                        }}>打卡</Text>
                    </View>
                    <View style={{
                        width: Pixel.getPixel(150), height: Pixel.getPixel(40),
                        backgroundColor: fontAndColor.COLORB0, borderRadius: 5, justifyContent: 'center',
                        alignItems: 'center', marginLeft: Pixel.getPixel(20)
                    }}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                            color: '#fff'
                        }}>任务</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(20)}}>
                    <View style={{
                        width: Pixel.getPixel(150), height: Pixel.getPixel(40),
                        backgroundColor: fontAndColor.COLORB0, borderRadius: 5, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                            color: '#fff'
                        }}>活动</Text>
                    </View>
                    <View style={{
                        width: Pixel.getPixel(150), height: Pixel.getPixel(40),
                        backgroundColor: fontAndColor.COLORB0, borderRadius: 5, justifyContent: 'center',
                        alignItems: 'center', marginLeft: Pixel.getPixel(20)
                    }}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                            color: '#fff'
                        }}>免费硬件</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: Pixel.getPixel(20)}}>
                    <View style={{
                        width: Pixel.getPixel(150), height: Pixel.getPixel(40),
                        backgroundColor: fontAndColor.COLORB0, borderRadius: 5, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                            color: '#fff'
                        }}>离职礼包</Text>
                    </View>
                    <View style={{
                        width: Pixel.getPixel(150), height: Pixel.getPixel(40),
                        backgroundColor: fontAndColor.COLORB0, borderRadius: 5, justifyContent: 'center',
                        alignItems: 'center', marginLeft: Pixel.getPixel(20)
                    }}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.BUTTONFONT30),
                            color: '#fff'
                        }}>公益众筹</Text>
                    </View>
                </View>
            </View>
            <MineAuthItem data={{name: '福利说明', content: '', left: require('../../images/labas.png')}}
                          callBack={() => {
                          }}/>
            <View style={{width: width, height: 1, backgroundColor: fontAndColor.COLORA3}}></View>
            <Text style={{
                fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                marginHorizontal: Pixel.getPixel(20), marginTop: Pixel.getPixel(10)
            }}>
                注册用户享有本平台提供的各种优惠活动（红包、礼品、各类优惠券、影视平台会员等。）
            </Text>
            <NavigationView
                title="会员福利"
                backIconClick={this.backPage}
            />
        </View>)
    }


    _renderRow = (movie, sectionId, rowId) => {
        if (rowId == 0) {
            return (<View>
                <TrainItem data={{
                    number: '序号', com: '培训公司', gangwei: '培训岗位',
                    money: '预估薪水', shoufei: '是否收费', caozuo: '操作'
                }} show={true}></TrainItem>
                <TrainItem data={movie} show={false}></TrainItem>
            </View>);
        } else {
            return (<TrainItem data={movie} show={false}></TrainItem>)
        }


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

