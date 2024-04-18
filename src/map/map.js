import './map.css'
import { MapContainer, TileLayer ,Marker,Popup} from "react-leaflet";
import { Icon } from 'leaflet';

const Map = () => {

  const marker =[
    {
      geocode :[19.1194644, 72.82015990000002],
      popup:"juhu beach"
    },
    {
      geocode :[19.2509, 72.8461],
      popup:"ic colony"
    }
  ]
  const newicon = new Icon({
  iconUrl:require('./mark.png'),
  iconSize:[40,40]
  })
  return (
    <MapContainer
      center={[19.2217,72.8424]}
      zoom={11.5}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {marker.map(marker=>(
        <Marker position={marker.geocode} icon={newicon}>
          <Popup>
            {marker.popup}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
      
    
  );
};

export default Map;