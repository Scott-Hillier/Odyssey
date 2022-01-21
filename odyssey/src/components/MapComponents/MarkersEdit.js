import { useMapEvents } from "react-leaflet";
import { useContext } from "react";
import { mapContext } from "../providers/MapProvider";
import { useEffect } from "react";
import SingleMarkerEdit from "./SingleMarkerEdit";
import MarkerForm from "./MarkerForm";

function MarkersEdit(props) {

  const thisMap = useMapEvents({
    click: (e) => {
      if (props.editable) {
        props.setRouteArray((prev) => {
          console.log("big click alst push")
          const newState = [...prev];
          newState[0].markers = [...newState[0].markers, {
            date:props.startDate,
            description:"",
            lat:e.latlng.lat,
            long:e.latlng.lng,
            mapId:props.markers[0].mapId,
            name:"",
            stopId: null,
            tripId:props.markers[0].tripId
          }]
          console.log(newState[0].markers);
          return newState;
        })
        props.setEditable(false);
      }
    },
  })
  const { map, setMap } = useContext(mapContext);
  useEffect(() => { setMap(thisMap) }, [])


  const markersJSX = props.markers.map((marker, i) => {
    //setting default options for markers
    const markerWidth = marker.iconSize ? marker.iconSize[0] : 20;
    const markerHeight = marker.iconSize ? marker.iconSize[1] : 20;
    const icon = marker.icon ? marker.icon : "DEFAULT";
    const markerPosition = marker.position ? marker.position : [0, 0];
    // const iconAnchor = [markerWidth/2, markerHeight];

    return (
      <SingleMarkerEdit markerPosition={markerPosition}
        icon={icon}
        markerWidth={markerWidth}
        markerHeight={markerHeight}
        marker={marker}
        key={i}
        startDate={props.startDate}
        endDate={props.endDate}
        setRouteArray={props.setRouteArray} />
    );
  });
  return markersJSX;
}

export default MarkersEdit;
