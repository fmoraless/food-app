import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
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
import useDimensions from '../hooks/useDimensions';
import CustomInput from '../components/CustomInput';

const SignUpScreen = ({ navigation }) => {
  const { setHeight, setWidth } = useDimensions();
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
        .catch((err) => {});
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
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
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
              onPress={() => navigation.goBack()}
            />
            <Text style={[styles.headerTitle, { width: setWidth(80) }]}>
              Registro
            </Text>
          </View>
          <Text style={styles.title}>Crea una cuenta</Text>
          <Text style={styles.content}>Ingresa tu correo y contraseña</Text>

          <CustomInput
            placeholder="Correo"
            value={email}
            setValue={setEmail}
            keyboardType="email-address"
            iconName="mail"
            error={emailError}
            setError={setEmailError}
          />
          <Separator height={15} />

          <CustomInput
            placeholder="Contraseña"
            value={password}
            setValue={setPassword}
            iconName="lock"
            secureTextEntry
            isPasswordInput={true}
            isPasswordShow={isPasswordShow}
            setIsPasswordShow={setIsPasswordShow}
            error={passwordError}
            setError={setPasswordError}
          />
          <Separator height={15} />

          <CustomInput
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            setValue={setConfirmPassword}
            iconName="lock"
            secureTextEntry
            isPasswordInput={true}
            isPasswordShow={isConfirmationPasswordShow}
            setIsPasswordShow={setIsConfirmationPasswordShow}
            error={confirmPasswordError}
            setError={setConfirmPasswordError}
          />
          <TouchableOpacity
            onPress={onSubmit}
            style={[styles.signInButton, { height: setHeight(6) }]}>
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  signInButton: {
    backgroundColor: Colors.DEFAULT_RED,
    borderRadius: 8,
    marginHorizontal: 20,
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
});

export default SignUpScreen;
