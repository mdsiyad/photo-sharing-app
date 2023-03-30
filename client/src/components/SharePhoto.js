import React, { useEffect, useState, useNavigate } from "react";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import PhotoContainer from "./PhotoContainer";

const SharePhoto = () => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    //👇🏻 This accepts the username from the URL (/share/:user)
    const { user } = useParams();

    useEffect(() => {
        function authenticateUser() {
            const id = localStorage.getItem("id");
            if (!id) {
                navigate("/");
            } else {
                //👇🏻 user - is the username from the profile link
                // socket.emit("sharePhoto", user);
            }
        }
        authenticateUser();

    }, [navigate, user]);

    // useEffect(() => {
    //     socket.on("sharePhotoMessage", (data) => setPhotos(data));
    // }, [socket]);

    return (
        <div>
            <Nav />
            <PhotoContainer photos={photos} />
        </div>
    );
};

export default SharePhoto;