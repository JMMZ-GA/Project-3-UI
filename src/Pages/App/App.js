// import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../utils/userService";
import { Routes, Route } from "react-router-dom";

import Home from "../Home/Home";
import Login from "../LoginPage/LoginPage";
import NewPin from "../NewPinPage/NewPinPage";
import PinDetails from "../PinDetailsPage/PinDetailsPage";
import EditPin from "../EditPinPage/EditPinPage";
import Navbar from "../../Components/Navbar/Navbar";
import Signup from "../SignupPage/SignupPage";
import Welcome from "../WelcomePage/WelcomePage";
import { FaWindows } from "react-icons/fa";
import UserPage from "../UserPage/UserPage";
import WithNav from "../Layouts/WithNav";
import WithoutNav from "../Layouts/WithoutNav";

function App() {
  const [user, setUser] = useState(
    JSON.parse(window.sessionStorage.getItem("user")) !== null
      ? JSON.parse(window.sessionStorage.getItem("user"))
      : null
  );

  const [userSignup, setUserSignup] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });

  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });

  const [latLng, setLatLng] = useState({
    lat: "",
    lng: "",
  });
  const [infoLatLng, setInfoLatLng] = useState({
    lat: "",
    lng: "",
  });

  const [allPins, setAllPins] = useState([{}]);

  const [pinInfo, setPinInfo] = useState({
    _id: "",
    name: "",
    address: "",
    city: "",
    lat: null,
    lng: null,
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updatePinState = (id) => {
    setAllPins(allPins.filter((pin) => pin._id !== id));
  };

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  const handleSignupOrLogin = () => {
    setUser(userService.getUser());
  };

  useEffect(() => {
    window.sessionStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    let sessionUser = window.sessionStorage.getItem("user");
    if (sessionUser) setUser(JSON.parse(window.sessionStorage.getItem("user")));
    else setUser(null);
  }, []);

  return (
    <>
      <Routes>
        <Route element={<WithoutNav />}>
          <Route
            path="/login"
            element={
              <Login
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
                setUserLogin={setUserLogin}
                userLogin={userLogin}
                handleSignupOrLogin={handleSignupOrLogin}
              />
            }
          />
        </Route>
        <Route element={<WithoutNav />}>
          <Route
            path="/welcome"
            element={<Welcome user={user} setUser={setUser} />}
          />
        </Route>
        <Route element={<WithoutNav />}>
          <Route
            path="/signup"
            element={
              <Signup
                setUser={setUser}
                setUserSignup={setUserSignup}
                userSignup={userSignup}
                handleSignupOrLogin={handleSignupOrLogin}
              />
            }
          />
        </Route>

        <Route
          element={
            <WithNav
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              user={user}
              setUser={setUser}
              handleLogout={handleLogout}
              userLogin={userLogin}
              setUserLogin={setUserLogin}
            />
          }
        >
          <Route
            path="/"
            element={
              <Home
                allPins={allPins}
                setAllPins={setAllPins}
                user={user}
                latLng={latLng}
                setLatLng={setLatLng}
                infoLatLng={infoLatLng}
                setInfoLatLng={setInfoLatLng}
                pinInfo={pinInfo}
                setPinInfo={setPinInfo}
              />
            }
          />
        </Route>
        <Route
          element={
            <WithNav
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              user={user}
              setUser={setUser}
              handleLogout={handleLogout}
              userLogin={userLogin}
              setUserLogin={setUserLogin}
            />
          }
        >
          <Route
            path="/newpin"
            element={<NewPin latLng={latLng} user={user} />}
          />
        </Route>

        <Route
          element={
            <WithNav
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              user={user}
              setUser={setUser}
              handleLogout={handleLogout}
              userLogin={userLogin}
              setUserLogin={setUserLogin}
            />
          }
        >
          <Route
            path="/pins/:id"
            element={
              <PinDetails
                pinInfo={pinInfo}
                setAllPins={setAllPins}
                setPinInfo={setPinInfo}
                updateCoffeeState={updatePinState}
                user={user}
              />
            }
          />
        </Route>

        <Route
          element={
            <WithNav
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              user={user}
              setUser={setUser}
              handleLogout={handleLogout}
              userLogin={userLogin}
              setUserLogin={setUserLogin}
            />
          }
        >
          <Route
            path={`/pins/edit/${pinInfo._id}`}
            element={
              <EditPin
                pinInfo={pinInfo}
                setPinInfo={setPinInfo}
                latLng={latLng}
              />
            }
          />
        </Route>
        <Route
          element={
            <WithNav
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              user={user}
              setUser={setUser}
              handleLogout={handleLogout}
              userLogin={userLogin}
              setUserLogin={setUserLogin}
            />
          }
        >
          <Route
            path="/user/:id"
            element={
              <UserPage
                allPins={allPins}
                setAllPins={setAllPins}
                user={user}
                latLng={latLng}
                setLatLng={setLatLng}
                infoLatLng={infoLatLng}
                setInfoLatLng={setInfoLatLng}
                pinInfo={pinInfo}
                setPinInfo={setPinInfo}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
