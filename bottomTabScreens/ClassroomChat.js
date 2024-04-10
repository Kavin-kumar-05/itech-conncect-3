import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Modal, Button, FlatList } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Component({ response, courseCode }) {
    const [visible, setvisible] = useState(false)

    function modalHandler() {
        setvisible(true);
    }

    function modalCloser() {
        setvisible(false);
    }

    const createdateString = response.createdate;
    const createdate = new Date(createdateString);
    const year = createdate.getFullYear();
    const month = (createdate.getMonth() + 1).toString();
    const date = createdate.getDate();
    const hours = createdate.getHours();
    const minutes = createdate.getMinutes();

    return (
        <View style={styles.messageContainer}>
            <View style={styles.infoContainer}>
                <Text>{date + "/" + month + "/" + year}</Text>
                <Text>{hours + ":" + minutes}</Text>
                <Text style={{ marginTop: 5 }}>{response.title}</Text>
            </View>

            <Pressable onPress={modalHandler} style={styles.pressable}>
                <Text style={{ padding: 5 }} numberOfLines={3} ellipsizeMode="tail">{response.content}</Text>
                <Modal visible={visible} animationType="slide">
                    <View>
                        <Button title="X" onPress={modalCloser}></Button>
                    </View>
                    <Text>{response.content}</Text>
                </Modal>
            </Pressable>

            {response.file &&
                <View style={styles.buttonContainer}>
                    <Pressable android_ripple={{ color: "#40A2E3" }} style={styles.PressableElement} >
                        <Text>ATTACHEMENTS</Text>
                    </Pressable>
                </View>}
        </View>
    )
}

function ClassroomChat({ route }) {
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    
    const { courseCode } = route.params;

    useEffect(() => {
        const getToken = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('userData');
                if (userDataString !== null) {
                    const userData = JSON.parse(userDataString);
                    const token = userData.token;
                    setToken(token);
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
                const response = await axios.get(`https://bcec696dad7a74e988364eac6abea523.serveo.net/api/Material/${courseCode}`, config);
                setData(response.data);
                console.log("fetched data in teacherchatget is " + response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (token) {
            fetchData();
        }
    }, [token, courseCode]);

    const renderItem = ({ item }) => (
        <Component response={item} courseCode={courseCode} />
    );

    return (
        <View>
        <FlatList
          data={data} // Use response data in FlatList
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    );
}

export default ClassroomChat;

const styles = StyleSheet.create({
    messageContainer:{
        borderWidth:2,
        margin:10,
        borderRadius:5,
        height:250,
        padding:10,
        
    },

    pressable:{
        borderWidth:1,
        borderRadius:15,
        padding:5        
    },

    infoContainer:{
        padding:5,
        
    },

    senderContainer:{
        marginBottom:10
    },
    
    buttonContainer:{
        borderWidth:1,
        position:"absolute",
        bottom:0,
        margin:15,
        width:"30%",
        borderRadius:10,
        alignItems:"center",
        height:50,
        justifyContent:'center',
        backgroundColor:"#3B71F3"
    },

    PressableElement:{
        color:"#FEFBF6"
    }
})
