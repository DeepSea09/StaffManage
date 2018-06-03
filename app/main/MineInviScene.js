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

import  Pixel from '../utils/PixelUtil'
import * as fontAndColor from '../constant/fontAndColor';
import NavigationView from '../component/AllNavigationView';
import MineAuthItem from './component/MineAuthItem';
import InviItem from './component/InviItem';
import MainScene from "./NavigationScene";
import TuiJianGongYouScene from "./TuiJianGongYouScene";
export default class MineInviScene extends BaseComponent {

    constructor(props) {
        super(props);
        let mList = [{name:'1',content:'张三',left:'1000元'},
            {name:'2',content:'李四',left:'1000元'},
            {name:'3',content:'王五',left:'1000元'},
            {name:'2',content:'李四',left:'1000元'},
            {name:'2',content:'李四',left:'1000元'},
            {name:'2',content:'李四',left:'1000元'},
            {name:'2',content:'李四',left:'1000元'},];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            source: ds.cloneWithRows(mList),
            renderPlaceholderOnly: 'blank'
        };
    }


    render() {
        return (<View style={{flex:1, backgroundColor:'#fff'}}>

            <ListView
                removeClippedSubviews={false}
                dataSource={this.state.source}
                renderRow={this._renderRow}
                showsVerticalScrollIndicator={false}
            />
            <NavigationView
                title="我的推荐"
            />
        </View>)
    }

    _renderRow=(movie, sectionId, rowId)=>{
        if(rowId==0){
            return(
                <View style={{alignItems:'center'}}>
                    <View style={{width:width,height:Pixel.getPixel(180),justifyContent:'center',
                        alignItems:'center',marginTop:Pixel.getTitlePixel(64), backgroundColor:'#0ff'}}>
                        <Text style={{fontSize:Pixel.getPixel(fontAndColor.BUTTONFONT30), color:'#000',
                            fontWeight:'bold',marginTop:Pixel.getPixel(10)}}>占位图</Text>
                    </View>
                    <MineAuthItem data={{name:'奖励说明文字',content:'',left:require('../../images/leftimage.png')}}
                                  callBack={()=>{}}/>
                    <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
                    <MineAuthItem data={{name:'其他说明',content:'',left:require('../../images/leftimage.png')}}
                                  callBack={()=>{}}/>
                    <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
                    <TouchableOpacity onPress={()=>{
                            this.props.toNextPage({
                                name: 'TuiJianGongYouScene',
                                component: TuiJianGongYouScene,
                                params: {}
                            });
                    }} style={{width:Pixel.getPixel(120),height:Pixel.getPixel(40),
                        backgroundColor:fontAndColor.COLORB0,borderRadius:5,justifyContent:'center',
                        alignItems:'center',marginTop:Pixel.getPixel(15)}}>
                        <Text style={{fontSize:Pixel.getPixel(fontAndColor.BUTTONFONT30), color:'#fff'
                            ,}}>推荐工友</Text></TouchableOpacity>
                    <MineAuthItem data={{name:'我的推荐',content:'',left:require('../../images/leftimage.png')}}
                                  callBack={()=>{}}/>
                    <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
                    <InviItem data={{name:'序号',content:'姓名',left:'奖励'}} show={true}/>
                    <InviItem data={movie} show={false}/>
                </View>
                )
        }
        else{
            return(
                <View style={{alignItems:'center'}}>
                <InviItem data={movie} show={false}></InviItem>
                </View>
            )
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

