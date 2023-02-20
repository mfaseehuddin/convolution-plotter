import React from "react";
import {
    EquationContext,
    EquationOptions,
    defaultErrorHandler,
} from "react-equation";
import { EquationNode } from "equation-parser";
import { defaultFunctions, defaultVariables } from "equation-resolver";

import { resolve } from "equation-resolver";

import Conv from "../conv/conv";

import { convResolvers } from "./resolverFunctions/functions";
import { parse } from "equation-parser";
import { useEffect } from "react";

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

// function reactEquationToConvPlotter (equation: string) {
//     const parsedEquation = EquationEvaluate(equation);
//     return (t: number) => {
//         return parsedEquation({t: t});
//     }
// }

export default function MathInput({}: Props) {
    const [equationAInput, setEquationAInput] =
        React.useState<string>("sgn(t)");
    const [equationBInput, setEquationBInput] = React.useState<string>(
        "sin(t)(u(t)-u(t-1))"
    );
    // const [parsedEquation, setParsedEquation] = React.useState<any>();
    const [time, setTime] = React.useState<number>(0);
    const [timeStep, setTimeStep] = React.useState<number>(5);
    const [steppedTime, setSteppedTime] = React.useState<number>(0);
    //recursively set the display of all the spans to flex

    // useEffect(() => {
    //     console.log(
    //         resolve(parse(equationAInput), {
    //             variables: {
    //                 t: {
    //                     type: "number",
    //                     value: steppedTime,
    //                 },
    //             },
    //             functions: { ...convResolvers, ...defaultFunctions },
    //         })
    //     );
    // }, [steppedTime]);

    const [parsedEquationA, setParsedEquationA] =
        React.useState<EquationNode>();
    const [parsedEquationB, setParsedEquationB] =
        React.useState<EquationNode>();

    //parsing useeffect
    useEffect(() => {
        try {
            const parsedEquation = parse(equationAInput);
            if (parsedEquation.type === "parser-error") {
                console.log("error in parsing");
            }
            //if error, set parsedEquation to null
            setParsedEquationA(parsedEquation as EquationNode);
        } catch (error) {
            console.log("error in parsing");
        }
    }, [equationAInput]);

    useEffect(() => {
        try {
            const parsedEquation = parse(equationBInput);
            if (parsedEquation.type === "parser-error") {
                console.log("error in parsing");
            }
            //if error, set parsedEquation to null
            setParsedEquationB(parsedEquation as EquationNode);
        } catch (error) {
            console.log("error in parsing");
        }
        //if no error, set parsedEquation
    }, [equationBInput]);

    // return;

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
                                        //check if the timeStep is a factor of the time
                                        if (
                                            Math.abs(time - steppedTime) >=
                                            timeStep
                                        ) {
                                            setSteppedTime(time);
                                        }
                                        setTime(Number(e.target.value));
                                    }}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                />
                            </div>

                            <Conv
                                signalA={parse(equationAInput)}
                                signalB={parse(equationBInput)}
                                domain={[-3, 4]}
                                sampleFrequency={0.02}

                                shouldConvolve={false}
                            />

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
