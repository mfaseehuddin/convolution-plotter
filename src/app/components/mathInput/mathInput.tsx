import React from "react";
import {
    EquationContext,
    EquationOptions,
    defaultErrorHandler,
    EquationEvaluate,
} from "react-equation";

import { defaultVariables, defaultFunctions } from "equation-resolver";
import Conv from "../conv/conv";
import { sinc, rectangularPulse } from "../conv/conv";

const setDisplay = (node: HTMLElement) => {
    if (node.nodeName === "SPAN") {
        node.style.display = "flex";
    }
    node.childNodes.forEach((child) => {
        if (child.nodeName === "SPAN") {
            setDisplay(child as HTMLElement);
        }
    });
};

type Props = {};

export default function MathInput({}: Props) {
    const [equationAInput, setEquationAInput] = React.useState<string>(
        "rectangularPulse(t)"
    );
    const [equationBInput, setEquationBInput] = React.useState<string>(
        "sin(t)(u(t)-u(t-1))"
    );
    // const [parsedEquation, setParsedEquation] = React.useState<any>();
    const [time, setTime] = React.useState<number>(2);
    //recursively set the display of all the spans to flex

    return (
        <code className={``}>
            <EquationOptions
                variables={defaultVariables}
                functions={defaultFunctions}
                errorHandler={defaultErrorHandler}
            >
                <EquationContext
                    render={(equation) => (
                        <>
                            <p>Equation 1:</p>
                            <div className="flex justify-between my-2">
                                <div className="px-5">
                                    <p
                                        ref={(ref) => {
                                            if (ref) {
                                                setDisplay(ref);
                                            }
                                        }}
                                    >
                                        {equation(equationAInput)}
                                    </p>
                                </div>
                                <input
                                    type="text"
                                    className="w-1/2 h-10 px-2 border-2 border-gray-300 rounded-md"
                                    value={equationAInput}
                                    onChange={(e) => {
                                        setEquationAInput(e.target.value);
                                    }}
                                />
                            </div>
                            <p>Equation 2:</p>
                            <div className="flex justify-between items-center my-2">
                                <div className="px-5">
                                    <p
                                        ref={(ref) => {
                                            if (ref) {
                                                setDisplay(ref);
                                            }
                                        }}
                                    >
                                        {equation(equationBInput)}
                                    </p>
                                </div>
                                <input
                                    type="text"
                                    className="w-1/2 px-2 h-10 border-2 border-gray-300 rounded-md"
                                    value={equationBInput}
                                    onChange={(e) => {
                                        setEquationBInput(e.target.value);
                                    }}
                                />
                            </div>

                            <div>
                                <p>Time: {equation(`${time}`)}s</p>
                                <input
                                    id="default-range"
                                    type="range"
                                    value={time}
                                    onChange={(e) => {
                                        setTime(Number(e.target.value));
                                    }}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                />
                            </div>

                            <Conv
                                domain={[-7, 7]}
                                sampleFrequency={0.1}
                                signalA={(t: number) => sinc(1, t)}
                                signalB={(t: number) =>
                                    2.5 * rectangularPulse(0.1, t)
                                }
                            />

                            {/* {equation(`${equationInput}=`)} */}
                        </>
                    )}
                />
            </EquationOptions>
        </code>
    );
}

// const equation = ref.childNodes[0] as HTMLElement;
// equation.childNodes.forEach((child) => {
//     if (child.nodeName === "SPAN") {
//         const span = child as HTMLElement;
//         span.style.display = "flex";
//     }
// });

{
    /* <div className="flex"
ref={(ref) => {
if (ref) {
setDisplay(ref);
}
}}
>
<p>equation:</p>
<Equation value={equationInput} /> 
</div> */
}
