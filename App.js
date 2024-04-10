import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from 'expo-status-bar';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import MainScreen from "./screens/MainScreen";
import TeacherScreen from './screens/TeacherScreen';
import TeacherChat from './bottomTabScreens/TeacherChat';
import ClassroomChat from './bottomTabScreens/ClassroomChat';




export default function App() {
  const Stack = createStackNavigator();

    return (
        <>
      <StatusBar style='dark' />
      <NavigationContainer >

        <Stack.Navigator screenOptions={{cardStyle:{backgroundColor:"#ffffff"}}}>

          <Stack.Screen name="Welcome Screen" component={WelcomeScreen} options={{headerTitleAlign: 'center' }} />
          <Stack.Screen name="Account Login" component={SignInScreen} options={{headerTitleAlign: 'center' }}/>
          <Stack.Screen name="Main Page" component={MainScreen} options={{ headerTitleAlign: 'center' }}/>
          <Stack.Screen name="Teacher Page" component={TeacherScreen} options={{headerTitleAlign:'center'}} />
          <Stack.Screen name="Teacher Chat Page" component={TeacherChat} options={{headerTitleAlign:'center'}} />
          <Stack.Screen name="Student Chat Page" component={ClassroomChat} options={{headerTitleAlign:'center'}} />
          

        </Stack.Navigator>

      </NavigationContainer>

    </>
    )
}


