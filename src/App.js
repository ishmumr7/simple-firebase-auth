import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    signOut,
} from "firebase/auth";
import "./App.css";
import initializeAuth from "./firebase/firebase.init";
import { useState } from "react";

initializeAuth();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {
    const [user, setUser] = useState({});

    const handleGoogleSignin = () => {
        const auth = getAuth();
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                };
                setUser(loggedInUser);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
            });
    };

    const handleGithubSignin = () => {
        const auth = getAuth();

        signInWithPopup(auth, githubProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const loggedInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                };
                setUser(loggedInUser);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential =
                    GithubAuthProvider.credentialFromError(error);
                // ...
            });
    };

    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            setUser({});
        });
    };

    return (
        <div className="App">
            {!user.name ? (
                <div>
                    <button onClick={handleGoogleSignin}>Google Sign in</button>
                    <button onClick={handleGithubSignin}>Github Sign in</button>
                </div>
            ) : (
                <button onClick={handleSignOut}>Sign out</button>
            )}
            {user.name && (
                <div>
                    <h2>Welcome {user.name}</h2>
                    <div>Your email: {user.email}</div>
                    <img src={user.photo} alt="" />
                </div>
            )}
        </div>
    );
}

export default App;
