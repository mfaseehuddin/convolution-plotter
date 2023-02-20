import React from "react";
import {
    Equation,
    EquationEvaluate,
    EquationContext,
    EquationOptions,
    defaultErrorHandler,
} from "react-equation";
import type {
    Equation as EquationType,
    EquationContext as EquationContextType,
} from "";
import { useEffect } from "react";
import { ReferenceDot } from "recharts";
import { defaultVariables, defaultFunctions } from "equation-resolver";

type Props = {};

export default function MathInput({}: Props) {
    const [equationInput, setEquationInput] = React.useState<string>("sin(x)");
    const [parsedEquation, setParsedEquation] = React.useState<any>();
    const [time, setTime] = React.useState<number>(0);
    //recursively set the display of all the spans to flex
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

    return (
        <div className="">
            <input
                type="text"
                className="w-full h-10 border-2 border-gray-300 rounded-md"
                value={equationInput}
                onChange={(e) => {
                    setEquationInput(e.target.value);
                }}
            />
            <label
                htmlFor="default-range"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Default range
            </label>
            <input
                id="default-range"
                type="range"
                value={time}
                onChange={(e) => {
                    setTime(Number(e.target.value));
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            ></input>
            <code
                className={`equation-wrapper`}
                ref={(ref) => {
                    if (ref) {
                        setDisplay(ref);
                    }
                }}
            >
                <EquationOptions
                    variables={defaultVariables}
                    functions={defaultFunctions}
                    errorHandler={defaultErrorHandler}
                >
                    <EquationContext
                        render={(equation) => (
                            <>
                                {equation(`t=${time}`)}
                                {equation(`1*${equationInput}=`)}
                            </>
                        )}
                    />
                </EquationOptions>

                {/* <pre>
                    <code>{JSON.stringify(parsedEquation, null, 2)}</code>
                </pre> */}
            </code>
        </div>
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
