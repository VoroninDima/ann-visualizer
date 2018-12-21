const initialState = {
  sliderValue: 50
};
export default function sliderChange(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_SIZE': {
            return {...state, sliderValue: action.payload};
        }
        default:
            return state
    }
}