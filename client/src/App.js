import { BrowserRouter, Routes, Route } from "react-router-dom";
import Photos from "./components/Photos";
import Login from "./components/Login";
import Register from "./components/Register";
import UploadPhoto from "./components/UploadPhoto";
import MyPhotos from "./components/MyPhotos";
import SharePhoto from "./components/SharePhoto";
//👇🏻 React Toastify configuration
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logout from "./components/logout";

// import { io } from "socket.io-client";

function App() {
  // const socket = io.connect("http://localhost:4000");  
  

  return (
    <div className="App">
      <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login  />} />
                    <Route path='/register' element={<Register  />} />
                    <Route path='/photos' element={<Photos  />} />
                    <Route
                        path='/photo/upload'
                        element={<UploadPhoto  />}
                    />
                    <Route path='/user/photos' element={<MyPhotos  />} />
                    <Route path='/user/logout' element={<Logout  />} />
                    <Route path='/share/:user' element={<SharePhoto  />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    </div>
  );
}

export default App;
