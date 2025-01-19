import React, { Component } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import { StackNavigationProp } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';  
//import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the eye icon

// Define your navigation types
type RootStackParamList = {
  Login: undefined;
  Browse: undefined;
  Forgot: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginProps {
  navigation: LoginScreenNavigationProp;
}

interface LoginState {
  email: string;
  password: string;
  errors: string[];
  loading: boolean;
  showPassword: boolean;  // State to toggle password visibility
}

const VALID_EMAIL = "ARAPP@gmail.com";
const VALID_PASSWORD = "12345";

export default class Login extends Component<LoginProps, LoginState> {
  state: LoginState = {
    email: '',
    password: '',
    errors: [],
    loading: false,
    showPassword: false,  // Initialize as false to hide password initially
  };

  handleLogin = () => {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors: string[] = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email format
    if (!emailRegex.test(email)) {
      errors.push('email');
    }
    // Validate static credentials (replace with API call in production)
    if (email !== VALID_EMAIL) {
      errors.push('email');
    }
    if (password !== VALID_PASSWORD) {
      errors.push('password');
    }

    this.setState({ errors, loading: false });

    if (!errors.length) {
      navigation.navigate("Browse");
    }
  };

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,  // Toggle the password visibility
    }));
  };

  render() {
    const { navigation } = this.props;
    const { loading, errors, email, password, showPassword } = this.state;

    const hasErrors = (key: string) => errors.includes(key); // Return a boolean

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold style={styles.title} >Login</Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors('email')} // This is now a boolean
              style={[styles.input, hasErrors('email') && styles.hasErrors]} // Handle error styling separately
              placeholder="Enter your email"
              value={email} // Use value instead of defaultValue for controlled input
              onChangeText={(text: string) => this.setState({ email: text })} // Explicitly type 'text' as string
            />
            <Input
              secure={!showPassword}  // Toggle password visibility using showPassword state
              label="Password"
              error={hasErrors('password')} // This is now a boolean
              style={[styles.input, hasErrors('password') && styles.hasErrors]} // Handle error styling separately
              placeholder="Enter your password"
              value={password} // Use value instead of defaultValue for controlled input
              onChangeText={(text: string) => this.setState({ password: text })} // Explicitly type 'text' as string
              rightIcon={
                <TouchableOpacity onPress={this.togglePasswordVisibility}>
                  <FontAwesome
                  name={showPassword ? 'eye' : 'eye-slash'} // Use FontAwesome icons
                  size={24}
                  color={theme.colors.gray2}
                  />
                </TouchableOpacity>
              }
              // rightIcon={
              //   <TouchableOpacity onPress={this.togglePasswordVisibility}>
              //     <Icon
              //       name={showPassword ? 'visibility' : 'visibility_off'} // Valid Material Icons
              //       size={24}
              //       color={theme.colors.gray2}
              //     />
              //   </TouchableOpacity>
              // }
            />
            {errors.includes('email') && (
              <Text caption accent>Invalid email or email format.</Text>
            )}
            {errors.includes('password') && (
              <Text caption accent>Invalid password.</Text>
            )}
            <Button gradient onPress={this.handleLogin}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>Login</Text>
              )}
            </Button>

            <Button onPress={() => navigation.navigate('Forgot')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Forgot your password?
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
    padding: 20, // Add consistent padding for the whole page 
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent, // This is now applied through the style prop
  },
  title:{
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 0,
    marginTop:100,
    color: '#333',
  }
});
