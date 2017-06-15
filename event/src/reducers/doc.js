export const initialState = {
  doc_user:{},
  doc_detail:[],
  doc_recomendation:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DOC_USER':
      return Object.assign({}, state, {doc_user: action.value});
    case 'SET_DOC_DETAIL':
      return Object.assign({}, state, {doc_detail: action.value});
    case 'SET_RECOMEND':
      return Object.assign({}, state, {doc_recomendation: action.value});
    default:
      return state;
  }
};
