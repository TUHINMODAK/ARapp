import React, { useState } from 'react';
import { Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';

import { Divider, Button, Block, Text, Switch } from '../components';
import { theme, mocks } from '../constants';

// Define a type for the profile object
type Profile = {
  username: string;
  location: string;
  avatar: any; // Use appropriate type for the avatar (e.g., ImageSourcePropType)
};

// Define a type for the Settings props
type SettingsProps = {
  profile: Profile;
};

const Settings: React.FC<SettingsProps> = ({ profile: defaultProfile }) => {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [budget, setBudget] = useState(850);
  const [monthly, setMonthly] = useState(1700);
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  const handleEdit = (name: keyof Profile, text: string) => {
    setProfile((prevProfile) => ({ ...prevProfile, [name]: text }));
  };

  const toggleEdit = (name: keyof Profile) => {
    setEditing((prevEditing) => (prevEditing === name ? null : name));
  };

  const renderEdit = (name: keyof Profile) => {
    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={(text) => handleEdit(name, text)}
        />
      );
    }
    return <Text bold>{profile[name]}</Text>;
  };

  return (
    <Block>
      <Block flex={false} row center space="between" style={styles.header}>
        <Text h1 bold>Settings</Text>
        <Button>
          <Image source={profile.avatar} style={styles.avatar} />
        </Button>
      </Block>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Block style={styles.inputs}>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>Username</Text>
              {renderEdit('username')}
            </Block>
            <Text medium secondary onPress={() => toggleEdit('username')}>
              {editing === 'username' ? 'Save' : 'Edit'}
            </Text>
          </Block>
          <Block row space="between" margin={[10, 0]} style={styles.inputRow}>
            <Block>
              <Text gray2 style={{ marginBottom: 10 }}>Location</Text>
              {renderEdit('location')}
            </Block>
            <Text medium secondary onPress={() => toggleEdit('location')}>
              {editing === 'location' ? 'Save' : 'Edit'}
            </Text>
          </Block>
        </Block>

        <Divider margin={[theme.sizes.base, theme.sizes.base * 2]} />

        <Block style={styles.sliders}>
          <Block margin={[10, 0]}>
            <Text gray2 style={{ marginBottom: 10 }}>Budget</Text>
            <Slider
              minimumValue={0}
              maximumValue={1000}
              step={1}
              value={budget}
              onValueChange={setBudget}
              minimumTrackTintColor={theme.colors.secondary}
              maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
            />
            <Text caption gray right>${budget.toFixed(0)}</Text>
          </Block>
        </Block>

        <Divider />

        <Block style={styles.toggles}>
          <Block row center space="between" style={{ marginBottom: theme.sizes.base * 2 }}>
            <Text gray2>Notifications</Text>
            <Switch value={notifications} onValueChange={setNotifications} />
          </Block>
        </Block>
      </ScrollView>
    </Block>
  );
};

Settings.defaultProps = {
  profile: mocks.profile,
};

export default Settings;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: theme.sizes.base * 2,
  },
  avatar: {
    height: theme.sizes.base * 2.2,
    width: theme.sizes.base * 2.2,
  },
  inputs: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  inputRow: {
    alignItems: 'flex-end',
  },
  sliders: {
    marginTop: theme.sizes.base * 0.7,
    paddingHorizontal: theme.sizes.base * 2,
  },
  toggles: {
    paddingHorizontal: theme.sizes.base * 2,
  },
});
