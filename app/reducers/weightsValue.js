const weightsJSON = new XMLHttpRequest();
weightsJSON.open('GET', '../assets/weights.json', false);
weightsJSON.send();
const weights = JSON.parse(weightsJSON.responseText);

const initialState = {
    weights: weights,
};
console.log(weights)
export default function weightsValue(state=initialState) {
    return state
}
