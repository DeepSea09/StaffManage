import { Platform } from 'react-native'
import { StackNavigator } from 'react-navigation'
import RootScene from './app/main/RootScene'
import NavigationScene from './app/main/NavigationScene'
import ApplyScene from './app/main/ApplyScene'
import CarIDScene from './app/main/CarIDScene'
import FindPostListScene from './app/main/FindPostListScene'
import MineAuthScene from './app/main/MineAuthScene'
import MineMoneyScene from './app/main/MineMoneyScene'
import MineServiceScene from './app/main/MineServiceScene'
import PostInfoScene from './app/main/PostInfoScene'
import ReleaseScene from './app/main/ReleaseScene'
import TongXunLuScene from './app/main/TongXunLuScene'
import TrainScene from './app/main/TrainScene'
import TuiJianGongYouScene from './app/main/TuiJianGongYouScene'
import WelfareScene from './app/main/WelfareScene'
import LoginScene from './app/login/LoginScene'
const App = StackNavigator({
    RootScene: {screen: RootScene},
    NavigationScene: {screen: NavigationScene},
    CarIDScene: {screen: CarIDScene},
    ApplyScene: {screen: ApplyScene},
    FindPostListScene: {screen: FindPostListScene},
    MineAuthScene: {screen: MineAuthScene},
    MineMoneyScene: {screen: MineMoneyScene},
    MineServiceScene: {screen: MineServiceScene},
    PostInfoScene: {screen: PostInfoScene},
    ReleaseScene: {screen: ReleaseScene},
    TongXunLuScene: {screen: TongXunLuScene},
    TrainScene: {screen: TrainScene},
    TuiJianGongYouScene: {screen: TuiJianGongYouScene},
    WelfareScene: {screen: WelfareScene},
    LoginScene: {screen: LoginScene},
},{
    navigationOptions: {
        headerStyle: {
           height:0
        },
    },
});

module.exports = App;