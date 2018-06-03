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
    RefreshControl
} from 'react-native';

import BaseComponent from '../component/BaseComponent';

let {height, width} = Dimensions.get('window');

import Pixel from '../utils/PixelUtil'

import * as fontAndColor from '../constant/fontAndColor';
import PostListItem from './component/PostListItem';
import PostInfoScene from "./PostInfoScene";
import * as Urls from "../constant/appUrls";
import {request} from "../utils/RequestUtil";
import  LoadMoreFooter from '../component/LoadMoreFooter';

export default class MainScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.allList = [];
        this.pageIndex = 1;
        this.pageSize = 10;
        this.allPage=0;
        this.state = {
            source: [],
            renderPlaceholderOnly: 'loading',
            showType: 'all',
            isRefreshing: false
        };
    }

    initFinish = () => {
        let names = '';
        if(this.props.name=='好工作'&&this.state.showType=='all'){
            names = '';
        }else{
            names = this.props.name;
        }
        let maps = {
            name: names,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
        };
        request(Urls.JOBS, 'Post', maps)
            .then((response) => {
                    console.log(response);
                    this.allList.push(...response.mjson.data.content);
                    this.allPage=response.mjson.data.totalPages;
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({source: ds.cloneWithRows(this.allList),
                        renderPlaceholderOnly:'success',isRefreshing:false});
                },
                (error) => {
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }

    changeShow = () => {
        if (this.state.showType == 'all') {
            this.setState({showType: 'one',renderPlaceholderOnly:'loading'},()=>{
                this.pageSize=10;
                this.pageIndex=1;
                this.allList=[];
                this.initFinish()
            });
        }
    }

    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return this._renderPlaceholderView();
        }
        return (<View style={{flex: 1, backgroundColor: fontAndColor.COLORA3}}>
            <ListView
                removeClippedSubviews={false}
                dataSource={this.state.source}
                renderRow={this._renderRow}
                showsVerticalScrollIndicator={false}
                renderSeparator={this._renderSeparator}
                renderFooter={
                    this.renderListFooter
                }
                onEndReached={this.toEnd}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.refreshingData}
                        tintColor={[fontAndColor.COLORB0]}
                        colors={[fontAndColor.COLORB0]}
                    />
                }
            />
        </View>)
    }

    renderListFooter = () => {
        if (this.state.isRefreshing) {
            return null;
        } else {
            return (<LoadMoreFooter isLoadAll={this.pageIndex >= this.allPage ? true : false}/>)
        }
    }

    toEnd = () => {
        if (this.state.isRefreshing) {

        } else {
            if (this.pageIndex < this.allPage) {
                this.page++;
                this.initFinish();
            }
        }

    };

    refreshingData = () => {
        this.setState({isRefreshing: true},()=>{
            this.allList=[];
            this.pageIndex=1;
            this.pageSize=10;
            this.initFinish();
        });

    };

    _renderPlaceholderView() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
                {this.loadView()}
            </View>
        );
    }

    _renderSeparator = (sectionId, rowId) => {
        return (<View key={sectionId + rowId} style={{width: width, height: 1, backgroundColor: '#00000000'}}></View>)
    }
    _renderRow = (movie, sectionId, rowId) => {
        let name = this.props.name;
        if (this.props.tabLabel == 'ios-paper' && this.state.showType == 'all') {
            name = '全部'
        }
        return (<PostListItem data={movie} callBack={() => {
            this.props.toNextPage({
                name: 'PostInfoScene',
                component: PostInfoScene,
                params: {id:movie.id,name:movie.jobTypeStr}
            })
        }
        } name={name}/>)
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

