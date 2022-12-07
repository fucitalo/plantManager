import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, Image, TouchableOpacity, TouchableOpacityProps, StyleSheet, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import userimg from '../../assets/out.png';

export function Header(){
    const [userName, setUserName] = useState<string>();
    useEffect(()=>{
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');  
        }
        
        loadStorageUserName();
    },[userName])

    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <Image 
                source={userimg}
                style={styles.image}
            ></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection:  'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: getStatusBarHeight() + 10,
        marginBottom: 10
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 40
    },
    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40
    }
});