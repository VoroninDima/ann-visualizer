import React from 'react'
import {connect} from 'react-redux';

import {LinePopup} from 'components/linePopup';
import PopUpPosGetter from './lineMethods/PopUpPosGetter'
import LinePositionGetter from './lineMethods/LinePositionGetter'

import StyleGetter from './lineMethods/StyleGetter'

class Line extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weightsShow: false,
            isActive: false,
            popupPos: null,
        };
        this.ref = React.createRef();

    }

    zIndexChange(zIndex) {
        this.ref.current.style.zIndex = zIndex;
    }

    prevLineCheck = () => {
        if (this.setClassName() === this.props.lineClassSelected) return true;
    };

    getLineWeights = () => {
        let weights = this.props.weights;

        if (this.props.weightsUpdate)
            weights = this.props.weightsUpdate;

        const {neuronNextNum, neuronOrderNum, neuronListNum} = this.props;

        return weights[neuronListNum][neuronOrderNum][neuronNextNum];
    };

    changeSelectedColor = () => {
        if (!this.props.hideHeatMap)
            return 'white';
        else
            return 'red'
    };

    handleMouseOver = e => {
        if (e.ctrlKey) return;

        this.toggleWeights(true);
        this.zIndexChange(1);
        this.changeSelectedColor();

        if (e.target.classList.value === 'line') {
            const popUpPosGetter = new PopUpPosGetter(e, this.props);
            const popupPos = popUpPosGetter.getter();

            this.setState({popupPos})
        }
    };

    handleMouseOut = () => {
            this.toggleWeights(false);
            this.zIndexChange(0);
            this.changeSelectedColor();
    };

    setClassName = () => {
        const {listName, neuronNextNum, getNextListName} = this.props;
        return `from_${listName}_to_${getNextListName}_num_${neuronNextNum+1}`
    };

    toggleWeights = boolean => {
        this.setState({ weightsShow: boolean })
    };

    createLineData() {
        return {
            isActive: this.state.isActive,
            prevLineCheck : this.prevLineCheck(),
            weightsShow : this.state.weightsShow,
            getLineWeights: this.getLineWeights(),
            changeSelectedColor: this.changeSelectedColor()
        }
    }

    render() {
        const styleGetter = new StyleGetter(this.props, this.createLineData());
        const style = styleGetter.getter();

        const popup = this.renderLinePopup();

        return (
            <div
                ref={this.ref}
                style={style}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
                className='line'>
                {popup}
            </div>
        )
    }

    renderLinePopup() {
        const linePositionGetter = new LinePositionGetter(this.props);
        const angle = linePositionGetter.getter().angle;

        const weights = this.getLineWeights();

        const {weightsShow, popupPos} = this.state;

        return (
            <LinePopup active={weightsShow}
                       rotate={angle}
                       weightsValue={weights}
                       popupPos={popupPos}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        btnActive: !state.hideBtnClick.btnActive,
        lineSize: state.changeSettings.lineSize,
        lineClassSelected: state.changeLineColor.lineClassName,
        hideHeatMap: state.hideHeatMap.isActive,
        weightsToSize: state.lineWeightsToSize.isActive,
        sliderValue: state.changeSize.sliderValue,
        weightsUpdate: state.weightsUpdate.weights,

    }
}
export default connect(mapStateToProps)(Line)


