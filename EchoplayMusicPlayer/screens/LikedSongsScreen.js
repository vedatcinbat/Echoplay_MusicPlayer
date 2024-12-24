import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useMusicData } from "../Context/MusicDataContext";
import { Ionicons } from "@expo/vector-icons";

const LikedSongsScreen = ({ themeStyles }) => {
  const {
    likedSongs,
    debouncedPlayMusic,
    debouncedStopMusic,
    stopMusic,
    currentTrack,
    toggleLikeSong,
    musicDatas,
  } = useMusicData();

  const likedSongsList = musicDatas.filter((song) =>
    likedSongs.includes(song.id)
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <Text style={[styles.title, { color: themeStyles.color }]}>
        Your Liked Songs
      </Text>
      {likedSongsList.length === 0 ? (
        <Text style={[styles.noLikedSongsText, { color: themeStyles.color }]}>
          No liked songs yet!
        </Text>
      ) : (
        <FlatList
          data={likedSongsList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.musicItem}>
              <Image source={{ uri: item.image }} style={styles.musicImage} />
              <View style={styles.musicDetails}>
                <Text style={[styles.musicTitle]}>
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.musicArtist,
                    { color: themeStyles.subTextColor },
                  ]}
                >
                  {item.artist}
                </Text>
                <View style={styles.actionButtons}>
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
                      size={24}
                      color={
                        likedSongs.includes(item.id) ? "tomato" : themeStyles.color
                      }
                    />
                    <Text
                      style={[
                        styles.likeText,
                        {
                          color: likedSongs.includes(item.id)
                            ? "tomato"
                            : themeStyles.color,
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
      )}
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
  noLikedSongsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
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
    justifyContent: "space-between",
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
    justifyContent: "center",
  },
  likeText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default LikedSongsScreen;
