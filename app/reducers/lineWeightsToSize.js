const initialState = {
    isActive: false
};
export default function lineWeightsToSize(state=initialState, action) {
    if (action.type === 'SHOW_WEIGHTS_TO_SIZE') {
        return {
            isActive: !state.isActive
        };
    }
    return state
}
