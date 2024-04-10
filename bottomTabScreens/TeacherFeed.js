import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Modal, TextInput, Button , Switch} from "react-native";
import Home from "./Home";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Calendar } from 'react-native-calendars';


function TeacherFeed() {
    const [modalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [subValue, setSubValue] = useState('');
    const [token, setToken] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [isCalendarVisible, setCalendarVisibility] = useState(false);
    const [value, setValue] = useState(false);

    const toggleCalendarVisibility = () => {
        setCalendarVisibility(!isCalendarVisible);
      };

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
        toggleCalendarVisibility();
        console.log(selectedDate);
    };

    const toggleSwitch = () => {
        // Toggles the value between true and false
        setValue(previousState => !previousState);
      };


    console.log("teacher feed entered successfully");

    const handlePress = () => {
        setModalVisible(true);
    };

    const handleInputChange = (text) => {
        setInputValue(text);
    };

    const subjectChange = (text) => {
        setSubValue(text);
    };

    const modalButtonClose = () =>{
        setModalVisible(false);
    }

    const handleModalClose = async () => {
        setModalVisible(false);
        console.log(inputValue);
        console.log(subValue);
        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify({
                'title': subValue,
                'content': inputValue,
                'toFacilityOnly': value,
                'expire_at': selectedDate
            }));
    
            const storedToken = await AsyncStorage.getItem('userData');
            if (storedToken !== null) {
                // Parse the JSON string back into a JavaScript object
                const userData = JSON.parse(storedToken);
                // Extract the token from userData
                const token = userData.token;
    
                const response = await axios.post('https://bcec696dad7a74e988364eac6abea523.serveo.net/api/update/', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Properly interpolate Bearer token
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
            <Home />
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

                        <View >
                            <View style={styles.calendar}>
                                <Button title="Set Date" onPress={toggleCalendarVisibility} />
                                {isCalendarVisible && (  <Calendar    onDayPress={onDayPress}    markedDates={{      [selectedDate]: { selected: true, selectedColor: 'blue' },}}  />)}
                            </View>
                        </View>

                        <View style={styles.container}>
                            <Switch
                                value={value}
                                onValueChange={toggleSwitch}
                                thumbColor={value ? "#00ff00" : "#ff0000"}
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                            />
                            <Text>{value.toString()}</Text>
                        </View>


                        <Pressable style={styles.sendButton} onPress={handleModalClose}>
                            <Text style={styles.sendButtonText}>Send</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default TeacherFeed;

const styles = StyleSheet.create({

    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    logOutContainer: {
        position: "absolute",
        bottom: 5,
        right: 5, // Adjust the right position as needed
        height: 40,
        width: "50%",
        borderWidth: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#3B71F3",
        marginBottom: 10 // Background color added for visibility
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
})
