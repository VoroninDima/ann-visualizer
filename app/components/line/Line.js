import React from 'react'
import {connect} from 'react-redux';

import {LinePopup} from 'components/linePopup';
import {setPopupPosition, setStyle, setAngle} from './lineMethods';

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
        const {neuronNextNum, neuronOrderNum, neuronListNum, weights} = this.props;

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

        if (e.target.classList.value === 'line')
            setPopupPosition.bind(this)(e)
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

    render() {
        const style = setStyle.call(this);

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

    /**
     *
     * @return {*}
     */
    renderLinePopup() {
        const angle = setAngle.call(this);
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
        sliderValue: state.changeSize.sliderValue
    }
}
export default connect(mapStateToProps)(Line)


