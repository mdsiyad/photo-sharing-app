import React, { useEffect } from "react";
import { MdOutlineArrowUpward, MdBookmarkBorder } from "react-icons/md";
import { toast } from "react-toastify";

const PhotoContainer = ({ photos }) => {
    const handleUpvote = (id) => {
        // socket.emit("photoUpvote", {
        //     userID: localStorage.getItem("_id"),
        //     photoID: id,
        // });
    };


    // useEffect(() => {
    //     socket.on("upvoteSuccess", (data) => {
    //         toast.success(data.message);
    //         //👇🏻 logs the email of the user who owns the image.
    //         console.log(data.item[0]._ref);
    //     });
    //     socket.on("upvoteError", (data) => {
    //         toast.error(data.error_message);
    //     });
    // }, [socket]);

    

    return (
        <main className='photoContainer'>
            {photos ? photos.map((photo) => (
                <div className='photo' key={photo.id}>
                    <div className='imageContainer'>
                        <img
                            src={photo.photo}
                            alt={photo.id}
                            className='photo__image'
                        />
                    </div>

                    <button className='upvoteIcon' onClick={() => handleUpvote(photo.id)}>
                        <MdBookmarkBorder color="#e5a3a3"
                            style={{ fontSize: "25px", marginBottom: "5px", color:"#e5a3a3" }}
                        />
                        <p style={{ fontSize: "12px", color: "#ce7777" }}>
                            {photo.id}
                        </p>
                    </button>
                </div>
            )): null}
        </main>
    );
};

export default PhotoContainer;