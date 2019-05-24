const initialState = {
    isFromServer: false
};
export default function isStructureFromServer(state=initialState, action) {
    if (action.type === 'SWITCH_STRUCTURE_FROM_SERVER') {
        return {
            isFromServer: action.payload
        };
    }
    return state
}
