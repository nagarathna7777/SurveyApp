import React, { useState,useCallback, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet ,Image} from 'react-native';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

 
  const clearFields = () => {
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      clearFields();
    });

    return unsubscribe;
  }, [props.navigation]);

  const handleLogin = () => {
    if (email === 'shammi@voltuswave.com' && password === 'Apple#123'||email === 'sasi@voltuswave.com' && password === 'Apple#123' ||email === 'amrutha@vulcansbuild.com' && password === 'Apple#123'||email=='a') {
      props.navigation.navigate('Home');
    } else {
      alert('Invalid email or password');
      clearFields();
    }
  };
  
  return (
    <View style={styles.container}>
      <Image source={require('../Assets/vbtwinLogo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
       <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity style={styles.showHideContainer} onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showHideText}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
      },
      input: {
        width: '100%',
        height: 50,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 20,
      },
      button: {
        width: '100%',
        height: 50,
        backgroundColor: '#19B394',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
      logo: {
        width: 70,
        height: 70,
        marginBottom: 20,
      },
      passwordContainer: {
        position: 'relative',
        width: '100%',
      },
      passwordInput: {
        width: '100%',
        height: 50,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        marginBottom: 20,
      },
      showHideContainer: {
        position: 'absolute',
        right: 10,
        top: 15,
      },
      showHideText: {
        color: '#007BFF',
        fontSize: 13,
      },
});

export default Login;
