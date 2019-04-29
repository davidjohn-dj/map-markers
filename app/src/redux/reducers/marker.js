import { SET_MARKER_DATA } from '../../constants/ActionTypes';

const INITIAL_STATE = {
  isEditMarker: false,
  editData: {},
  markerList: []
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case SET_MARKER_DATA:
      return {
        ...state,
        ...action.content,
      };
    default:
      return state;
  }
};
