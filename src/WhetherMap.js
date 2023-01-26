import React from 'react'
import { useState, useEffect } from 'react';
import {  MapContainer as Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const WhetherMap = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [pg,setpg]=useState('1');
    const paging=(page)=>{
        setpg(page);
    }
  
    useEffect(() => {
        fetch(`https://mapbackend-8equ.onrender.com/weather`)
        .then(res => res.json())
        .then(data => {
            setWeatherData(data);
            console.log(data);
        })
        
        .catch(err => console.log(err));
       const interval = setInterval(() => {
        fetch(`https://mapbackend-8equ.onrender.com/weather`)
        .then(res => res.json())
        .then(data => {
            setWeatherData(data);
            console.log(data);
        })
        
        .catch(err => console.log(err));
       }, 10*60*1000);
       return ()=>clearInterval(interval)
    }, []);



  return (
<div >
<Map style={{width:"1000px",height:"700px"}} center={[40, -100]} zoom={4}>
    <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {weatherData.map(city => (
        <Marker
            key={city.id}
            position={[city.coord.lat, city.coord.lon]}
            icon={new L.Icon({
                iconUrl: `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`,
                iconSize: [50, 50],
                iconAnchor: [25, 25],
                popupAnchor: [0, -25]
            })}
        >
            <Popup>
                <h3>{city.name}</h3>
                <p>Temperature: {city.main.temp}°C</p>
                <p>Weather: {city.weather[0].description}</p>
            </Popup>
        </Marker>
    ))}
</Map>
<div>


</div>

</div>
  )
}

export default WhetherMap
