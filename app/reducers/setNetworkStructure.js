

const initialState = {
    structure: [
        {
            "name": "input",
            "type": "input",
            "unitsData": [
                {
                    "num": 4,
                    "ActivationFunction": "HyperbolicTangent",
                    "names": [
                        "answer_speed_fact",
                        "base_fact",
                        "success_fact",
                        "success_fact",
                        "theme_fact"
                    ]
                }
            ]
        },

        {
            "name": "hidden_1",
            "type": "hidden",
            "unitsData": [
                {
                    "num": 9,
                    "ActivationFunction": "Areasinus"
                }
            ]
        },
        {
            "name": "hidden_2",
            "type": "hidden",
            "unitsData": [
                {
                    "num": 9,
                    "ActivationFunction": "Areasinus"
                }
            ]
        },
        {
            "name": "hidden_3",
            "type": "hidden",
            "unitsData": [
                {
                    "num": 9,
                    "ActivationFunction": "Areasinus"
                }
            ]
        },
        {
            "name": "hidden_4",
            "type": "hidden",
            "unitsData": [
                {
                    "num": 9,
                    "ActivationFunction": "Areasinus"
                }
            ]
        },
        {
            "name": "output",
            "type": "output",
            "unitsData": [
                {
                    "ActivationFunction": "HyperbolicTangent",
                    "names": [
                        "answer_speed_weight",
                        "base_weight"

                    ]
                },
                {
                    "ActivationFunction": "UnitLinear",
                    "names": [
                        "success_weight"
                    ]
                },
                {
                    "ActivationFunction": "UnitLinear",
                    "names": [
                        "success_weight"
                    ]
                },
                {
                    "ActivationFunction": "ZeroLinear",
                    "names": [
                        "right_answer_difference_weight"
                    ]
                }
            ]
        }
    ]
};

export default function setNetworkStructure(state=initialState, action) {
    if (action.type === 'CHANGE_NET_STRUCTURE') {
        return {
            structure: action.payload
        };
    }
    return state
}
