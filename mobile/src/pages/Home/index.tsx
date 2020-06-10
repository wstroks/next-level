import React, { useState, useEffect, ChangeEvent } from 'react';
import { AppLoading } from 'expo';
import { Feather } from '@expo/vector-icons';
import { View, ImageBackground, Image, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import axios from 'axios';

interface IBGEUFResponse {
    sigla: string,
};

interface IBGECityResponse {
    nome: string,
};

const Home = () => {

    const [uf, setUf] = useState<string[]>([]);
    const [city, setCity] = useState<string[]>([]);
    const navagation = useNavigation();

    const [selectedUF, setSelectedUF] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [fontsLoads] = useFonts({
        Roboto_400Regular,
        Roboto_500Medium,
        Ubuntu_700Bold,
    });



    useEffect(() => {
        if (selectedUF === '0') {
            return;
        }

        axios
            .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`)
            .then(response => {
                const names = response.data.map(city => city.nome);

                setCity(names);
            });
    }, [selectedUF]);

    useEffect(() => {
        getUFs();
      }, []);

    if (!fontsLoads) {
        return <AppLoading />;
    }

    function handleNavigationToPoints() {
        navagation.navigate('Points', {
            uf: selectedUF,
            city: selectedCity,
        });
    }

    async function getUFs() {

        const response = await axios.get<IBGEUFResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados");

        const test = response.data.map(uf => uf.sigla);

        setUf(test);

    }

   /* function handleUF(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedUF(event.target.value);
    }

    function handleCity(event: ChangeEvent<HTMLSelectElement>) {
        setSelectedCity(event.target.value);
    };*/

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground
                source={require('../../assets/home-background.png')}
                style={styles.container}
                imageStyle={{ width: 274, height: 368 }}>
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />
                    <View>
                        <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Selecione o estado',
                            value: null,
                        }}
                        items={uf.map(uf => (
                            { label: uf, value: uf }
                        ))}
                        onValueChange={
                            (value) => setSelectedUF(value)
                        }
                        style={pickerStyle}
                        useNativeAndroidPickerStyle={false}
                        value={selectedUF}
                    />

                    <RNPickerSelect
                        placeholder={{
                            label: 'Selecione a cidade',
                            value: null,
                        }}
                        items={city.map(city => (
                            { label: city, value: city }
                        ))}
                        onValueChange={
                            (value) => setSelectedCity(value)
                        }
                        style={pickerStyle}
                        useNativeAndroidPickerStyle={false}
                        value={selectedCity}
                    />
                    <RectButton style={styles.button} onPress={handleNavigationToPoints}>
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Feather name="arrow-right" color="#FFF" size={24} />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>
                            Entrar
                    </Text>
                    </RectButton>
                </View>

            </ImageBackground>
        </KeyboardAvoidingView>

    );
};


const pickerStyle = {
    inputIOS: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
    inputAndroid: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  };
  


export default Home;