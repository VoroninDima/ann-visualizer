const initialState = {
    netWidth: 1000,
    offsetTop: 20,
    neuronSize: 50,
    lineSize: 1
};
export default function changeSettings(state=initialState, action) {
    if (action.type === 'CHANGE_NEURON_SIZE') {
        return {
            ...state,
            neuronSize: action.payload
        };
    }
    if (action.type === 'CHANGE_LINE_SIZE') {
        return {
            ...state,
            lineSize: action.payload
        };
    }
    if (action.type === 'CHANGE_NEURON_OFFSET_TOP') {
        return {
            ...state,
            offsetTop: action.payload
        };
    }
    if (action.type === 'CHANGE_NET_WIDTH') {
        return {
            ...state,
            netWidth: action.payload
        };
    }
    return state
}