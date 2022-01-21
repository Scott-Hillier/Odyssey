import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { iconFinder } from "../../Helpers/markerHelpers";
import { useEffect, useRef } from "react";
import PopUpEdit from "./PopUpEdit";

function SingleMarkerEdit(props) {
    const markerRef = useRef();
    useEffect(()=>{     
        if (!props.marker.stopId && markerRef.current)
        {
            markerRef.current.openPopup();
            console.log('asdf wowpwowpwopw wop wop')
        }
    },[markerRef.current])
    
    return (<Marker
        position={props.markerPosition}
        icon={
            new L.Icon({
                iconUrl: iconFinder(props.icon),
                iconSize: new L.Point(props.markerWidth, props.markerHeight),
                className: "leaflet-div-icon",
                // iconAnchor: iconAnchor
            })
        }

        ref={markerRef}
    >
        {props.marker.popUp ? (
            <Popup >
                <PopUpEdit
                    name={props.marker.popUp.name}
                    date={props.marker.popUp.date}
                    description={props.marker.popUp.description}
                    endDate={props.endDate}
                    startDate={props.startDate}
                    setRouteArray={props.setRouteArray}
                    stopId={props.marker.stopId}
                    mapId={props.marker.mapId}
                    tripId={props.marker.tripId}
                    type={props.marker.type}
                    position={props.markerPosition}
                />
            </Popup>
        ) : (
            <></>
        )}
    </Marker>);

}

export default SingleMarkerEdit;