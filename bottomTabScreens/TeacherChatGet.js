import { useState ,useEffect} from "react";
import {View,Text,StyleSheet, Pressable,Modal,Button,FlatList} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



  

function Component({response,x}){
    const [visible,setvisible] = useState(false)

    

    function modalHandler(){
        setvisible(true);
    }

    function modalCloser(){
        setvisible(false);
    }

    const createdateString = response.createdate;
    const createdate = new Date(createdateString);
    const year = createdate.getFullYear();
    const month = (createdate.getMonth() + 1).toString(); 
    
    // Januay is 0, so add 1 to get the correct month
    const date = createdate.getDate();

    const hours = createdate.getHours();
    const minutes = createdate.getMinutes();
    


    return (
        
        
        <View style={styles.messageContainer}>
        <View style={styles.infoContainer}>
            <Text>{ date+"/"+ month + "/"+year}</Text>
            <Text>{hours+":"+minutes}</Text>
            <Text style={{marginTop:5}}>{response.title}</Text>
        </View>
        
        <Pressable onPress={modalHandler} style={styles.pressable}>
            <Text style={{padding:5}} numberOfLines={3} ellipsizeMode="tail">{response.content}</Text>
            <Modal visible={visible} animationType="slide">
                <View>
                    <Button title="X" onPress={modalCloser}></Button>
                </View>
                
                <Text>{response.content}</Text>
                
            </Modal>
        </Pressable>
        
       { x!= null &&
          <View style={styles.buttonContainer}>
            <Pressable android_ripple={{ color: "#40A2E3" }} style={styles.PressableElement} >
                <Text>ATTACHEMENTS</Text>
            </Pressable>
        </View>}
        
        
    </View>)
}

// const downloadHandler = async (fileUrl, fileName) => {
//   try {
//     const { config, fs } = RNFetchBlob;
//     const downloadDir = Platform.OS === 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
//     const path = `${downloadDir}/${fileName}`;

//     const configOptions = {
//       fileCache: true,
//     };

//     if (Platform.OS === 'android') {
//       configOptions.addAndroidDownloads = {
//         useDownloadManager: true,
//         notification: true,
//         path: path,
//         description: 'Downloading file...',
//       };
//     } else if (Platform.OS === 'ios') {
//       configOptions.IOSBackgroundTask = true;
//     }

//     const res = await config(configOptions).fetch('GET', fileUrl);

//     // Move the downloaded file to the desired location (optional)
//     if (Platform.OS === 'ios') {
//       await fs.mv(res.path(), path);
//     }

//     console.log('File downloaded successfully at: ', path);
//   } catch (error) {
//     console.error('Error downloading file: ', error);
//   }
// };


function TeacherChatGet({courseCode}) {
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    console.log("TeacherChatGet component rendered successfully");
    console.log("teacherchat get "+ courseCode);
    
  
    useEffect(() => {
      const getToken = async () => {
          try {
              const userDataString = await AsyncStorage.getItem('userData');
              if (userDataString !== null) {
                  // Parse the JSON string back into a JavaScript object
                  const userData = JSON.parse(userDataString);
                  
                  // Extract the token from userData
                  const token = userData.token;
                  
                  // Set the token using setToken
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

      const course = courseCode;
  
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://bcec696dad7a74e988364eac6abea523.serveo.net/api/Material/${course}`, config);
          setData(response.data);
          console.log("fetched data in teacherchatget is "+ response.data); // Set response data to state
        } catch (error) {
          console.error(error);
        }
      };
  
      if (token) {
        fetchData();
      }
    }, [token]);
  
    const renderItem = ({ item }) => (
      <Component response={item} x={item.file} />
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
  

export default TeacherChatGet;

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
