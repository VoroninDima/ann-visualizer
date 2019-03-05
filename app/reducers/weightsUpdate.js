const initialState = {
    weights: null
};
export default function updateWeights (state=initialState, action) {
    if (action.type === 'UPDATE_WEIGHTS') {
        return {
            weights: action.payload,
        };
    }
    return state
}
