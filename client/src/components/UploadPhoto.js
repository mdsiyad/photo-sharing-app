import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../utils/API";

const UploadPhoto = () => {
  const navigate = useNavigate();
  const [photoURL, setPhotoURL] = useState("");
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoContent, setPhotoContent] = useState("");
  const [isloading, setIsloading] = useState(false);

  const uploadPhoto = async (photoURL, photoTitle, photoContent) => {
    const data = {
      title: photoTitle,
      content: photoContent,
      photo: photoURL,
    };

    try {
      setIsloading(true);
      const response = await API.post("/api/photos/upload",{
        title: photoTitle,
      content: photoContent,
      photo: photoURL,
      });

      setIsloading(false);
      if (response.data.status === 201) {
        
        setIsloading(false);
      }

      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("id");
        localStorage.removeItem("myEmail");

        navigate("/");
      } else if (error.response.status === 400) {
        setIsloading(false);
        console.log(error.response.data.errors[0].msg)
        throw error.response.data.errors[0].msg;
      } 
      else if(error.response.data.error.name === "TokenExpiredError"){
        localStorage.removeItem("id");
        localStorage.removeItem("myEmail");
        toast.error("Session Expired");
        navigate("/");
      }
      
      else {
        setIsloading(false);
        console.log(error.response)
        throw error.response;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      /*
        👇🏻 triggers an event to the server 
        containing the user's image url and information
        */

      const result = await uploadPhoto(photoURL, photoTitle, photoContent);

      toast.success(result.message);
      setPhotoContent("");
      setPhotoTitle("");
      setPhotoURL("");
      navigate("/photos");
    } catch (error) {
      toast.error(error);
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
  }, [navigate]);


  if(isloading){
    return (
        
<div className="loading">
    <img src='/images/loading.gif' alt="loader" width={800} height={500} />

</div>
    )
  }

  return (
    <main className="uploadContainer">
      <div className="uploadText">
        <h2>Share Your Photo</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <label>Topic</label>
          <input
            type="text"
            name="title"
            value={photoTitle}
            onChange={(e) => setPhotoTitle(e.target.value)}
          />

          <label>Write description</label>
          <input
            type="text"
            name="content"
            value={photoContent}
            onChange={(e) => setPhotoContent(e.target.value)}
          />
          <label>Paste the image URL</label>
          <input
            type="text"
            name="fileImage"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />

          <button className="uploadBtn">UPLOAD</button>
        </form>
      </div>
    </main>
  );
};

export default UploadPhoto;
