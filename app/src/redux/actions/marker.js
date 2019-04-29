import React from 'react';
import axios from 'axios';
import { notification, Icon } from 'antd';
import { SET_MARKER_DATA } from '../../constants/ActionTypes';

const baseURL = process.env.REACT_APP_API_HOST;

export function setMarkerCreationData(content) {
  return {
    type: SET_MARKER_DATA,
    content,
  };
}

export function getMarkerList() {
  return (dispatch) => {
    return axios.get(baseURL + 'api/v1/markers').then((response) => {
      dispatch(setMarkerCreationData({
        markerList: response.data.data
      }));
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function createMarker(title) {
  return () => {
    return axios.post(baseURL + `api/v1/markers/createNewMarker?title=${title}`).then((response) => {
      notification.open({
        message: `${response.data.status}`,
        description: `${response.data.marker ? `${response.data.marker.title} ${response.data.message}` : `${response.data.message}`}`,
        icon: <Icon type="info-circle" theme="twoTone" />
      });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateMarker(id, title) {
  return () => {
    return axios.put(baseURL + `api/v1/markers/${id}/updateMarker?title=${title}`).then((response) => {
      notification.open({
        message: `${response.data.status}`,
        description: `${response.data.marker ? `${response.data.marker.title} ${response.data.message}` : `${response.data.message}`}`,
        icon: <Icon type="info-circle" theme="twoTone" />
      });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function deleteMarker(id) {
  return () => {
    return axios.delete(baseURL + `api/v1/markers/${id}`).then((response) => {
      notification.open({
        message: `${response.data.status}`,
        description: `${response.data.marker.title} ${response.data.message}`,
        icon: <Icon type="info-circle" theme="twoTone" />
      });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updateMarkerData(obj) {
  return (dispatch) => {
    dispatch(setMarkerCreationData(obj));
  };
}