import React, { useState, useRef, useEffect } from "react";
import '../styles/form.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2x0ZWphc3dpIiwiYSI6ImNsOXc1cDNwYjB3czczb256NTd2c2JuemIifQ.b-VwjCpfeG3aR2A8yux1zQ';

export default function MapRender(props) {
    const ref = useRef(null);
    const [map, setMap] = useState(null);
    useEffect(() => {
      if (ref.current && !map) {
        const map = new mapboxgl.Map({
          container: ref.current,
          style: "mapbox://styles/mapbox/streets-v11",
          center: [props.lng || 0, props.lat || 0],
          zoom: 10
        });
        setMap(map);
      }

      if(map){
  const marker = new mapboxgl.Marker({
    color: "#FF0000"
}).setLngLat([props.lng || 0, props.lat || 0])
  .addTo(map);
      }


    }, [ref, map]);
    return <div className="map-container" ref={ref} />;
  }