const initialState = {
    btnText: 'Hide lines',
    btnActive: false
};
export default function hideBtnClick(state=initialState, action) {
    if (action.type === 'BTN_HIDE_SHOW_CLICK') {
        return {
            btnText: action.payload,
            btnActive: !state.btnActive
        };
    }
    return state
}
