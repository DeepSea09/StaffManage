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

} from 'react-native';

import BaseComponent from '../component/BaseComponent';

let {height, width} = Dimensions.get('window');
import StorageUtil from '../utils/StorageUtil';
import * as KeyNames from '../constant/storageKeyNames';
import {request} from '../utils/RequestUtil';
import * as Urls from '../constant/appUrls';
import Pixel from '../utils/PixelUtil'

const versionCode = 1.0;
let Platform = require('Platform');
import ErrorUtils from "ErrorUtils"
// import MainScene from "../login/LoginScene";
import NavigationScene from "./NavigationScene";

const IS_ANDROID = Platform.OS === 'android';

export default class RootScene extends BaseComponent {

    constructor(props) {
        super(props);
        console.log('123123121231312123');
    }

    componentDidMount() {

        // ErrorUtils.setGlobalHandler((e) => {　//发生异常的处理方法,当然如果是打包好的话可能你找都找不到是哪段代码出问题了
        //     this.props.screenProps.showToast('' + e);
        // });
        try {
        } catch (e) {

        } finally {
            //InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
            //});
        }


    }

    /**
     *   初始化
     **/
    initFinish = () => {
        this.toJump();
    }

    /**
     *
     * 跳转
     **/
    toJump = () => {
        this.navigatorParams.component = NavigationScene;
        this.navigatorParams.name = 'NavigationScene';
        this.placePage(this.navigatorParams);
    }

    // toNextPage = (mProps) => {
    //     const navigator = this.props.navigator;
    //     if (navigator) {
    //         navigator.replace({
    //             ...mProps
    //         })
    //     }
    // }

    navigatorParams = {
        name: 'NavigationScene',
        component: NavigationScene,
        params: {}
    }

    render() {
        return (<View>


        </View>)
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

