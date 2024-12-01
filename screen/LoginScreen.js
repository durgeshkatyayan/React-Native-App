import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert, Platform } from 'react-native';
import amazon from '../assets/amazon-512.png';
import Zocial from '@expo/vector-icons/Zocial';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePress = async () => {
        const { email, password } = formData;
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        try {
            const res = await axios.post('http://10.0.2.2:8080/register', formData);
            if (res.data.success) {
                Alert.alert(res.data.message);
                setFormData({})
                navigation.navigate('Register')
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Invalid email or password';
            Alert.alert('Error', errorMessage);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.logo} source={amazon} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <Text style={styles.titleText}>Login to your Account</Text>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Zocial name="email" size={24} color="black" />
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your email..."
                            onChangeText={(value) => handleChange('email', value)}
                            value={formData.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.lockIcon}>🔒</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter your password..."
                            onChangeText={(value) => handleChange('password', value)}
                            value={formData.password}
                            secureTextEntry
                        />
                    </View>
                </View>

                <View style={styles.optionsContainer}>
                    <View style={{ flexDirection: "row", gap: 2 }}>
                        <Text style={styles.keepMeLoggedInText}>Keep me logged in</Text>
                        <Text style={{ color: "blue", textDecorationLine: 'line-through' }} onPress={() => navigation.navigate('Register')}>Sign Up</Text>
                    </View>
                    <Text onPress={() => navigation.navigate('Forget Password')} style={styles.forgotPasswordText}>
                        Forget Password
                    </Text>
                </View>

                <Pressable onPress={handlePress} style={styles.loginButton}>
                    <Text style={styles.loginButtonText}>Login</Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
    },
    imageContainer: {
        marginTop: 20,
    },
    logo: {
        width: 150,
        height: 120,
    },
    keyboardAvoidingView: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#041e42',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 12,
    },
    textInput: {
        marginLeft: 10,
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    lockIcon: {
        fontSize: 24,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    keepMeLoggedInText: {
        color: '#101c26',
        fontWeight: '600',
    },
    forgotPasswordText: {
        color: 'blue',
    },
    loginButton: {
        backgroundColor: '#d8e038',
        paddingVertical: 10,
        marginTop: 30,
        borderRadius: 12,
        alignSelf: 'center',
        width: '50%',
    },
    loginButtonText: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default LoginScreen;
