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
    ListView,
    InteractionManager,
    WebView,
    BackAndroid
} from 'react-native';
//图片加文字
const {width, height} = Dimensions.get('window');
import Pixel from '../utils/PixelUtil';
import NavigationView from '../component/AllNavigationView';
import * as fontAndColor from '../constant/fontAndColor';
import BaseComponent from '../component/BaseComponent';
let oldUrl = '';
import WebViewTitle from './component/WebViewTitle';
export  default class WebScene extends BaseComponent {

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            renderPlaceholderOnly: true,
        };
    }

    componentDidMount() {
        oldUrl = this.props.navigation.state.params.webUrl;
        try {
            BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
        } catch (e) {

        } finally {
            //InteractionManager.runAfterInteractions(() => {
                this.setState({renderPlaceholderOnly: false});
            //});
        }
    }

    handleBack = () => {
        if (oldUrl == this.props.navigation.state.params.webUrl) {
            this.backPage();
        } else {
            this.refs.www.goBack();
        }
        return true;
    }


    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }
        return (
            <View style={{backgroundColor: fontAndColor.COLORA3, flex: 1}}>
                <WebViewTitle ref="webviewtitle"/>
                <WebView
                    ref="www"
                    style={{width:width,height:height,backgroundColor:
                    fontAndColor.COLORA3}}
                    source={{uri:this.props.navigation.state.params.webUrl,method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                    onLoadStart={()=>{
                        this.refs.webviewtitle.firstProgress();
                    }}
                    onLoadEnd={()=>{
                         this.refs.webviewtitle.lastProgress();
                    }}
                    onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                />
                <NavigationView
                    title= {'活动'}
                    backIconClick={()=>{
                        this.backPage();
                    }}
                />
            </View>
        );
    }

    onNavigationStateChange = (navState) => {
        oldUrl = navState.url;
    }


    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height,backgroundColor: fontAndColor.COLORA3}}>
                <NavigationView
                    title="活动"
                    backIconClick={()=>{
                        this.backPage();
                    }}
                />
            </View>
        );
    }


}
const styles = StyleSheet.create({

    image: {
        width: 43,
        height: 43,
    },
    Separator: {
        backgroundColor: fontAndColor.COLORA3,
        height: Pixel.getPixel(10),

    },
    margin: {
        marginRight: Pixel.getPixel(15),
        marginLeft: Pixel.getPixel(15)

    },
    topViewStyle: {flex: 1, height: Pixel.getPixel(44), justifyContent: 'center'}
})