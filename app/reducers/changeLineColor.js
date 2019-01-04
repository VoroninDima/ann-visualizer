const initialState = {
    lineClassName: null
};
export default function changeLineColor(state=initialState, action) {
    if (action.type === 'CHANGE_LINES_COLOR') {
        return {
            lineClassName: action.payload
        };
    }
    return state
}
