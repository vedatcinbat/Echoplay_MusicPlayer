import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../Context/ThemeContext";
import { useMusicData } from "../Context/MusicDataContext";

const SettingsScreen = ({ themeStyles }) => {
  const { isDarkTheme, toggleTheme } = useTheme();
  const { setSelectedPlaylistId, selectedPlaylistId, playlistOptions } = useMusicData();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <Text style={[styles.title, { color: themeStyles.color }]}>Settings</Text>
      <Text style={[styles.subtitle, { color: themeStyles.color }]}>
        Current Theme: {isDarkTheme ? "Dark" : "Light"}
      </Text>

      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>
          Switch to {isDarkTheme ? "Light" : "Dark"} Theme
        </Text>
      </TouchableOpacity>

      <Text style={[styles.dropdownLabel, { color: themeStyles.color }]}>
        Select a Playlist:
      </Text>
      <View style={[styles.dropdown, { borderColor: themeStyles.color }]}>
        <Picker
          selectedValue={selectedPlaylistId}
          onValueChange={(itemValue) => setSelectedPlaylistId(itemValue)}
          style={[styles.picker]}
          dropdownIconColor={themeStyles.color}
        >
          {playlistOptions.map((playlist) => (
            <Picker.Item
              key={playlist.id}
              label={playlist.name}
              value={playlist.id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdown: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
  },
  picker: {
    height: 50,
    width: "100%",
  },
});

export default SettingsScreen;
