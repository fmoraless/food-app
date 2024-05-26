import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import { StatusBar } from 'expo-status-bar';
import Separator from '../components/Separator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useSignUpMutation } from '../services/authService';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/User/userSlice';
import { signupSchema } from '../../validations/authSchema';
import { insertSession } from '../persistence';

const { height, width } = Dimensions.get('window');
// TODO: extraer a un Hook
const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isConfirmationPasswordShow, setIsConfirmationPasswordShow] =
    useState(false);

  /* States de errores */
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const dispatch = useDispatch();

  const [triggerSignUp, result, isLoading] = useSignUpMutation();

  useEffect(() => {
    if (isLoading) {
      return <FullScreenLoader />;
    }
    if (result?.data && result.isSuccess) {
      insertSession({
        email: result.data.email,
        localId: result.data.localId,
        token: result.data.idToken,
      })
        .then((response) => {
          dispatch(
            setUser({
              email: result.data.email,
              idToken: result.data.idToken,
              localId: result.data.localId,
            }),
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [result]);

  const onSubmit = () => {
    try {
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');
      const validation = signupSchema.validateSync({
        email,
        password,
        confirmPassword,
      });
      triggerSignUp({ email, password, returnSecureToken: true });
    } catch (error) {
      console.log('Error en registro', error);
      console.log('Error path', error.path);
      console.log('Error message', error.message);
      switch (error.path) {
        case 'email':
          setEmailError(error.message);
          break;
        case 'password':
          setPasswordError(error.message);
          break;
        case 'confirmPassword':
          setConfirmPasswordError(error.message);
          break;

        default:
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.DEFAULT_WHITE}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        <Ionicons
          name="chevron-back-outline"
          size={30}
          onPress={() => console.log('boton-back-outline')}
        />
        <Text style={styles.headerTitle}>Registro</Text>
      </View>
      <Text style={styles.title}>Crea una cuenta</Text>
      <Text style={styles.content}>Ingresa tu correo y contraseña</Text>
      <View>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <Feather
              name="mail"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              placeholder="Correo"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>
        <Text style={styles.textError}>{emailError}</Text>
      </View>
      <Separator height={15} />
      <View>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <Feather
              name="lock"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              secureTextEntry={isPasswordShow ? false : true}
              placeholder="Contraseña"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
              value={password}
              onChangeText={setPassword}
            />
            <Feather
              name={confirmPassword ? 'eye' : 'eye-off'}
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
              onPress={() => setIsPasswordShow(!isPasswordShow)}
            />
          </View>
        </View>
        <Text style={styles.textError}>{passwordError}</Text>
      </View>
      <Separator height={15} />
      <View>
        <View style={styles.inputContainer}>
          <View style={styles.inputSubContainer}>
            <Feather
              name="lock"
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
            />
            <TextInput
              secureTextEntry={isConfirmationPasswordShow ? false : true}
              placeholder="Confirmar Contraseña"
              placeholderTextColor={Colors.DEFAULT_GREY}
              selectionColor={Colors.DEFAULT_GREY}
              style={styles.inputText}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Feather
              name={isConfirmationPasswordShow ? 'eye' : 'eye-off'}
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
              onPress={() =>
                setIsConfirmationPasswordShow(!isConfirmationPasswordShow)
              }
            />
          </View>
        </View>
        <Text style={styles.textError}>{confirmPasswordError}</Text>
      </View>
      <TouchableOpacity onPress={onSubmit} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Registrar</Text>
      </TouchableOpacity>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>¿Ya tienes una cuenta?</Text>
        <Text
          style={styles.bottomTextLogin}
          onPress={() => navigation.navigate('Login')}>
          Ingresar
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20 * 1.4,
    width: setWidth(80),
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20 * 1.4,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GREY,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GREY2,
    justifyContent: 'center',
  },
  inputSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: 'center',
    padding: 0,
    height: setHeight(6),
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  signInButton: {
    backgroundColor: Colors.DEFAULT_RED,
    borderRadius: 8,
    marginHorizontal: 20,
    height: setHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInButtonText: {
    fontSize: 18,
    lineHeight: 18 * 1.4,
    color: Colors.DEFAULT_WHITE,
    fontFamily: 'Poppins-Medium',
  },
  bottomTextContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
  bottomTextLogin: {
    fontSize: 15,
    fontFamily: 'Poppins-Bold',
  },
  textError: {
    marginStart: 20,
    marginTop: 5,
    fontSize: 15,
    fontFamily: 'Poppins-Thin',
    color: Colors.DEFAULT_RED,
  },
});

export default SignUpScreen;
