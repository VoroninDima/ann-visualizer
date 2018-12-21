export default function hideBtnClickAction (innerText) {
    return {
        type: 'BTN_HIDE_SHOW_CLICK',
        payload: innerText
    }
}