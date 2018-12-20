import React from 'react'

import Line from 'components/line/Line'

export function LinesList (props) {
    const{neuronListLength, neuronProperties} = props;
    let lineEndsOffsetTop = [];
    let nextNeuronOffsetTop = neuronProperties.nextNeuronOffsetTop;
    let getLineEndsOffsetTop = () => {
        for (let i = 0; i < neuronListLength; i++) {
            nextNeuronOffsetTop = nextNeuronOffsetTop + neuronProperties.neuronWidth+20;
            lineEndsOffsetTop.push(nextNeuronOffsetTop)
        }
    };
    getLineEndsOffsetTop();
    const lines = lineEndsOffsetTop.map((line, key) =>
        <Line key={key}
              lineData={props}
              lineEndsOffsetTop={line}
        />);

	return (
		<div className="lineList">
            {lines}
		</div>
	)
}