import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import PhotoContainer from "./PhotoContainer";
import { toast } from "react-toastify";
import { API } from "../utils/API";

const Home = ({ socket }) => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);



    const getPhotos = async (user) => {
        API.defaults.withCredentials = true;
        try {
          const response = await API.get(
            "/api/photos",
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
            }
        }
        authenticateUser();
        getPhotos();

    }, []);

    // useEffect(() => {
    //     socket.emit("allPhotos", "search");
    //     //👇🏻 retrieve all the images from the server
    //     socket.on("allPhotosMessage", (data) => {
    //         setPhotos(data.photos);
    //     });
    // }, [socket]);

    return (
        <div>
            <Nav />
            <PhotoContainer photos={photos} />
        </div>
    );
};

export default Home;