import React, {Component} from "react";
import {
    AppRegistry,
    View,
    TouchableOpacity,
    Navigator,
    TouchableHighlight,
    BackAndroid,
    InteractionManager,
    TouchableWithoutFeedback,
    Dimensions,
    Image,
    Text,
    BackHandler
} from "react-native";
import Pixel from "../utils/PixelUtil";
import * as fontAndColor from "../constant/fontAndColor";
import MyButton from "./MyButton";

const {width, height} = Dimensions.get('window');
import {NavigationActions, StackActions} from 'react-navigation'

let dismissKeyboard = require('dismissKeyboard')
import {all,setAll} from '../constant/AllBackLogin';
export default class BaseComponent extends Component {
    /**
     * from @zhaojian
     *
     * 监听回退键
     **/
    handleBack = () => {
        this.backPage()
        return true;
    }

    componentDidMount() {
        setAll(this.props.navigation);
        // InteractionManager.setDeadline(500);
        try {
            BackHandler.addEventListener('hardwareBackPress', this.handleBack);
        } catch (e) {

        } finally {
            InteractionManager.runAfterInteractions(() => {
                this.initFinish();
            });
        }


    }


    placePage = (name) => {
        console.log(NavigationActions);
        // const { dispatch } = this.props.navigation;
        // const resetAction = NavigationActions.reset({
        //     index: 0,
        //     actions: [
        //         NavigationActions.navigate({ routeName: name})
        //     ]
        // });
        // dispatch(resetAction)

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: name})]
        });
        this.props.navigation.dispatch(resetAction);

    }
    ;


    initFinish() {

    }

    dismissKeyboard = () => {
        dismissKeyboard();
    }

    toNextPage = (mProps) => {
        // const navigator = this.props.navigator;
        // if (navigator) {
        //     navigator.push({
        //         ...mProps
        //     })
        // }
        const {navigate} = this.props.navigation;
        navigate(mProps.name, {...mProps.params})
    }

    /**
     * 非空判断
     * @param content  任意类型值
     */
    isNull = (content) => {
        try {
            if (content == undefined) {
                return true;
            }
            if (content == null) {
                return true;
            }
            if (content instanceof Array) {
                if (content.length <= 0) {
                    return true;
                }
            }
            if (content instanceof Object) {
                if (JSON.stringify(content) == '{}') {
                    return true;
                }
            }
            if (content == 'null') {
                return true;
            }
            if ((content + '').trim() == '') {
                return true;
            }
            return false;
        } catch (e) {
            return true;
        }
    }

    backToLogin = (mProps) => {

    }

    backPage = () => {
        if(this.props.screenProps){
            let routes = this.props.screenProps.getRoute();
            if (routes[routes.length - 1].routeName === 'FunctionScene') {
                BackHandler.exitApp();
            } else {
                const {dispatch} = this.props.navigation;
                const backAction = NavigationActions.back({
                    key: null
                });
                dispatch(backAction);
            }
        }

    }

    backToTop = () => {
        const navigator = this.props.navigator;
        if (navigator) {
            navigator.popToTop();
        }
    }


    componentWillUnmount() {
    }

    allRefreshParams = {
        buttonType: MyButton.TEXTBUTTON,
        parentStyle: {
            height: Pixel.getPixel(40),
            width: Pixel.getPixel(140),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: fontAndColor.COLORB0,
            marginTop: Pixel.getPixel(66)
        },
        childStyle: {
            fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
            color: '#ffffff',
        },
        opacity: 0.8,
        content: '刷新',
        mOnPress: () => {
            this.allRefresh();
        }
    }
    allRefresh = () => {

    }

    loadView = () => {
        let view;
        let margintop = 0;
        if (this.state.loadingMarginTop) {
            margintop = this.state.loadingMarginTop;
        }
        if (this.state.renderPlaceholderOnly == 'blank') {
            view = <View/>
        } else if (this.state.renderPlaceholderOnly == 'loading') {
            view = <View style={{flex: 1, alignItems: 'center',}}>
                <Image
                    style={{
                        width: Pixel.getPixel(60),
                        height: Pixel.getPixel(60),
                        marginTop: Pixel.getTitlePixel(189) - margintop
                    }}
                    source={require('../../images/setDataLoading.gif')}/>
                <Text allowFontScaling={false}
                      style={{
                          color: fontAndColor.COLORA0,
                          fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                          marginTop: Pixel.getPixel(5)
                      }}>
                    加载中......
                </Text>
            </View>
        } else if (this.state.renderPlaceholderOnly == 'error') {
            view = <View style={{flex: 1, alignItems: 'center'}}>

                <Text allowFontScaling={false}
                      style={{
                          color: fontAndColor.COLORA0, fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                          marginTop: Pixel.getPixel(85 + 64)
                      }}>
                    网络错误
                </Text>
                <Text allowFontScaling={false}
                      style={{
                          color: fontAndColor.COLORA1, fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                          marginTop: Pixel.getPixel(10)
                      }}>
                    当前网络环境较差，请刷新重试
                </Text>
                <MyButton {...this.allRefreshParams} />
            </View>
        } else {
            view = <View style={{flex: 1, alignItems: 'center'}}>
                <Image
                    style={{
                        width: Pixel.getPixel(121),
                        height: Pixel.getPixel(163),
                        marginTop: Pixel.getTitlePixel(85 + 64) - margintop
                    }}
                    source={require('../../images/noData.png')}/>
                <Text allowFontScaling={false}
                      style={{
                          color: fontAndColor.COLORA0, fontSize: Pixel.getFontPixel(fontAndColor.BUTTONFONT30),
                          marginTop: Pixel.getPixel(27)
                      }}>
                    暂无数据
                </Text>
                <Text allowFontScaling={false}
                      style={{
                          color: fontAndColor.COLORA1, fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                          marginTop: Pixel.getPixel(10)
                      }}>
                </Text>
                {this.state.renderPlaceholderOnly == 'noData' ? <MyButton {...this.allRefreshParams}/> : null}
            </View>
        }
        return view;

    }

    loadingView = () => {
        let view;
        if (this.state.loading == true) {
            view = <TouchableWithoutFeedback onPress={() => {
            }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        width: width,
                        height: height,
                    }}>
                    <Image style={{width: 60, height: 60}}
                           source={require('../../images/setDataLoading.gif')}/>
                </View>
            </TouchableWithoutFeedback>
        } else {
            view = null;
        }
        return view;
    }

    isEmpty = (str) => {
        if (typeof(str) != 'undefined' && str !== null && str !== '') {
            return false;
        } else {
            return true;
        }
    };
}