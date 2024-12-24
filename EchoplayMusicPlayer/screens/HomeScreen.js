import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMusicData } from "../Context/MusicDataContext";

const HomeScreen = ({ themeStyles }) => {
  const {
    musicDatas,
    loading,
    currentTrack,
    likedSongs,
    toggleLikeSong,
    debouncedStopMusic,
    debouncedPlayMusic,
  } = useMusicData();

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: themeStyles.backgroundColor },
        ]}
      >
        <ActivityIndicator size="large" color={themeStyles.color} />
        <Text style={[styles.loadingText, { color: themeStyles.color }]}>
          Loading Music...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <Text style={[styles.title, { color: themeStyles.color }]}>
        Spotify Playlist Tracks
      </Text>
      <FlatList
        data={musicDatas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.musicItem}>
            <Image source={{ uri: item.image }} style={styles.musicImage} />
            <View style={styles.musicDetails}>
              <Text style={[styles.musicTitle]}>{item.title}</Text>
              <Text
                style={[
                  styles.musicArtist,
                  { color: themeStyles.subTextColor },
                ]}
              >
                {item.artist}
              </Text>
              <View style={styles.actionButtons}>
                {/* Play/Stop Button */}
                <TouchableOpacity
                  style={[
                    styles.playButton,
                    {
                      backgroundColor: item.mp3Url
                        ? currentTrack?.mp3Url === item.mp3Url
                          ? "#FF0000"
                          : "#007BFF"
                        : "#ccc",
                    },
                  ]}
                  onPress={() =>
                    item.mp3Url
                      ? currentTrack?.mp3Url === item.mp3Url
                        ? debouncedStopMusic()
                        : debouncedPlayMusic(item)
                      : null
                  }
                  disabled={!item.mp3Url}
                >
                  <Text style={styles.playButtonText}>
                    {item.mp3Url
                      ? currentTrack?.mp3Url === item.mp3Url
                        ? "Stop"
                        : "Play"
                      : "No Preview"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => toggleLikeSong(item.id)}
                  style={styles.likeButton}
                >
                  <Ionicons
                    name={
                      likedSongs.includes(item.id) ? "heart" : "heart-outline"
                    }
                    size={30}
                    color={likedSongs.includes(item.id) ? "tomato" : "gray"}
                  />
                  <Text
                    style={[
                      styles.likeText,
                      {
                        color: likedSongs.includes(item.id) ? "tomato" : "gray",
                      },
                    ]}
                  >
                    {likedSongs.includes(item.id) ? "Unlike" : "Like"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  loadingText: {
    fontSize: 16,
    marginTop: 10,
  },
  musicItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
  },
  musicImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  musicDetails: {
    flex: 1,
    marginLeft: 10,
  },
  musicTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  musicArtist: {
    fontSize: 14,
    color: "#666",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  playButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  playButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  likeButton: {
    alignItems: "center",
  },
  likeText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 5,
  },
});

export default HomeScreen;
