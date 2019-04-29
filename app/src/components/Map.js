import React from "react";
import {
    withGoogleMap,
    GoogleMap,
    Marker,
    withScriptjs
} from "react-google-maps";

const Markers = ({ places }) => {
    return places.map((place, index) => {
        return (
            <Marker key={index} position={{ lat: place.lat, lng: place.lng }} />
        );
    });
};

const Map = ({ places, zoom, center }) => {
    return (
        <GoogleMap defaultZoom={zoom} defaultCenter={center}>
            <Markers places={places} />
        </GoogleMap>
    );
};

class MapWithMarker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { places: this.props.places }; //initialize initial state from props
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.places !== nextProps.places) {
            this.setState({
                places: nextProps.places
            });
        }
        this.setState({
            places: [...nextProps.places]
        });
    }

    render() {
        return (
            <Map
                center={this.props.center}
                zoom={this.props.zoom}
                places={this.state.places}
            />
        );
    }
}

export default withScriptjs(withGoogleMap(MapWithMarker));
