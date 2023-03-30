import React, { useEffect, useState } from "react";
//👇🏻 React Router configs
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PhotoContainer from "./PhotoContainer";
//👇🏻 React-copy-to-clipboard config
import { API } from "../utils/API";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
const MyPhotos = () => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const [userLink, setUserLink] = useState("");

    //👇🏻 navigates users to the homepage (for now)
    const handleSignOut = () => {
        localStorage.removeItem("id");
        localStorage.removeItem("myEmail");
        navigate("/");
    };

    //👇🏻 This function runs immediately the content is copied
    const copyToClipBoard = () => alert(`Copied ✅`);
//👇🏻 This function fetch user images
    const getMyPhotos = async (user) => {
        API.defaults.withCredentials = true;
        try {
          const response = await API.get(
            "/api/photos/myPhotos",
          );

          const { photos } = await response.data;
          setPhotos(photos)

          // return response;
        } catch (error) {

          if(error.response.status === 401){
            localStorage.removeItem("id");
            localStorage.removeItem("myEmail");
            navigate("/");
          } else if(error.response.data.error.name === "TokenExpiredError"){
            localStorage.removeItem("id");
            localStorage.removeItem("myEmail");
            toast.error("Session Expired");
            navigate("/");
          }

        }
      };


    useEffect(() => {
        
        function authenticateUser() {
            const id = localStorage.getItem("id");
            /*
            👇🏻 If ID is false, redirects the user to the login page
            */

            if (!id) {
                navigate("/");
            } else {
                getMyPhotos(id)
                //👇🏻 sends the user id to the server
                // socket.emit("getMyPhotos", id);
            }


            

            
        }
        authenticateUser();

    }, [navigate]);

  
    return (
        <div>
            <nav className='navbar'>
                <h3>PhotoShare</h3>

                <div className='nav__BtnGroup'>
                    <Link to='/photo/upload'>Upload Photo</Link>
                    <button  onClick={handleSignOut}>Sign out</button>
                </div>
            </nav>

            <div className='copyDiv'>
                <CopyToClipboard
                    text={userLink}
                    onCopy={copyToClipBoard}
                    className='copyContainer'
                >
                    <span className='shareLink'>Copy your share link</span>
                </CopyToClipboard>
            </div>

            <PhotoContainer  photos={photos} />
        </div>
    );
};

export default MyPhotos;