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
import MineAuthItem from "./component/MineAuthItem";
import NavigationView from '../component/AllNavigationView';
import TrainItem from "./component/TrainItem";
export default class MainScene extends BaseComponent {

    constructor(props) {
        super(props);
        let mList = [{
            number: '1', com: '富士康', gangwei: '叉車',
            money: '6000.00', shoufei: '否', caozuo: '申請'
        },
            {
                number: '2', com: '富士康', gangwei: '叉車',
                money: '6000.00', shoufei: '否', caozuo: '申请'
            },
            {
                number: '3', com: '富士康', gangwei: '叉車',
                money: '6000.00', shoufei: '否', caozuo: '申请'
            },];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            source: ds.cloneWithRows(mList),
            renderPlaceholderOnly: 'blank'
        };
    }


    render() {
        return (<View style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{
                width: width, backgroundColor: fontAndColor.COLORB0, height: Pixel.getPixel(150),
                flexDirection:'row',marginTop:Pixel.getTitlePixel(64)
            }}>
                <View style={{flex:1,justifyContent: 'center'}}></View>
                <View style={{flex:1,justifyContent: 'center'}}>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                        backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7),
                    }}>
                        已申请培训
                    </Text>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                        backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7)
                    }}>
                        培训成果
                    </Text>
                    <Text style={{
                        fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                        backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7)
                    }}>
                        培训失败
                    </Text>
                </View>
               <View style={{flex:1,justifyContent: 'center'}}>
                   <Text style={{
                       fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                       backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7),
                   }}>
                       5
                   </Text>
                   <Text style={{
                       fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                       backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7)
                   }}>
                       3
                   </Text>
                   <Text style={{
                       fontSize: Pixel.getPixel(fontAndColor.LITTLEFONT28),
                       backgroundColor: '#00000000', color: '#fff', marginTop: Pixel.getPixel(7)
                   }}>
                       2
                   </Text>
               </View>
            </View>
            <MineAuthItem data={{name:'培训列表',content:'',left:require('../../images/banshou.png')}}
                          callBack={()=>{}}/>
            <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
            <View style={{width:width,height:Pixel.getPixel(200),marginTop:Pixel.getPixel(20)}}>
                <ListView
                    removeClippedSubviews={false}
                    dataSource={this.state.source}
                    renderRow={this._renderRow}
                    showsVerticalScrollIndicator={false}
                    renderSeparator={this._renderSeparator}
                />
            </View>
            <MineAuthItem data={{name:'培训客服',content:'',left:require('../../images/ren.png')}}
                          callBack={()=>{}}/>
            <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
            <MineAuthItem data={{name:'培训说明',content:'',left:require('../../images/shu.png')}}
                          callBack={()=>{}}/>
            <View style={{width:width,height:1, backgroundColor:fontAndColor.COLORA3}}></View>
            <Text style={{fontSize:Pixel.getPixel(fontAndColor.LITTLEFONT28),
                marginHorizontal:Pixel.getPixel(20),marginTop:Pixel.getPixel(10)}}>
                说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明
                说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明
                说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明
                说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明
            </Text>
            <NavigationView
                title="我的培训"
                backIconClick={this.backPage}
            />
        </View>)
    }


    _renderRow = (movie, sectionId, rowId) => {
        if(rowId==0){
            return(<View>
                <TrainItem data={{
                    number: '序号', com: '培训公司', gangwei: '培训岗位',
                    money: '预估薪水', shoufei: '是否收费', caozuo: '操作'
                }} show={true}></TrainItem>
                <TrainItem data={movie} show={false}></TrainItem>
            </View>);
        }else{
            return (<TrainItem data={movie} show={false}></TrainItem>)
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

