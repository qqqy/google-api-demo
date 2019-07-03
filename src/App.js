import React, { Component } from 'react';
import { Map, GoogleApiWrapper , InfoWindow , Marker} from 'google-maps-react';

import CurrentLocation from './Map';

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  }

  onMarkerClick = (props , marker , e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })
  }

  onClose = props => {
    if(this.state.showingInfoWindow){
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }
  
  render() {
    return (
      // <Map
      //   google={this.props.google}
      //   zoom={14}
      //   style={mapStyles}
      //   initialCenter={{
      //    lat: -1.2884,
      //    lng: 36.8233
      //   }}
      // >
      <CurrentLocation
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker
          onClick={this.onMarkerClick}
          name={"Kenyatta International Convention Centre"}  
          />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          >
          <div>{this.state.selectedPlace.name}</div>
        </InfoWindow>
      </CurrentLocation>
      // </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer);