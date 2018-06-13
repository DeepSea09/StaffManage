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
    ListView,
    TextInput
} from 'react-native';

import BaseComponent from '../component/BaseComponent';

let {height, width} = Dimensions.get('window');

import Pixel from '../utils/PixelUtil'
import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";

import * as fontAndColor from '../constant/fontAndColor';
import * as Urls from '../constant/appUrls';
import {request} from '../utils/RequestUtil';
import MainScene from "../main/NavigationScene";
import LoginPow from "../main/component/LoginPow";

export default class LoginScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.loginData = {
            phone: '',
            msg: '',
        }
        this.state = {
            phone: 0,
            number: 0
        }

    }

    componentWillMount() {
        this.props.screenProps.showModal(false)
    }

    render() {

        return (<View style={{flex: 1, backgroundColor: '#336699'}}>
            <View style={{
                width: width - Pixel.getPixel(80),
                height: Pixel.getPixel(370), top: Pixel.getPixel(140), backgroundColor:
                    '#fff', left: Pixel.getPixel(40), borderRadius: 5, alignItems: 'center',
                position: 'absolute'
            }}>
                <TextInput
                    onChangeText={(text) => {
                        this.loginData.phone = parseInt(text);
                    }}
                    style={{
                        //backgroundColor: 'transparent',
                        textAlign: 'center',
                        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
                        color: '#000',
                        padding: 0,
                        borderWidth: 1, borderRadius: 20,
                        height: Pixel.getPixel(43),
                        width: Pixel.getPixel(210),
                        borderColor: fontAndColor.COLORA4,
                        marginTop: Pixel.getPixel(80)
                    }}
                    placeholder='请输入手机号'
                    keyboardType={'numeric'}
                    underlineColorAndroid="transparent"
                />
                <TextInput
                    onChangeText={(text) => {
                        this.loginData.msg = text;
                    }}
                    style={{
                        //backgroundColor: 'transparent',
                        textAlign: 'center',
                        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
                        color: '#000',
                        padding: 0,
                        borderWidth: 1, borderRadius: 20,
                        height: Pixel.getPixel(43),
                        width: Pixel.getPixel(210),
                        borderColor: fontAndColor.COLORA4,
                        marginTop: Pixel.getPixel(30)
                    }}
                    placeholder='请输入验证码'
                    underlineColorAndroid="transparent"
                />
                <TouchableOpacity onPress={() => {
                    this.sendMsg();
                }}>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                        color: fontAndColor.COLORA2, marginTop: Pixel.getPixel(20), marginLeft:
                            Pixel.getPixel(100)
                    }}>
                        获取验证码
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    this.login();
                    // const navigator = this.props.navigator;
                    // if (navigator) {
                    //     navigator.replace({
                    //         ...{ name: 'MainScene',
                    //             component: MainScene,
                    //             params: {}}
                    //     })
                    // }
                }} style={{
                    width: Pixel.getPixel(210), height: Pixel.getPixel(43),
                    borderRadius: 20, marginTop: Pixel.getPixel(30),
                    alignItems: 'center', justifyContent: 'center',
                    borderColor: '#9AB3DB', borderWidth: 1
                }}>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.NAVIGATORFONT34),
                        color: '#9AB3DB'
                    }}>登录/注册</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                width: Pixel.getPixel(115), height: Pixel.getPixel(115),
                borderRadius: 100, borderWidth: 1, borderColor: '#fff', position: 'absolute',
                top: Pixel.getPixel(140 - 57), left: width / 2 - Pixel.getPixel(115) / 2,
                justifyContent: 'center', alignItems: 'center'
            }}>
                <View style={{
                    width: Pixel.getPixel(95), height: Pixel.getPixel(95),
                    borderRadius: 100, backgroundColor: '#ff0'
                }}></View>
            </View>
            <LoginPow ref="loginpow" callBack={(name) => {
                this.toReset(name);
            }}/>
        </View>)
    }

    toReset = (name) => {
        this.props.screenProps.showModal(true);
        let maps = {
            phone: this.loginData.phone,
            yzm:this.loginData.msg,
            name:name
        };
        request(Urls.REGISTER, 'Post', maps)
            .then((response) => {
                    this.refs.loginpow.changeShow(false);
                    this.props.screenProps.showModal(false);
                    global.token = response.mjson.data;
                    StorageUtil.mSetItem(StorageKeyNames.TOKEN, response.mjson.data);
                    if (this.props.from == 'request') {
                        const navigator = this.props.navigator;
                        if (navigator) {
                            navigator.replace({
                                ...this.navigatorParams
                            })
                        }
                    } else {
                        this.backPage();
                    }
                },
                (error) => {
                    this.refs.loginpow.changeShow(false);
                    if (error.mycode == -300 || error.mycode == -500) {
                        this.props.screenProps.showToast("网络连接失败");
                    } else {
                        this.props.screenProps.showToast(error.mjson.msg);
                    }

                });
    }

    sendMsg = () => {
        if (this.loginData.phone == '' || this.loginData.phone.toString().length < 11) {
            this.props.screenProps.showToast('请输入正确手机号码');
        } else {
            let maps = {
                phone: this.loginData.phone,
            };
            request(Urls.SENDSMS, 'Post', maps)
                .then((response) => {
                        this.props.screenProps.showToast("发送成功");
                    },
                    (error) => {
                        if (error.mycode == -300 || error.mycode == -500) {
                            this.props.screenProps.showToast("网络连接失败");
                        } else {
                            this.props.screenProps.showToast(error.mjson.msg);
                        }

                    });
        }
    }

    login = () => {
        if ((this.loginData.phone == '' || this.loginData.phone.toString().length < 11) ||
            (this.loginData.msg == '')) {
            this.props.screenProps.showToast('请输入正确手机号码和验证码');
        } else {
            this.props.screenProps.showModal(true);
            let maps = {
                username: this.loginData.phone,
                yzm: this.loginData.msg
            };
            request(Urls.LOGIN, 'Post', maps)
                .then((response) => {
                        this.props.screenProps.showModal(false);
                        global.token = response.mjson.data;
                        StorageUtil.mSetItem(StorageKeyNames.TOKEN, response.mjson.data);
                        if (this.props.from == 'request') {
                            const navigator = this.props.navigator;
                            if (navigator) {
                                navigator.replace({
                                    ...this.navigatorParams
                                })
                            }
                        } else {
                            this.backPage();
                        }
                    },
                    (error) => {
                        if (error.mycode == -300 || error.mycode == -500) {
                            this.props.screenProps.showToast("网络连接失败");
                        } else {
                            if (error.mjson.msg == "用户不存在") {
                                this.props.screenProps.showModal(false);
                                this.showPop();
                            } else {
                                this.props.screenProps.showToast(error.mjson.msg);
                            }
                        }
                    });
        }
    }

    showPop = () => {
        this.refs.loginpow.changeShow(true);
    }

    navigatorParams = {
        name: 'MainScene',
        component: MainScene,
        params: {}
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

