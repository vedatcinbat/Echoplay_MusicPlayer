import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { useMusicData } from "../Context/MusicDataContext";

const ProfileScreen = ({ navigation, themeStyles }) => {
  const { likedSongs } = useMusicData();
  const [profileData, setProfileData] = useState({
    name: "Vedat Cinbat",
    email: "cinbatvedat@gmail.com",
    profileImage:
      "https://media.licdn.com/dms/image/v2/D4D03AQFHh-riCIVVyA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1699535701039?e=2147483647&v=beta&t=YHZ-4LvLvkj971-kWQjaySI9_2BUb2PyI72aI02VDzQ",
    favMusicCategory: "Pop",
    favMusicConut: likedSongs.length,
  });

  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profileData);

  const saveChanges = () => {
    setProfileData(editedProfile);
    setEditProfileModalVisible(false);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeStyles.backgroundColor },
      ]}
    >
      <Image
        style={styles.profileImage}
        source={{ uri: profileData.profileImage }}
      />
      <Text style={[styles.profileName, { color: themeStyles.color }]}>
        {profileData.name}
      </Text>
      <Text style={[styles.profileEmail, { color: themeStyles.color }]}>
        {profileData.email}
      </Text>
      <Text style={[styles.profileDetail, { color: themeStyles.color }]}>
        Favourite Category: {profileData.favMusicCategory} / Liked Song:{" "}
        {profileData.favMusicConut}
      </Text>

      <TouchableOpacity
        onPress={() => setEditProfileModalVisible(true)}
        style={styles.editProfileButton}
      >
        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <Modal visible={editProfileModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Profile</Text>

            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editedProfile.name}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={editedProfile.email}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, email: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Profile Image URL"
              value={editedProfile.profileImage}
              onChangeText={(text) =>
                setEditedProfile({ ...editedProfile, profileImage: text })
              }
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditProfileModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  profileDetail: {
    fontSize: 12,
    color: "gray",
    marginBottom: 20,
  },
  editProfileButton: {
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  editProfileButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
