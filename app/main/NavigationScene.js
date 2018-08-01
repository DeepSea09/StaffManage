/**
 * Created by yujinzhong on 2017/2/7.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    Platform,
    Image,
    StyleSheet,
    Dimensions,
    PixelRatio,
    TouchableOpacity,
    NativeModules,
    InteractionManager,
    DeviceEventEmitter,
    TouchableWithoutFeedback,
    Linking
} from 'react-native';

const {width, height} = Dimensions.get('window');
import Pixel from '../utils/PixelUtil'

import TabNavigator from 'react-native-tab-navigator';
import * as fontAndClolr from '../constant/fontAndColor';
import BaseComponent from '../component/BaseComponent';
import PostListScene from './PostScene';
import MineInviScene from './MineInviScene';
import MainScene from './MainScene';
import LoginScene from '../login/LoginScene';
import {request} from "../utils/RequestUtil";
import * as Urls from "../constant/appUrls";
import PostPow from "./component/PostPow";
import UPDataPow from "./component/UPDataPow";
let tabArray = [];

export class tableItemInfo {
    constructor(ref, key, title, selectedImg, defaultImg, topView) {

        this.ref = ref;
        this.key = key;
        this.title = title;
        this.selectedImg = selectedImg;
        this.defaultImg = defaultImg;
        this.topView = topView;

    }

}
;
const version = '1.0.0';

export default class NavigationScene extends BaseComponent {

    /**
     * 根据传过来的属性,判断身份
     */
    static defaultProps = {
        identity: 'boss'
    };


    componentWillUnmount() {
        tabArray = [];
    }

    /**
     * 初始化,指定tab及页面被选中
     */
    constructor(props) {
        super(props);
        this.updataurl='';
        this.state = {
            selectedTab: 'findwork',
            renderPlaceholderOnly: 'blank',
            openSelectBranch: false,
            mb_one: false,
            mb_tow: false,
            mb_three: false,

        }
        tabArray = [];
    }


    initFinish = () => {
        this.getUserPermission();
    }

    allRefresh = () => {
        this.setState({renderPlaceholderOnly: 'loading'});
        this.initFinish();
    }

    getUserPermission = (id) => {
        tabArray = [];
        tabArray.push(new tableItemInfo('findwork', 'first', '找工作',
            require('../../images/rightimage.png'),
            require('../../images/unselectleft.png'), this.getTopView('findwork')));
        tabArray.push(new tableItemInfo('allmoney', 'scend', ' ',
            require('../../images/newcenter.png'),
            require('../../images/newcenter.png'), this.getTopView('allmoney')));
        tabArray.push(new tableItemInfo('mine', 'three', '我',
             require('../../images/bottomleftimage.png'),
            require('../../images/unselectright.png'), this.getTopView('mine')));
        this.setState({renderPlaceholderOnly: 'success'});
        this.getUPData();
    }
    getUPData=()=>{
        let maps = {};
        request(Urls.UPGRADE, 'Post', maps)
            .then((response) => {
                    console.log(response);
                    if(response.mjson.data[0].curVersion!==version){
                        this.updataurl=response.mjson.data[0].flexJson;
                        this.refs.postpow.changeShow(response.mjson.data[0].upgradeDesc);
                    }
                },
                (error) => {

                });
    }
    _renderPlaceholderView() {
        return (
            <View style={{width: width, height: height, backgroundColor: fontAndClolr.COLORA3}}>
                {this.loadView()}
            </View>
        );
    }

    render() {
        let items = [];

        tabArray.map((data) => {
            let tabItem;
            tabItem = <TabNavigator.Item
                selected={this.state.selectedTab === data.ref}
                key={data.key}
                title={data.title}
                renderSelectedIcon={() => <Image style={styles.img}
                                                 source={data.selectedImg}/>}
                renderIcon={() => <Image style={styles.img}
                                         source={data.defaultImg}/>}
                onPress={() => {
                    if (data.ref == 'mine' && this.isNull(global.token)) {
                        this.toNextPage({
                            name: 'LoginScene',
                            component: LoginScene,
                            params: {}
                        });
                    }else if(data.ref == 'allmoney' && this.isNull(global.token)){
                        this.toNextPage({
                            name: 'LoginScene',
                            component: LoginScene,
                            params: {}
                        });
                    } else {
                        this.setState({selectedTab: data.ref})
                    }
                }
                }
                selectedTitleStyle={styles.selectedTitleStyle}


            >
                {data.topView}
            </TabNavigator.Item>

            items.push(tabItem);
        })
        return (
            <View style={styles.flex}>
                <TabNavigator
                    sceneStyle={{backgroundColor: '#00000000'}}
                    tabBarShadowStyle={{backgroundColor: fontAndClolr.COLORA1}}
                    tabBarStyle={{
                        overflow: 'visible', height: Pixel.getPixel(50),
                        backgroundColor: '#fff'
                    }}
                >
                    {items}
                </TabNavigator>
                <TouchableOpacity onPress={() => {
                    if(this.isNull(global.token)){
                        this.toNextPage({
                            name: 'LoginScene',
                            component: LoginScene,
                            params: {}
                        });
                    }else{
                        this.setState({selectedTab: 'allmoney'})
                    }

                }} activeOpacity={1} style={{
                    position: 'absolute',
                    bottom: Pixel.getPixel(7),
                    left: width / 2 - Pixel.getPixel(57) / 2
                }}>
                    <Image source={require('../../images/yuanbaoimage.png')}
                           style={{
                               resizeMode: 'stretch',
                               width: Pixel.getPixel(57),
                               height: Pixel.getPixel(37)
                           }}/>
                </TouchableOpacity>

                <UPDataPow ref='postpow' callBack={()=>{
                    console.log('33333333333333333');
                    if (Platform.OS === 'android') {
                        console.log('123123123');
                        Linking.openURL(this.updataurl);
                    } else {
                        NativeModules.SystomTools.openAppaleShop();
                    }
                }}/>
            </View>
        );
    }

    getTopView = (ref) => {
        if (ref == 'findwork') {
            return <PostListScene toNextPage={(content) => {
                this.toNextPage(content);
            }}/>
        } else if (ref == 'allmoney') {
            return <MineInviScene toNextPage={(content) => {
                this.toNextPage(content);
            }}/>
        } else {
            return <MainScene toNextPage={(content) => {
                this.toNextPage(content);
            }}/>
        }
    }
}

const styles = StyleSheet.create({

    flex: {
        flex: 1,
        backgroundColor: '#fff',
        width: width, height: height,
        paddingBottom: 0,
    },
    img: {

        width: Pixel.getPixel(26),
        height: Pixel.getPixel(26),

    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bigimg: {
        width: Pixel.getPixel(56),
        height: Pixel.getPixel(56),
    },
    selectedTitleStyle: {
        color: fontAndClolr.COLORB0
    },
    imageStyle: {
        position: 'absolute',
        bottom: Pixel.getPixel(10),
        left: width / 2.0 - 0.5,
        width: 1,
        height: Pixel.getPixel(30),
        backgroundColor: "lightgray",
    },
    outImageStyle: {
        position: 'absolute',

        bottom: Pixel.getPixel(16),
        left: width / 2 - Pixel.getPixel(56) / 2
    }
});
