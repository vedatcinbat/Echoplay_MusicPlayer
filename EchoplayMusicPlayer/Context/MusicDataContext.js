import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Audio } from "expo-av";
import debounce from "lodash.debounce";

const MusicDataContext = createContext();

export const MusicDataProvider = ({ children }) => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(
    "4LA5U2hZsaAqVJeIOvXcip"
  );
  const [musicDatas, setMusicDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [sound, setSound] = useState(null);

  const [playlistOptions] = useState([
    {
      name: "Oldies",
      id: "4LA5U2hZsaAqVJeIOvXcip",
    },
    {
      name: "Japanese",
      id: "0nz3cRJG7ZdCzdWQmIPp56",
    },
    {
      name: "Turkish",
      id: "6anAnZv7sYD6YtLSTf8D7Q",
    },
  ]);

  const [likedSongs, setLikedSongs] = useState({});

  const options = {
    method: "GET",
    url: "https://spotify23.p.rapidapi.com/playlist_tracks/",
    params: {
      id: selectedPlaylistId,
      offset: "0",
      limit: "100",
    },
    headers: {
      "x-rapidapi-key": "2023e6831cmshf8796eed3273854p1156e0jsn17c07cf459e9",
      "x-rapidapi-host": "spotify23.p.rapidapi.com",
    },
  };

  useEffect(() => {
    const fetchMusicDatas = async () => {
      setLoading(true);
      try {
        const response = await axios.request(options);
        const rawData = response.data.items;

        const data = rawData.slice(0, 30).map((item) => ({
          id: item.track.id,
          title: item.track.name,
          artist: item.track.album.artists[0]?.name || "Unknown Artist",
          image: item.track.album.images[0]?.url || "",
          mp3Url: item.track.preview_url,
          duration: item.track.duration_ms,
        }));

        setMusicDatas(data);
      } catch (error) {
        console.error("Error fetching music data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMusicDatas();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [selectedPlaylistId]);

  const playMusic = async (track) => {
    if (!track.mp3Url) {
      console.error("No preview URL available for this track.");
      return;
    }

    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      if (currentTrack?.mp3Url === track.mp3Url) {
        stopMusic();
        return;
      }

      const { sound: newSound } = await Audio.Sound.createAsync({
        uri: track.mp3Url,
      });
      setSound(newSound);
      await newSound.playAsync();
      setCurrentTrack({
        title: track.title,
        artist: track.artist,
        mp3Url: track.mp3Url,
      });
    } catch (error) {
      console.error("Error playing music:", error);
    }
  };

  const stopMusic = async () => {
    if (sound) {
      try {
        await sound.stopAsync();
        await sound.unloadAsync();
      } catch (error) {
        console.error("Error stopping music:", error);
      } finally {
        setSound(null);
        setCurrentTrack(null);
      }
    }
  };

  const debouncedPlayMusic = debounce(playMusic, 300);
  const debouncedStopMusic = debounce(stopMusic, 300);

  const toggleLikeSong = (id) => {
    setLikedSongs((prev) => {
      const playlistLikes = prev[selectedPlaylistId] || [];
      const updatedLikes = playlistLikes.includes(id)
        ? playlistLikes.filter((songId) => songId !== id)
        : [...playlistLikes, id];

      return {
        ...prev,
        [selectedPlaylistId]: updatedLikes,
      };
    });
  };

  return (
    <MusicDataContext.Provider
      value={{
        musicDatas,
        loading,
        currentTrack,
        playMusic,
        stopMusic,
        toggleLikeSong,
        likedSongs: likedSongs[selectedPlaylistId] || [],
        setSelectedPlaylistId,
        selectedPlaylistId,
        playlistOptions,
        debouncedPlayMusic,
        debouncedStopMusic,
      }}
    >
      {children}
    </MusicDataContext.Provider>
  );
};

export const useMusicData = () => useContext(MusicDataContext);
