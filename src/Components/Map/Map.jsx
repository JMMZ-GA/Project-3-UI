import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Googleap,
  useLoadScript,
  Marker,
  InfoWindow,
  GoogleMap,
  InfoBox,
} from "@react-google-maps/api";
import { Link } from "react-router-dom";
import "./Map.css";

// const libraries = ["places"];
const mapContainerStyle = {
  width: "75vw",
  height: "100vh",
};

const center = {
  lat: 36.1716,
  lng: -115.1391,
};

const Map = ({
  latLng,
  setLatLng,
  infoLatLng,
  setInfoLatLng,
  setAllPins,
  allPins,
  pinInfo,
  setPinInfo,
}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCZSCr-Wo0SYQZE-cqf0MNFzP9Qat0EYiY",
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={8}
      center={center}
      onClick={(e) => {
        setLatLng({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        });
      }}
      options={{
        styles: [
          {
            elementType: "labels",
            featureType: "poi",
            stylers: [{ visibility: "off" }],
          },
        ],
      }}
    >
      {allPins.map((location, i) => {
        return (
          <Marker
            key={i}
            position={{
              lat: location.lat,
              lng: location.lng,
            }}
            onClick={(e) => {
              setLatLng({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              });
              setInfoLatLng({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
              });
              setPinInfo(location);
            }}
            label={`${i}`}
          ></Marker>
        );
      })}

      {latLng.lat && (
        <InfoWindow
          position={{
            lat: latLng.lat,
            lng: latLng.lng,
          }}
          onCloseClick={() => {
            setLatLng({
              lat: null,
              lng: null,
            });
          }}
        >
          {latLng.lat === infoLatLng.lat && latLng.lat === infoLatLng.lat ? (
            <div>
              <div>{pinInfo.name}</div>
              {pinInfo.address}
              {/* Created By: user */}
              <Link to={`/pins/${pinInfo._id}`}>View More</Link>
            </div>
          ) : (
            <div className="placement">
              <div>
                {/* Would you like to place a marker here at {latLng.lat},{" "} */}
                {/* {latLng.lng}? */}
              </div>
              <div>
                {/* <button>yes</button> */}
                <Link to="/newPin">ADD A PIN</Link>
              </div>
            </div>
          )}
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default Map;