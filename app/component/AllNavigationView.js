/**
 * Created by zhengnan on 17/2/14.
 */

import React, {Component} from 'react';

import {

    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,

} from 'react-native';

import *as fontAndColor from '../constant/fontAndColor';
import Pixel from '../utils/PixelUtil';

export default class AllNavigationView extends Component {


    // 构造
      constructor(props) {
        super(props);
        console.log("1111111111111111111111");
        // 初始状态
        this.state = {

            navigationBackgroundColor:null,

        };
      }

      setNavigationBackgroindColor=(color)=>{

          this.setState({
              navigationBackgroundColor:color,
          });
      }

    render() {

        const {title, backIconClick, renderRihtFootView,wrapStyle} = this.props;

        return (
            <View style={[{   height: Pixel.getTitlePixel(64),
                backgroundColor: fontAndColor.COLORB0,
                left: 0,
                right: 0,
                position: 'absolute',
                flex: 1},wrapStyle,this.state.navigationBackgroundColor && {backgroundColor:this.state.navigationBackgroundColor}]}>
                <View style={{marginTop: Pixel.getTitlePixel(20),
                    height: Pixel.getPixel(44),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',}}>
                     <TouchableOpacity style={{width: Pixel.getPixel(80), height: Pixel.getPixel(44),justifyContent:'center'}}
                                      onPress={backIconClick}>
                    {backIconClick && <Image style={styles.backIcon} source={require('../../images/backimage.png')}/>}
                     </TouchableOpacity>
                    <Text allowFontScaling={false}  style={styles.titleText}>{title}</Text>
                    <View style={styles.imageFoot}>
                        {
                            renderRihtFootView && renderRihtFootView()
                        }
                    </View>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({


    content: {
        marginTop: Pixel.getTitlePixel(20),
        height: Pixel.getPixel(44),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    backIcon: {

        marginLeft: Pixel.getPixel(12),
        height: Pixel.getPixel(20),
        width: Pixel.getPixel(20),
        resizeMode:'stretch'
    },

    titleText: {
        color: '#fff',
        fontSize: Pixel.getFontPixel(fontAndColor.NAVIGATORFONT34),
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontWeight:'bold'

    },
    imageFoot: {

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        // backgroundColor:'red
        width: Pixel.getPixel(80),
        marginRight:Pixel.getPixel(15),


    },
    navigation: {
        height: Pixel.getTitlePixel(64),
        backgroundColor: fontAndColor.COLORB0,
        left: 0,
        right: 0,
        position: 'absolute',
        flex: 1
    }

})