import { useState, useEffect } from "react";
import {View,Text,Image,StyleSheet, Pressable,Modal} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


function Profile(){

    const [userData, setUserData] = useState({});
    const [profileData,setProfiledata] = useState({});
    const [token, setToken] = useState('');
    const [role, setRole] = useState('');
    

    useEffect(() => {
        const getToken = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('userData');
                if (userDataString !== null) {
                    const userData = JSON.parse(userDataString);
                    const htoken = userData.token;
                    setToken(htoken);
                } else {
                    console.log('No userData found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error retrieving token:', error);
            }
        };

        getToken();
    }, []);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const fetchData = async () => {
            try {
                const response = await axios.get('https://bcec696dad7a74e988364eac6abea523.serveo.net/api/auth/', config);
                setUserData(response.data);
                setRole(response.data.role);
                
            } catch (error) {
                console.error(error);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token]);

   
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const fetchDataWithRole = async () => {
            try {
                let finalRole = '';
                if (role === "Students") {
                    finalRole = "student";
                } else {
                    finalRole = "faculty";
                }
                const response1 = await axios.get(`https://883386dfbb0f60d0335dbec3521b1814.serveo.net/api/${finalRole}/details/`, config);
                
                setProfiledata(response1.data)
                console.log("finalRole"+finalRole);
            } catch (error) {
                console.error(error);
            }
        };

        if (token && role) { // Make sure both token and role are available
            fetchDataWithRole();
        }
    }, [token, role]); 
    
    console.log(profileData);
   

    return(<View style={styles.mainContainer}>

        <ScrollView>
        <View style={styles.topContent}>
            
                <View style={styles.profileContainer}>
                    <Image style={styles.profileImage} source={require("../assets/images/profile.jpeg")} />
                </View>

                <View style={styles.infoContainer}>

                    
                    <Text style={styles.dept}>{profileData.dept}</Text>
                    <Text>{profileData.user.email}</Text>
                    <Text>{profileData.semester}</Text>
                    <Text>{profileData.rollno}</Text>
                    <Text>CGPA : 9.1</Text>
                    <Text>Attandance: 74%</Text>

                </View>

                
                    <View style={{ backgroundColor: '#3B71F3', borderRadius: 20, padding: 16 , marginBottom:5,marginTop:30}}>
                        <Text style={{color:"white",fontSize: 10}}>{profileData.rollno}</Text>
                    </View>
                

        </View>

        

        </ScrollView>

        <Pressable android_ripple={{ color: '#ccc' }} style={styles.logOutContainer}>
            <View>
                <Text>Log out</Text>
            </View>
        </Pressable>
        

        </View>

    )
};


export default Profile;

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        padding:12
    },

    topContent:{
        borderWidth:2,
        alignItems:'center',
        borderRadius:25,
        padding:0
    },

    profileContainer:{
        borderRadius:100,
        marginTop:10,
        width:100,
        height:100,
        overflow:"hidden",
    },

    profileImage:{
        resizeMode:'cover'
    },

    infoContainer:{
        justifyContent:'center',
        alignItems:'center'
    },

    name:{
        fontSize:22,
        fontWeight:'bold'
    },

    dept:{
        fontSize:16,
        fontWeight:'bold'
    },

    project:{
        height:300,
        borderWidth:2,
        marginTop:10,
        borderRadius:25,
        padding:10
    },

    logOutContainer:{
        flex:1,
        position:"absolute",
        bottom:5,
        width:"50%",
        borderWidth:1,
        borderRadius:25,
        alignContent:'center',
        alignItems:'center',
        justifyContent:"flex-start",
    }
})