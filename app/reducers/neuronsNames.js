/**
 * @param {{unitsData:array}} nika
 * @param {{num:int}} data
 * @returns {*}
 * @constructor
 */

const xhr = new XMLHttpRequest();
xhr.open('GET', '../assets/config.json', false);
xhr.send();

const nika = JSON.parse(xhr.responseText);

let getNames = () => {
    let namesArray = [];
    let ar = [];

    for(let i = 0; i < nika.length; i++) {
        const neuronData = nika[i].unitsData;
        if (neuronData.length === 1) {
            if (neuronData[0].names) {
                namesArray.push(neuronData[0].names)
            } else namesArray.push(...getNameless(nika[i]))
        } else neuronData.forEach(el => ar.push(...el.names))
    }
    namesArray.push(ar);

    return namesArray
};
let getNameless = array => {
    let ar = [];
    array.unitsData.forEach(data => {
        if (!data.names) {
            let ar2 = [];
            for (let i = 0; i < data.num; i++) {
                ar2.push(array.name)
            }
            ar.push(ar2)
        }
    });
    return ar
};
let getLayersNames = () => {
    let ar = [];
    nika.forEach(el => {
        ar.push(el.name)
    });
    return ar
};

const initialState = {
    neuronsNamesArray: getNames(),
    layersName: getLayersNames()
};
export default function neuronsNames(state=initialState) {
    return state
}
