// Firebase initialization (Replace with your config)
const firebaseConfig = {
  apiKey: "AIzaSyAeOS8_0tDWKnfAwLf0GRKr6JaopYj1nnY",
  authDomain: "dormdash-40a10.firebaseapp.com",
  projectId: "dormdash-40a10",
  storageBucket: "dormdash-40a10.firebasestorage.app",
  messagingSenderId: "219135353050",
  appId: "1:219135353050:web:49446a2e74414ebf8105e3"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();

// Check if user is logged in and load profile
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById("user-email").innerText = user.email;
        document.getElementById("display-name").value = user.displayName || "";
        if (user.photoURL) {
            document.getElementById("profile-pic").src = user.photoURL;
        }
    } else {
        window.location.href = "https://dormdash1login.netlify.app/"; // Redirect to login if not logged in
    }
});

// Update Profile Name
document.getElementById("update-profile-btn").addEventListener("click", () => {
    const newName = document.getElementById("display-name").value;
    const user = auth.currentUser;

    user.updateProfile({
        displayName: newName
    }).then(() => {
        alert("Profile updated successfully!");
    }).catch(error => {
        console.error("Error updating profile:", error);
    });
});

// Upload and Update Profile Picture
document.getElementById("profile-pic-input").addEventListener("change", event => {
    const file = event.target.files[0];
    if (!file) return;

    const user = auth.currentUser;
    const storageRef = storage.ref(`profile_pictures/${user.uid}`);
    
    storageRef.put(file).then(snapshot => {
        return snapshot.ref.getDownloadURL();
    }).then(downloadURL => {
        return user.updateProfile({
            photoURL: downloadURL
        });
    }).then(() => {
        document.getElementById("profile-pic").src = auth.currentUser.photoURL;
        alert("Profile picture updated!");
    }).catch(error => {
        console.error("Error uploading profile picture:", error);
    });
});

// Logout Function
document.getElementById("logout-btn").addEventListener("click", () => {
    auth.signOut().then(() => {
        window.location.href = "https://dormdash1login.netlify.app/"; // Redirect to login
    }).catch(error => {
        console.error("Logout Error:", error);
    });
});
