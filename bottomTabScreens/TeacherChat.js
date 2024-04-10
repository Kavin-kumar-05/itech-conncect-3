import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Modal, TextInput, Button } from "react-native";
import TeacherChatGet from "./TeacherChatGet";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TeacherChat = ({ route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [subValue, setSubValue] = useState('');
    const [token, setToken] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [isCalendarVisible, setCalendarVisibility] = useState(false);
    const [value, setValue] = useState(false);
    console.log("teacher chat entereed")
    const { courseCode } = route.params; // Accessing courseCode from route.params
    

    const handlePress = () => {
        setModalVisible(true);
    };

    const handleInputChange = (text) => {
        setInputValue(text);
    };
    
    const modalButtonClose = () =>{
        setModalVisible(false);
    }

    const subjectChange = (text) => {
        setSubValue(text);
    };

    const handleModalClose = async () => {
        setModalVisible(false);
        console.log("posted_title: "+subValue);
        console.log("content:"+inputValue);
        console.log("Sending data for course code: ", courseCode);
        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify({
                'title': subValue,
                'content': inputValue,
                'to_display':true,
                'coursecode': courseCode // Using courseCode here
            }));

            const storedToken = await AsyncStorage.getItem('userData');
            if (storedToken !== null) {
                const userData = JSON.parse(storedToken);
                const token = userData.token;

                const response = await axios.post('https://bcec696dad7a74e988364eac6abea523.serveo.net/api/Material/', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log("posted successfully");
            } else {
                console.log('No token found in AsyncStorage');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const getToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken !== null) {
                    setToken(storedToken);
                } else {
                    console.log('No token found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error retrieving token:', error);
            }
        };

        getToken();
    }, []);

    return (
        <>
            <TeacherChatGet courseCode={courseCode}/>
            <Pressable android_ripple={{ color: '#ccc' }} style={styles.logOutContainer} onPress={handlePress}>
                <View>
                    <Text style={styles.buttonText}>+</Text>
                </View>
            </Pressable>

            <Modal animationType="slide" visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <Button title="X" onPress={modalButtonClose}></Button>
                    <View style={styles.modalContent}>
                        <Text>From: </Text>
                        <View style={styles.inputContainer}>
                            <Text>SUBJECT: </Text>
                            <TextInput style={styles.input} value={subValue} multiline={true} onChangeText={subjectChange} placeholder='Enter subject'></TextInput>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text>CONTENT: </Text>
                            <TextInput style={styles.input} value={inputValue} multiline={true} onChangeText={handleInputChange} placeholder='Enter message' />
                        </View>
                        <View style={styles.attachments}>
                            <Button title="attachments" ></Button>
                        </View>
                        <Pressable style={styles.sendButton} onPress={handleModalClose}>
                            <Text style={styles.sendButtonText}>Send</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    );
}

export default TeacherChat;

const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logOutContainer: {
        position: "absolute",
        bottom: 5,
        right: 5,
        height: 40,
        width: "50%",
        borderWidth: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#3B71F3",
        marginBottom: 10
    },
    modalContainer: {
        borderWidth: 2,
        borderRadius: 15
    },
    modalContent: {
        padding: 15
    },
    inputContainer: {
        borderWidth: 1,
        marginTop: 30,
        padding: 5
    },
    attachments: {
        borderRadius: 10,
        marginTop: 10
    },
    sendButton: {
        marginTop: 25,
        backgroundColor: "#3B71F3",
        width: 100,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15
    },
    sendButtonText: {
        color: "#ffffff"
    },
    calendar: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop:10,
        borderRadius:10
    },
    label: {
        marginBottom: 10,
    }
});
