import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import LikedSongsScreen from "./screens/LikedSongsScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider, useTheme } from "./Context/ThemeContext";
import { MusicDataProvider, useMusicData } from "./Context/MusicDataContext";

const Tab = createBottomTabNavigator();

const NowPlayingBar = ({ currentTrack, themeStyles, stopMusic }) => {
  if (!currentTrack) return null;

  return (
    <View
      style={[
        styles.nowPlayingBar,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <Text style={[styles.nowPlayingText, { color: themeStyles.color }]}>
        {currentTrack.title} - {currentTrack.artist}
      </Text>
      <TouchableOpacity onPress={stopMusic}>
        <Ionicons name="stop-circle" size={30} color={themeStyles.color} />
      </TouchableOpacity>
    </View>
  );
};

const AppContent = () => {
  const { isDarkTheme } = useTheme();
  const { currentTrack, stopMusic } = useMusicData();

  const themeStyles = {
    backgroundColor: isDarkTheme ? "#121212" : "#FFFFFF",
    color: isDarkTheme ? "#FFFFFF" : "#000000",
  };

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline";
                } else if (route.name === "LikedSongs") {
                  iconName = focused ? "heart" : "heart-outline";
                } else if (route.name === "Settings") {
                  iconName = focused ? "settings" : "settings-outline";
                } else if (route.name === "Profile") {
                  iconName = focused ? "person" : "person-outline";
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
              tabBarStyle: {
                backgroundColor: themeStyles.backgroundColor,
              },
              tabBarLabelStyle: {
                color: themeStyles.color,
              },
            })}
          >
            <Tab.Screen name="Home">
              {(props) => <HomeScreen {...props} themeStyles={themeStyles} />}
            </Tab.Screen>
            <Tab.Screen name="LikedSongs">
              {(props) => (
                <LikedSongsScreen {...props} themeStyles={themeStyles} />
              )}
            </Tab.Screen>
            <Tab.Screen name="Profile">
              {(props) => (
                <ProfileScreen {...props} themeStyles={themeStyles} />
              )}
            </Tab.Screen>
            <Tab.Screen name="Settings">
              {(props) => (
                <SettingsScreen {...props} themeStyles={themeStyles} />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
        {/* Bar that shows currently playing song: SongTitle, SongArtist, MP3 file (AV) */}
        <View style={currentTrack != null && styles.nowPlayingBarContainer}>
          <NowPlayingBar
            currentTrack={currentTrack}
            themeStyles={themeStyles}
            stopMusic={stopMusic}
          />
        </View>
      </View>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <MusicDataProvider>
        <AppContent />
      </MusicDataProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
  },
  nowPlayingBarContainer: {
    flex: 1,
    backgroundColor: "red",
    position: "absolute",
    elevation: 5,
    position: "absolute",
    padding: 4,
    borderRadius: 10,
    bottom: 50,
    left: 0,
    right: 0,
  },
  nowPlayingBar: {
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  nowPlayingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    flex: 1,
    marginRight: 10,
  },
});
