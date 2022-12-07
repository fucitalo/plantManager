import React, { useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, Image, Alert} from 'react-native';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import WaterDrop from '../assets/waterdrop.png';
import { FlatList } from 'react-native-gesture-handler';
import { plantLoad, PlantProps, removePlant, StoragePlantProps } from '../libs/Storage';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    function handleRemove(plant: PlantProps){
        Alert.alert('Remover',`Deseja remover a ${plant.name}?`,[
            {
                text: 'Não',
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    try {
                        await removePlant(plant.id);
                        setMyPlants((oldData) => 
                        oldData.filter((item) => item.id != plant.id)
                    );
                    } catch (error) {
                        Alert.alert('Não foi possível remover.');
                    }
                } 
            }
        ])
    }

    useEffect(()=>{
        async function loadStoragedData() {
            const plantsStoraged = await plantLoad();
            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: ptBR}
            );

            setNextWatered(`Não se esqueça de regar a ${plantsStoraged[0].name} em ${nextTime}.`);
            setMyPlants(plantsStoraged);
            setLoading(false);
        }

        loadStoragedData();
    },[]);


    if(loading)
        return <Load/>
    return(
        <View style={styles.container}>
            <Header/>
            <View style={styles.spotlight}>
                <Image
                    source={WaterDrop}
                    style={styles.spotlightImage}
                ></Image>
                <Text style={styles.spotlightText}>
                    {nextWatered} 
                </Text>
            </View>
            <View style={styles.plant}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecondary
                          data={item}
                          handleRemove={() => {
                            handleRemove(item);
                          }}
                        />
                      )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30, 
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage:{
        width: 60,
        height: 60
    },
    spotlightText:{
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,

    },
    plant:{
        flex: 1,
        width: '100%',
        justifyContent: 'center'     
    },
    plantsTitle:{
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }

})