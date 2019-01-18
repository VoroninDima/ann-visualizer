function color ()  {
    const {isActive, hideHeatMap} = this.props;
    if (this.prevLineCheck())
        return this.changeSelectedColor();
    if (isActive)
        return this.changeSelectedColor();
    if (hideHeatMap)
        return '#bdbdbd';
    else
        return setLineColor.bind(this)()
}

function setLineColor() {
    const redColor = () => Math.floor((this.getLineWeights()/10) * 500);
    const greenColor = () => Math.floor((1 - this.getLineWeights()/10) * 500);
    return `rgb(${redColor()}, ${greenColor()}, 0)`
}

export default color