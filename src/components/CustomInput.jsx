import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../constants/Colors';
import useDimensions from '../hooks/useDimensions';

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  keyboardType,
  iconName,
  isPasswordInput,
  isPasswordShow,
  setIsPasswordShow,
  error,
  setError,
}) => {
  const { setHeight, setWidth } = useDimensions();

  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Feather
            name={iconName}
            size={22}
            color={Colors.DEFAULT_GREY}
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.DEFAULT_GREY}
            selectionColor={Colors.DEFAULT_GREY}
            style={[styles.inputText, { height: setHeight(6) }]}
            keyboardType={keyboardType}
            value={value}
            onChangeText={setValue}
            secureTextEntry={secureTextEntry && !isPasswordShow}
          />
          {isPasswordInput && (
            <Feather
              name={isPasswordShow ? 'eye' : 'eye-off'}
              size={22}
              color={Colors.DEFAULT_GREY}
              style={{ marginRight: 10 }}
              onPress={() => setIsPasswordShow(!isPasswordShow)}
            />
          )}
        </View>
      </View>
      <Text style={styles.textError}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
    color: Colors.DEFAULT_BLACK,
    flex: 1,
  },
  textError: {
    marginStart: 20,
    marginTop: 5,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: Colors.DEFAULT_RED,
  },
});

export default CustomInput;
