import { View, Text, TextInput, StyleSheet, Pressable, Image, Alert } from "react-native";
import { useState } from "react";
import {useForm,Controller} from "react-hook-form";
import loginUser from "../util/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";



import { Ionicons } from '@expo/vector-icons';


function SignInScreen({ navigation }) {


    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
   
    

    function emailHandler(text){
        setemail(text);   
    }

    function passwordHandler(text){ 
        setpassword(text);
    }


     function signInHandler() {
            console.log(email);
            console.log(password);
            loginUser(email, password)
            
            .then(response => {
                const data = {
                    token: response.token,
                    role: response.role
                };
                const jsonData = JSON.stringify(data);
                AsyncStorage.setItem('userData', jsonData)
                    .then(() => {
                        console.log('Token and role stored successfully');
                    })
                    .catch(error => {
                        console.error('Error storing token:', error);
                    });

            if(response.role == "Students"){
                navigation.navigate("Main Page");
            }else{
                navigation.navigate("Teacher Page")
            }

  })
            .catch(error => {
    // Handle any errors that occur during login
                Alert.alert("Authentication failed !",'Could not log you in. Please check your credentials or try again later !')
                setemail('');
                setpassword('');
                console.error("Error during login:", error);
    
  });
            
     
// navigation.navigate("Teacher Page")
}
  
    return (
        <View style={styles.rootContainer}>
            <Image source={require("../assets/images/clg_logo.png")} />
            <Text style={styles.mainText}>iTech Login</Text>
            <View style={styles.inputContainer}>

                <View style={styles.textInput}>
                    <View>
                        <Ionicons name="person-outline" size={20} color="black" />
                    </View>
                    <TextInput style={styles.inputText} placeholder="Email" value={email} onChangeText={emailHandler}/>
                </View>

                <View style={styles.textInput}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="lock-closed-outline" size={20} color="black" />
                    </View>
                    <TextInput style={styles.inputText} placeholder="Password" value={password} onChangeText={passwordHandler}/>   
                </View>
                
            </View>



            <View style={styles.buttonContainer}>
                <View style={styles.pressableContainer}>
                    <Pressable android_ripple={{ color: '#ccc' }} style={styles.pressable} onPress={signInHandler}>
                        <Text style={styles.pressableText}>Sign In</Text>
                    </Pressable>
                </View>

                <View style={styles.footer}>
                    <Text style={{ fontStyle: 'italic' }}>I hereby abide by the restrictions and proceed</Text>
                </View>

            </View>
        </View>
    );
}

export default SignInScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 50,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    mainText: {
        marginBottom: 30,
        fontSize: 30,
        marginTop: 10
    },
    inputContainer: {
        width: "70%",
        marginVertical:5
    },

    textInput: {
        flexDirection:"row",
        borderColor:"#e8e8e8",
        borderWidth: 1,
        borderRadius: 5,
        margin:5,
        padding:7
    },


    inputText:{
        paddingLeft: 10
    },
    sideText: {
        marginTop: 10
    },
    bottomContainer: {

    },

    buttonContainer: {
        flexDirection: 'column'
    },
    pressableContainer: {
        overflow: 'hidden',
        flexDirection: 'column',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 20


    },

    pressable: {
        elevation: 2,
        backgroundColor: "#3B71F3"
    },

    pressableText: {
        padding: 15,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight:'bold'
    },

    footer: {
        justifyContent: 'center'
    }
})

