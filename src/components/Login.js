import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { auth } from '../utils/firebase'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';



const Login = () => {
    const dispatch = useDispatch();
    const [isSignInForm, setSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);
    const navigate = useNavigate();

    const toggleSignInForm = () => {
        setSignInForm(!isSignInForm);
    };

    const handleButtonClick = () => {
        //validate for data

        let message;
        if (isSignInForm) {
            message = checkValidData(email.current.value, password.current.value);
        } else {
            message = checkValidData(email.current.value, password.current.value, name.current.value);
        }
        setErrorMessage(message);

        if (message) return;

        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 

                    const user = userCredential.user;

                    
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
                      }).then(() => {
                        // Profile updated!
                        const {uid, email, displayName} = auth.currentUser;
                        dispatch(addUser({uid: uid, email:email, displayName: displayName}));
                        navigate("/browse");
                        // ...sa
                      }).catch((error) => {
                        // An error occurred
                        // ...
                      });


                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                    // ..
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    navigate("/browse");
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }

    };

    return (
        <div>
            <Header />
            <div className="relative">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/cacfadb7-c017-4318-85e4-7f46da1cae88/e43aa8b1-ea06-46a5-abe3-df13243e718d/IN-en-20240603-popsignuptwoweeks-perspective_alpha_website_small.jpg"
                    className="w-full h-auto"
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="absolute p-8 sm:p-12 bg-black my-20 sm:my-36 mx-auto w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 text-white bg-opacity-80 rounded-lg left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 lg:left-1/2 lg:translate-x-0 lg:-translate-y-1/2 lg:left-[35%] lg:-translate-x-[50%]"
            >
                <h1 className="font-bold text-2xl sm:text-3xl py-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && (
                    <input
                        type="text"
                        ref={name}
                        placeholder="Full Name"
                        className="p-4 my-2 sm:my-4 w-full bg-gray-800"
                    />
                )}
                <input
                    type="text"
                    ref={email}
                    placeholder="Email Address"
                    className="p-4 my-2 sm:my-4 w-full bg-gray-800"
                />
                <input
                    type="password"
                    ref={password}
                    placeholder="Password"
                    className="p-4 my-2 sm:my-4 w-full bg-gray-800"
                />
                <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
                <button
                    className="p-4 my-4 bg-red-700 w-full rounded-lg"
                    onClick={handleButtonClick}
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="p-4 my-4 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
                </p>
            </form>
        </div>
    );


}

export default Login