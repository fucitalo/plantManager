import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, Text, Image, TouchableOpacity, StyleSheet, Dimensions, View} from 'react-native';
import wateringImg from '../assets/watering.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Welcome(){
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIdentification');
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'} 
                    suas plantas de {'\n'}
                    forma fácil
                </Text>

                <Image 
                    source={wateringImg}
                    style={styles.image}
                    resizeMode='contain'
                ></Image>

                <Text style={styles.subtitle}>
                    Não se esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>
                <TouchableOpacity 
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleStart}
                >
                    <Feather 
                        name="chevron-right"
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1
        
    },
    wrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    title:{
        fontSize: 28,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 48,
        paddingHorizontal: 20,
        lineHeight: 34
    },
    subtitle:{
        fontSize: 18,
        fontFamily: fonts.text,
        textAlign: 'center',
        paddingHorizontal: 20,
        color: colors.heading,
    },
    image:{
        height: Dimensions.get('window').width * 0.7
    },
    button:{
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    buttonIcon:{
        fontSize: 24,
        color: colors.white
    }
})