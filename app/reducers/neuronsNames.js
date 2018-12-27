const initialState = {
    neuronsNamesArray: []
};
export default function neuronsNames(state=initialState, action) {
    if (action.type === 'ADD_NEURONS_NAMES') {
        return {
            neuronsNamesArray: [
                ...state.neuronsNamesArray,
                action.payload
            ]
        };
    }
    return state
}
