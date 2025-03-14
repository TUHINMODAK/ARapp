import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme } from '../constants';

interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  opacity?: number;
  gradient?: boolean;
  color?: string;
  startColor?: string;
  endColor?: string;
  end?: { x: number; y: number };
  start?: { x: number; y: number };
  locations?: number[];
  shadow?: boolean;
  children?: React.ReactNode;
  [key: string]: any; // for additional props that get spread
}

class Button extends Component<ButtonProps> {
  static defaultProps = {
    startColor: theme.colors.primary,
    endColor: theme.colors.secondary,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    locations: [0.1, 0.9],
    opacity: 0.8,
    color: theme.colors.white,
  };

  render() {
    const {
      style,
      opacity,
      gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      shadow && styles.shadow,
      color && styles[color as keyof typeof styles], // predefined styles colors for backgroundColor
      color && !styles[color as keyof typeof styles] && { backgroundColor: color }, // custom backgroundColor
      style,
    ].filter(Boolean) as StyleProp<ViewStyle>;

    if (gradient) {
      return (
        <TouchableOpacity
          style={buttonStyles}
          activeOpacity={opacity}
          {...props}
        >
          <LinearGradient
            start={start}
            end={end}
            locations={locations}
            style={buttonStyles}
            colors={[startColor!, endColor!]}
          >
            {children}
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity || 0.8}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: theme.sizes.radius,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    marginVertical: theme.sizes.padding / 3,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  accent: { backgroundColor: theme.colors.accent },
  primary: { backgroundColor: theme.colors.primary },
  secondary: { backgroundColor: theme.colors.secondary },
  tertiary: { backgroundColor: theme.colors.tertiary },
  black: { backgroundColor: theme.colors.black },
  white: { backgroundColor: theme.colors.white },
  gray: { backgroundColor: theme.colors.gray },
  gray2: { backgroundColor: theme.colors.gray2 },
  gray3: { backgroundColor: theme.colors.gray3 },
  gray4: { backgroundColor: theme.colors.gray4 },
});

export default Button;