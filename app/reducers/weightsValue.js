const weights = () => {
    const weightsJSON = new XMLHttpRequest();
    weightsJSON.open('GET', './assets/weights.json', false);
    weightsJSON.send();
    return JSON.parse(weightsJSON.responseText);
};

const initialState = {
    weights: weights()
};
export default function weightsValue(state=initialState) {
    return state
}
