import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';

// Define the valid email for this example
const VALID_EMAIL = "ARAPP@gmail.com";

interface ForgotState {
  email: string;
  errors: string[];
  loading: boolean;
}

export default class Forgot extends Component<any, ForgotState> {
  state: ForgotState = {
    email: VALID_EMAIL, // Default email
    errors: [], // Array to track validation errors
    loading: false, // Loading state
  };

  // Method to handle forgot password functionality
  handleForgot = () => {
    const { navigation } = this.props;
    const { email } = this.state;
    const errors: string[] = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // Validate email (check with backend API or static value)
    if (email !== VALID_EMAIL) {
      errors.push('email');
    }

    this.setState({ errors, loading: false });

    if (!errors.length) {
      Alert.alert(
        'Password Sent!',
        'Please check your email.',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Error',
        'Please check your email address.',
        [
          { text: 'Try again' },
        ],
        { cancelable: false }
      );
    }
  };

  // Helper function to check for errors
  hasErrors = (key: string): boolean => {
    return this.state.errors.includes(key);
  };

  render() {
    const { navigation } = this.props;
    const { loading, email } = this.state;

    return (
      <KeyboardAvoidingView style={styles.forgot} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold style={styles.title}>Forgot</Text>
          <Block middle>
            <Input
              label="Email"
              error={this.hasErrors('email')}
              style={[styles.input, this.hasErrors('email') && styles.hasErrors]}
              value={email} // Controlled input
              onChangeText={(text: string) => this.setState({ email: text })} // Explicitly type 'text'
              placeholder="Enter your email"
            />
            <Button gradient onPress={this.handleForgot}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>Forgot</Text>
              )}
            </Button>

            <Button onPress={() => navigation.navigate('Login')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  forgot: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop:100,
    color: '#333',
  }
});
