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
import NavigationView from '../component/AllNavigationView';
import {request} from "../utils/RequestUtil";
import  LoadMoreFooter from '../component/LoadMoreFooter';

export default class FindPostListScene extends BaseComponent {

    constructor(props) {
        super(props);
        this.allList = [];
        this.findTag=['昆山富士康','昆山富士康','昆山富士康','昆山富士康'];
        this.pageIndex = 1;
        this.pageSize = 10;
        this.allPage=0;
        this.state = {
            source: [],
            renderPlaceholderOnly: 'success',
            showType: 'all',
            isRefreshing: false
        };
    }

    initFinish = () => {
        this.setState({renderPlaceholderOnly:'success'});
        // let names = '';
        // if(this.props.name=='好工作'&&this.state.showType=='all'){
        //     names = '';
        // }else{
        //     names = this.props.name;
        // }
        // let maps = {
        //     name: names,
        //     pageIndex: this.pageIndex,
        //     pageSize: this.pageSize
        // };
        // request(Urls.JOBS, 'Post', maps)
        //     .then((response) => {
        //             console.log(response);
        //             this.allList.push(...response.mjson.data.content);
        //             this.allPage=response.mjson.data.totalPages;
        //             const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        //             this.setState({source: ds.cloneWithRows(this.allList),
        //                 renderPlaceholderOnly:'success',isRefreshing:false});
        //         },
        //         (error) => {
        //             this.setState({renderPlaceholderOnly: 'error'});
        //         });
    }

    render() {
        if (this.state.renderPlaceholderOnly != 'success') {
            return this._renderPlaceholderView();
        }
        let itemList=[]
        for(let i=0;i<this.findTag.length;i++){
            itemList.push(
                <TouchableOpacity key={i+'ttt'} style={{
                    marginLeft:Pixel.getPixel(15),
                }}>
                    <Text style={{
                        fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT26),
                        color:'#000',
                        textDecorationLine:'underline'
                    }}>{this.findTag[i]}</Text>
                </TouchableOpacity>
                );
        }
        return (<View style={{flex: 1, backgroundColor: '#fff'}}>
            <View onPress={()=>{
                this.props.findBack();
            }} style={{marginTop:Pixel.getTitlePixel(69),width:width-Pixel.getPixel(35),
                height:Pixel.getPixel(35),backgroundColor:'#fff',flexDirection:'row',marginLeft:Pixel.getPixel(15)}}>
                <View style={{flex:8,justifyContent:'center',paddingLeft:Pixel.getPixel(5),borderWidth:1,
                    borderColor:fontAndColor.COLORA4,borderRadius:3}}>
                    <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),
                        color:'#000'}}>查找你感兴趣的岗位</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',paddingRight:Pixel.getPixel(5)}}>
                    <Image style={{width: Pixel.getPixel(25), height: Pixel.getPixel(25),
                    marginLeft:Pixel.getPixel(5)}}
                           source={require('../../images/findIcon.png')}/>
                </View>
            </View>
            <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),
                color:'#000',fontWeight:'bold',marginTop:Pixel.getPixel(15),
                marginLeft:Pixel.getPixel(15)}}>最新查找</Text>
            <View style={{width:width-Pixel.getPixel(30),
                marginTop:Pixel.getPixel(15), flexDirection:'row'}}>
                {itemList}
            </View>
            {this.allList.length<=0?<View></View>:
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
        if(movie==1123){
            return<View></View>
        }else{
            let name = this.props.name;
            if (this.props.tabLabel == 'ios-paper' && this.state.showType == 'all') {
                name = '全部'
            }
            return (<PostListItem data={movie} callBack={() => {
                this.toNextPage({
                    name: 'PostInfoScene',
                    component: PostInfoScene,
                    params: {id:movie.id,name:movie.jobTypeStr}
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

