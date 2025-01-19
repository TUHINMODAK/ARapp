import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  Forgot: undefined;
  Browse: undefined;
  Explore: undefined;
  FormPage: {
    detectedColor :string;
  };
  Product: undefined;
  ResultPage: { 
    dimensions: string; 
    roomType: string; 
    furnitureType: string;
    detectedColor: string; // Added detectedColor to ResultPage parameters
  };
  Settings: undefined;
  Cam: undefined;
  SofaDetails: { 
    id: string; 
    categoryName?: string;
  };
  Sofa1: { 
    category: {
      name: string;
      // Add other category properties as needed
    };
  };
  ARscene: { 
    variantName: string;
  };
};

// Navigation prop type for screens
export type RootStackNavigationProp<T extends keyof RootStackParamList> = 
  StackNavigationProp<RootStackParamList, T>;

// Route prop type for screens
export type RootStackRouteProp<T extends keyof RootStackParamList> = 
  RouteProp<RootStackParamList, T>;
