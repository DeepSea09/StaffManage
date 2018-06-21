/**
 * Created by lhc on 2017/2/15.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    NativeModules,
    BackAndroid
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import ScrollableTabView from 'react-native-scrollable-tab-view';
import BaseComponent from '../component/BaseComponent';
import Pixel from '../utils/PixelUtil';

import StorageUtil from '../utils/StorageUtil';
import * as KeyNames from '../constant/storageKeyNames';
import NavigationScene from "./NavigationScene";

export default class WelcomScene extends BaseComponent {

    handleBack = () => {
        NativeModules.VinScan.goBack();
        return true;
    }

    componentDidMount() {
        try {
            BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        } catch (e) {

        } finally {
            //InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: 'loading'});
            this.initFinish();
            //});
        }
    }

    constructor(props, context) {
        super(props, context);
    }


    initFinish = () => {

    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <ScrollableTabView
                    style={{flex: 1}}
                    initialPage={0}
                    prerenderingSiblingsNumber={Infinity}
                    renderTabBar={() => <View/>}
                >

                    <Image style={{resizeMode: 'stretch', width: width, flex: 1}}
                           source={require('../../images/welcomone.jpg')}
                           tabLabel="ios-paper1"/>

                    <View style={{flex:1}}  activeOpacity={1} style={{flex: 1}}>
                        <Image style={{resizeMode: 'stretch', width: width, flex: 1}}
                               source={require('../../images/tsjns.jpg')}
                               tabLabel="ios-paper4"/>
                        <TouchableOpacity onPress={() => {
                            StorageUtil.mSetItem(KeyNames.FIRST_INTO, 'true');
                            this.placePage("NavigationScene");
                        }} activeOpacity={0.8} style={{width:Pixel.getPixel(131),
                            height:Pixel.getPixel(40),position:'absolute',
                            bottom: Pixel.getPixel(90),
                            left:width/2-Pixel.getPixel(60),borderWidth:1,borderRadius:20,borderColor:'#fff',
                        alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:Pixel.getPixel(17),color:'#fff'}}>开始体验</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollableTabView>
            </View>
        );

    }


}


const styles = StyleSheet.create({

    image: {

        width: 43,
        height: 43,
    },
    tabView: {
        flex: 1,
        padding: 10,
        backgroundColor: 'red',
    },

})