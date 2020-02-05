import React, { Component } from "react";
import { StyleSheet, View, Text, MaskedViewIOS, Animated, ImageBackground, AsyncStorage } from "react-native";

export default class LoadingScreen extends Component {
    state = {
        loadingProgress: new Animated.Value(0),
        animationDone: false
    };

    componentDidMount() {
        Animated.timing(this.state.loadingProgress, {
            toValue: 100,
            duration: 1000,
            useNativeDriver: true
        }).start(() => {
            this.setState({ animationDone: true });
        });

        setTimeout(() => {
            this.props.navigation.navigate("AuthLoadingScreen");
        }, 1000);
    }

    render() {
        const FirstLayer = this.state.animationDone ? null : <View style={{ backgroundColor: "white" }} />;

        const SecondLayer = this.state.animationDone ? null : <View style={{ backgroundColor: "white" }} />;

        const imageScale = {
            transform: [
                {
                    scale: this.state.loadingProgress.interpolate({
                        inputRange: [0, 15, 100],
                        outputRange: [0.1, 2, 16]
                    })
                }
            ]
        };
        const opacity = {
            opacity: this.state.loadingProgress.interpolate({
                inputRange: [0.1, 25, 95],
                outputRange: [0.1, 0, 9],
                extrapolate: "clamp"
            })
        };

        return (
            <View style={{ flex: 1 }}>
                {FirstLayer}
                {
                    
                }
                <MaskedViewIOS
                    style={{ flex: 1 }}
                    maskElement={
                        <View stlye={styles.centered}>
                            <Animated.Image source={require("./../../../img/loadingshape.png")} style={[imageScale]} resizeMode="contain" />
                        </View>
                    }
                >
                    {SecondLayer}
                    <Animated.View style={[opacity, styles.centered]}>
                        <ImageBackground
                            source={require("./../../../img/loading.png")}
                            style={styles.bgImage}
                            resizeMode="cover"
                        ></ImageBackground>
                    </Animated.View>
                </MaskedViewIOS>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    bgImage: {
        width: "100%",
        height: "100%"
    }
});

// =======
// import React, { Component } from "react";
// import { View, Text, StyleSheet, AsyncStorage } from "react-native";

// export default class LoadingScreen extends Component {
//     constructor(props) {
//         super(props);
//         this._bootstrapAsync();
//     }

//     _bootstrapAsync = async () => {
//         const userData = await AsyncStorage.getItem("userData");

//         this.props.navigation.navigate(userData ? "Main" : "Login");
//     };

//     render() {
//         return (
//             <View>
//                 <Text>Loading</Text>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "white",
//     }
// })
// >>>>>>> backend
