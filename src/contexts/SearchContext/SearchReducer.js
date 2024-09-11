export const initialState = {
  error: null,
  count: 0,
  results: [],
  hasNext: false,
  hasPrev: false,
  page: 1,
  loading: false,
  searchTerm: "",
  type: "people",
};

export const actionTypes = {
  UPDATE_TERM: "UPDATE_TERM",
  UPDATE_TYPE: "UPDATE_TYPE",
  INITIATE_SEARCH: "INITIATE_SEARCH",
  SEARCH_COMPLETE: "SEARCH_COMPLETE",
  ERROR_API: "ERROR_API",
  LOADING: "LOADING",
}

export default function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.UPDATE_TERM:
      return {...state, searchTerm: payload};
    case actionTypes.UPDATE_TYPE:
      return {...state, type: payload}
    case actionTypes.INITIATE_SEARCH:
      return { ...initialState, ...payload };
    case actionTypes.LOADING:
      return { ...state, loading: true };
    case actionTypes.ERROR_API:
      return { ...state, error: payload, loading: false };
    case actionTypes.SEARCH_COMPLETE:
      return { ...state, ...payload, loading: false };
    default:
      return state;
  }
}
