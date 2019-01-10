const initialState = {
    isActive: true
};
export default function hideHeatMap(state=initialState, action) {
    if (action.type === 'HIDE_HEAT_MAP') {
        return {
            isActive: !state.isActive
        };
    }
    return state
}
