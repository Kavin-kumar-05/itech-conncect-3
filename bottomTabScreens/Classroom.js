import React, { useEffect, useState } from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

function TeacherClass(){
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    const navigation = useNavigation();

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
      const fetchData = async () => {
          try {
              const response1 = await axios.get('https://bcec696dad7a74e988364eac6abea523.serveo.net/api/student/details/', {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  }
              });
              
              const { dept, semester, year } = response1.data;
  
              // Data for the second POST request
              const postData = {
                  "department": dept,
                  "semester": semester,
                  "year": year
              };
  
              const response2 = await axios.post('https://bcec696dad7a74e988364eac6abea523.serveo.net/api/subject/details/', postData, {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  }
              });
              console.log(response2.data);
              
              setData(response2.data); // Set the data fetched from the API response
          } catch (error) {
              console.error(error);
          }
      };
  
      if (token) {
          fetchData();
      }
  }, [token]);
  
    

    function ClassHandler(courseCode){
        return () => {
            console.log("Navigating to Student Chat Page with course code: ", courseCode);
            navigation.navigate('Student Chat Page', { courseCode: courseCode });
        };
    }

    return (
        <View style={styles.container}>
            {data.length > 0 ? (
                data.map((item, index) => (
                    <Pressable key={index} style={styles.pressable} onPress={ClassHandler(item.coursecode)}>
                        <View style={styles.view}>
                            <Text style={styles.text}>Course Code: {item.coursecode}</Text>
                            <Text style={styles.text}>Department: {item.department}</Text>
                            <Text style={styles.text}>Semester: {item.semester}</Text>
                        </View>
                    </Pressable>
                ))
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressable:{
        width: "80%",
        height: 100,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10
    },
    view:{
        width: '100%',
        height: '100%',
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default TeacherClass;
