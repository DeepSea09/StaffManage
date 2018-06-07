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
    RefreshControl,
    TextInput
} from 'react-native';

import BaseComponent from '../component/BaseComponent';

let {height, width} = Dimensions.get('window');

import Pixel from '../utils/PixelUtil'

import * as fontAndColor from '../constant/fontAndColor';
import PostListItem from './component/PostListItem';
import PostInfoScene from "./PostInfoScene";
import * as Urls from "../constant/appUrls";
import NavigationView from '../component/AllNavigationView';
import {request} from "../utils/RequestUtil";
import LoadMoreFooter from '../component/LoadMoreFooter';
import StorageUtil from "../utils/StorageUtil";
import * as StorageKeyNames from "../constant/storageKeyNames";

export default class FindPostListScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.allList = [];
        this.findTag = [];
        this.pageIndex = 1;
        this.pageSize = 10;
        this._mixField = '';
        this.allPage = 0;
        this.state = {
            source: [],
            renderPlaceholderOnly: 'success',
            showType: 'all',
            isRefreshing: false
        };
    }

    initFinish = () => {
        StorageUtil.mGetItem(StorageKeyNames.FIND, (data) => {
            if (data.code == 1) {
                let jsons = data.result;
                if (!this.isNull(jsons)) {
                    this.findTag = JSON.parse(jsons);
                }
            }
            this.setState({renderPlaceholderOnly: 'success'});
        })

    }

    getData = () => {

        this.props.screenProps.showModal(true);
        let maps = {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            _mixField: this._mixField
        };
        request(Urls.JOBS, 'Post', maps)
            .then((response) => {
                    this.props.screenProps.showModal(false);
                    console.log(response);
                    this.allList.push(...response.mjson.data.content);
                    this.allPage = response.mjson.data.totalPages;
                    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        source: ds.cloneWithRows(this.allList),
                        renderPlaceholderOnly: 'success', isRefreshing: false
                    });
                },
                (error) => {
                    this.props.screenProps.showModal(false);
                    this.setState({renderPlaceholderOnly: 'error'});
                });
    }

    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return this._renderPlaceholderView();
        }

        let topitemList = [];
        let bottomList = [];
        let parentList = [];
        let rList = this.findTag;
        for (let i = 0; i < rList.length; i++) {
            if (i > 3) {
                bottomList.push(
                    <TouchableOpacity onPress={()=>{
                        this.pageIndex = 1;
                        this.pageSize = 10;
                        this.allList = [];
                        this._mixField=rList[i];
                        this.getData();
                    }} key={i + 'ttt'} style={{
                        marginLeft: Pixel.getPixel(15),
                    }}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT26),
                            color: '#000',
                            textDecorationLine: 'underline'
                        }}>{rList[i]}</Text>
                    </TouchableOpacity>
                );
            } else {
                topitemList.push(
                    <TouchableOpacity onPress={()=>{
                        this.pageIndex = 1;
                        this.pageSize = 10;
                        this.allList = [];
                        this._mixField=rList[i];
                        this.getData();
                    }} key={i + 'ttt'} style={{
                        marginLeft: Pixel.getPixel(15),
                    }}>
                        <Text style={{
                            fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT26),
                            color: '#000',
                            textDecorationLine: 'underline'
                        }}>{rList[i]}</Text>
                    </TouchableOpacity>
                );
            }

        }
        parentList.push(<View style={{
            width: width - Pixel.getPixel(30),
            marginTop: Pixel.getPixel(15), flexDirection: 'row'
        }} key={'top'}>
            {topitemList.reverse()}
        </View>);
        if (this.findTag.length > 4) {
            parentList.push(<View style={{
                width: width - Pixel.getPixel(30),
                marginTop: Pixel.getPixel(10), flexDirection: 'row',
            }} key={'bottom'}>
                {bottomList.reverse()}
            </View>);
        }
        return (<View style={{flex: 1, backgroundColor: '#fff'}}>
            <View onPress={() => {
                this.props.findBack();
            }} style={{
                marginTop: Pixel.getTitlePixel(69),
                width: width - Pixel.getPixel(35),
                height: Pixel.getPixel(35),
                backgroundColor: '#fff',
                flexDirection: 'row',
                marginLeft: Pixel.getPixel(15)
            }}>
                <View style={{
                    flex: 8, justifyContent: 'center', paddingLeft: Pixel.getPixel(5), borderWidth: 1,
                    borderColor: fontAndColor.COLORA4, borderRadius: 3
                }}>
                    <TextInput
                        onChangeText={(text) => {
                            this._mixField = text;
                        }}
                        style={{
                            //backgroundColor: 'transparent',
                            textAlign: 'center',
                            fontSize: Pixel.getFontPixel(fontAndColor.LITTLEFONT28),
                            color: '#000',
                            padding: 0,
                            flex: 1,
                            textAlign: 'left'
                        }}
                        placeholder='查找你感兴趣的岗位'
                        underlineColorAndroid="transparent"
                    />
                </View>
                <TouchableOpacity onPress={() => {
                    let cando = true;
                    for (let i = 0; i < this.findTag.length; i++) {
                        if (this.findTag[i] == this._mixField) {
                            cando = false;
                        }
                    }
                    if (cando) {
                        if (this.findTag.length >= 8) {
                            this.findTag.splice(0,1);
                            this.findTag.push(this._mixField);
                        } else {
                            this.findTag.push(this._mixField);
                        }
                        StorageUtil.mSetItem(StorageKeyNames.FIND, JSON.stringify(this.findTag));
                    }
                    this.pageIndex = 1;
                    this.pageSize = 10;
                    this.allList = [];
                    this.getData();
                }} style={{flex: 1, justifyContent: 'center', paddingRight: Pixel.getPixel(5)}}>
                    <Image style={{
                        width: Pixel.getPixel(25), height: Pixel.getPixel(25),
                        marginLeft: Pixel.getPixel(5)
                    }}
                           source={require('../../images/findIcon.png')}/>
                </TouchableOpacity>
            </View>
            <Text style={{
                fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                color: '#000', fontWeight: 'bold', marginTop: Pixel.getPixel(15),
                marginLeft: Pixel.getPixel(15)
            }}>最新查找</Text>
            {parentList.reverse()}
            {this.allList.length <= 0 ? <View></View> :
                <ListView
                    removeClippedSubviews={false}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    showsVerticalScrollIndicator={false}
                    style={{marginTop: Pixel.getPixel(10)}}
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
            }

            <NavigationView
                title={"岗位列表"}
                backIconClick={this.backPage}
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
                this.getData();
            }
        }

    };

    refreshingData = () => {
        this.setState({isRefreshing: true}, () => {
            this.allList = [];
            this.pageIndex = 1;
            this.pageSize = 10;
            this.getData();
        });

    };

    _renderPlaceholderView() {
        return (
            <View style={{flex: 1, backgroundColor: '#fff', alignItems: 'center'}}>
                {this.loadView()}
                <NavigationView
                    title={"岗位列表"}
                    backIconClick={this.backPage}
                />
            </View>
        );
    }

    _renderSeparator = (sectionId, rowId) => {
        return (<View key={sectionId + rowId} style={{width: width, height: 1, backgroundColor: '#00000000'}}></View>)
    }
    _renderRow = (movie, sectionId, rowId) => {
        if (movie == 1123) {
            return <View></View>
        } else {
            let name = this.props.name;
            return (<PostListItem data={movie} callBack={() => {
                this.toNextPage({
                    name: 'PostInfoScene',
                    component: PostInfoScene,
                    params: {id: movie.id, name: movie.jobTypeStr}
                })
            }
            } name={name}/>)
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

