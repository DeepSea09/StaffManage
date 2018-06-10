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
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ConstractTabBar from "./component/ConstractTabBar";
import NavigationView from '../component/AllNavigationView';
import PostListScene from './PostListScene';
import FindPostListScene from './FindPostListScene';
import MainScene from "./NavigationScene";

export default class PostScene extends BaseComponent {

    constructor(props) {
        super(props);
    }


    render() {
        return (<View style={{flex: 1, backgroundColor: fontAndColor.COLORA3}}>
            <ScrollableTabView
                style={{marginTop: Pixel.getTitlePixel(64)}}
                initialPage={0}
                locked={false}
                scrollWithoutAnimation={true}
                renderTabBar={() =>
                    <ConstractTabBar findBack={() => {
                        this.props.toNextPage({
                            name: 'FindPostListScene',
                            component: FindPostListScene,
                            params: {}
                        })
                    }} tabName={["高返费", "好工作", '小时工', '假期工']} callBack={(tabname) => {
                        console.log(tabname);
                        this.refs.postlistsceness.changeShow();
                    }}/>}
            >
                <PostListScene toNextPage={(content) => {
                    this.props.toNextPage(content)
                }} tabLabel="ios-people" ref='postlistsceness' name={'高返费'}/>

                <PostListScene toNextPage={(content) => {
                    this.props.toNextPage(content)
                }}  tabLabel="ios-paper" name={'好工作'}/>

                <PostListScene toNextPage={(content) => {
                    this.props.toNextPage(content)
                }} tabLabel="ios-chatboxes11" name={'小时工'}/>

                <PostListScene toNextPage={(content) => {
                    this.props.toNextPage(content)
                }} tabLabel="ios-chatboxes12" name={'假期工'}/>

            </ScrollableTabView>
            <NavigationView
                title="岗位列表"
            />
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

