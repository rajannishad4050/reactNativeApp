/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Button,
  useColorScheme,
  View,
  Pressable,
  Linking,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RNUpiPayment from 'react-native-pay-by-upi';

function App() {
  const [amount, onChangeAmount] = useState('');
  const [transaction, setTransaction] = useState('0');

  const onClickPay = () => {
    if (typeof parseInt(amount) === 'number' && amount.length > 0) {
      RNUpiPayment.initializePayment(
        {
          vpa: '8178976507@ybl', // or can be john@ybl or mobileNo@upi
          payeeName: 'rajan',
          amount,
          transactionRef: 'aasf-332-aoei-fn',
        },
        successCallback,
        failureCallback,
      );
    }
  };

  function successCallback(data) {
    setTransaction('success');
  }

  function failureCallback(data) {
    if (!data.message === 'No action taken') {
      setTransaction('failed');
    }
  }

  return (
    <SafeAreaView style={styles.sectionContainer}>
      {transaction === 'success' ? (
        <View style={styles.successContainer}>
          <Text style={styles.textWhite}>Success</Text>
        </View>
      ) : null}
      {transaction === 'failed' ? (
        <View style={styles.failureContainer}>
          <Text style={styles.textWhite}>Failed</Text>
        </View>
      ) : null}
      <View style={styles.inputContainer}>
        <Text style={{fontSize: 24}}>₹</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeAmount}
          value={amount}
          placeholder="amount"
          keyboardType="numeric"
        />
      </View>
      <View>
        <Pressable style={styles.button} onPress={onClickPay}>
          <Text style={styles.text}>Pay</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 50,
  },

  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60,
  },

  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  successContainer: {
    backgroundColor: 'green',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },

  failureContainer: {
    backgroundColor: 'red',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },

  textWhite: {
    color: 'white',
  },
});

export default App;
