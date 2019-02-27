import mainConfig from 'configs/components/main'

export default class WheelZoom {
    constructor(main) {
        const {defZoomValue, sidebarWidth} = mainConfig;
        const {wheelData, ref, props, state} = main;
        this.x = wheelData.clientX;
        this.y = wheelData.clientY;
        this.test = 11;
        this.centerX = ref.current.offsetWidth/2 + sidebarWidth;
        this.centerY = ref.current.offsetHeight/2;

        this.zoomValue = props.sliderValue;
        this.scrollValue = wheelData.deltaY;
        this.zoomKoef = this.zoomValue / defZoomValue;
        this.mainState = state;
    }

    get() {
        const {minZoomValue, maxZoomValue} = mainConfig;
        let newZoomValue = this.zoomValue + this.scrollValue/10;

        if (newZoomValue < minZoomValue && this.scrollValue < 0)
            return this.zoomValue;
        if (newZoomValue > maxZoomValue && this.scrollValue > 0)
            return this.zoomValue;

        const wheelZoomValue = this.wheelZoomValue();
        const zoomTranslate = this.wheelZoomTranslate();

        return {wheelZoomValue, zoomTranslate}

    }

    wheelZoomValue() {
        return this.zoomValue + this.scrollValue/10;
    }

    wheelZoomTranslate() {
        this.scrollInOrOut = this.scrollValue/100;
        const {left, top} = this.mainState;

        const newLeft = this.getXResize() + left;
        const newTop = this.getYResize() +  top;

        return {newLeft, newTop}
    }

    getXResize() {
        const {zoomStep} = mainConfig;
        const {scrollInOrOut, centerX, x, zoomKoef} = this;
        return scrollInOrOut * (centerX-x) / zoomStep / zoomKoef*2/zoomKoef;
    }

    getYResize() {
        const {zoomStep} = mainConfig;
        const {scrollInOrOut, centerY, y, zoomKoef} = this;

        return scrollInOrOut * (centerY-y) / zoomStep / zoomKoef*2/zoomKoef;
    }
}



