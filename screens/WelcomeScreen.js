import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native';

function WelcomeScreen({ navigation }) {
    function pressHandler() {
        navigation.navigate("Account Login");
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.collegeName}>
                <Text style={styles.headerText}></Text>
                
                <Text style={styles.headerText}>iTech Connect</Text>
            </View>
            
            
            <Image style={styles.image} source={require("../assets/images/clg_logo.png")} />
            <View>
                
                <View style={styles.pressableContainer}>
                    <Pressable android_ripple={{ color: "#cccccc" }} style={styles.pressable} onPress={pressHandler}>
                        <Text style={styles.pressableText}>Get Started</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: "center",

    },

    headerText:{
        
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    
    collegeName: {
        marginTop: 200,
        fontSize: 20,
        fontWeight: "bold",
        

    },
    image: {
        marginTop: 30,
        marginBottom: 100,
    },

    textStyle: {
        fontSize: 20,
    },
    pressableContainer: {
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
        overflow: "hidden",
        elevation: 4
    },
    pressable: {
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#3B71F3",
    },
    pressableText: {
        padding: 15,
        textAlign: 'center',
        color: 'white',
        fontSize: 20
    }
})
