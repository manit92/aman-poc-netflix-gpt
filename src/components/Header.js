import React from 'react'
import { auth } from '../utils/firebase'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';


const Header = () => {
    const navigate = useNavigate();
    const user = useSelector(store => store.user)

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
        }).catch((error) => {
            // An error happened.
        });
    };


    return (
        <div className="absolute top-0 left-0 w-full px-4 py-2 bg-gradient-to-b from-black z-10 sm:px-8 sm:py-4 md:px-12 md:py-6 lg:px-16 lg:py-8 flex justify-between">

            <img
                src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt="logo"
                className="w-24 sm:w-32 md:w-40 lg:w-48"
            />
            {user && (
                <div className='flex p-2'>

                    <img
                        src="https://occ-0-6246-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABRhunw1-HwxU3HlvmFM9UycO_VOxatA9nWQ4aaCKTCxOVOv5OchUTFO6RJznhN4G2scAmgXUpHzkkVdq9_8f9ui0RksluPFA3w.png?r=229"
                        alt="user-icon"
                        className="w-12 h-12"
                    />
                    <button className='text-white font-bold' onClick={handleSignOut}> Sign Out</button>
                </div>
            )

            }





        </div>
    );

}

export default Header