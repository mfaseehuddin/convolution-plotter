import React from "react";
import {
    EquationContext,
    EquationOptions,
    defaultErrorHandler,
} from "react-equation";
import { EquationNode } from "equation-parser";
import { defaultFunctions, defaultVariables } from "equation-resolver";
import { parse } from "equation-parser";
import Conv from "../conv/conv";
import { useDebounce } from "usehooks-ts";
import { BeakerIcon } from "@heroicons/react/20/solid";

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
        React.useState<string>("(2^t)*u(-t)");
    const [equationBInput, setEquationBInput] = React.useState<string>(
        "rectangularPulse(1,t)"
    );
    const [time, setTime] = React.useState<number>(0);

    const [xMin, setXMin] = React.useState<number>(-10);
    //useDebounce to set the xMin
    const debouncedXMin = useDebounce(xMin, 1000);
    const [xMax, setXMax] = React.useState<number>(10);
    //useDebounce to set the xMax
    const debouncedXMax = useDebounce(xMax, 1000);

    const [sampleTime, setSampleTime] = React.useState<number>(0.1);
    const debouncedSampleTime = useDebounce(sampleTime, 1000);
    const [shouldConvolve, setShouldConvolve] = React.useState<boolean>(false);

    return (
        <code className={`font-semibold`}>
            <EquationOptions
                variables={defaultVariables}
                functions={defaultFunctions}
                errorHandler={defaultErrorHandler}
            >
                <EquationContext
                    render={(equation) => (
                        <>
                            <EquationUI
                                name="Equation 1"
                                input={equationAInput}
                                setInput={setEquationAInput}
                                equationContext={equation}
                            />

                            <EquationUI
                                name="Equation 2"
                                input={equationBInput}
                                setInput={setEquationBInput}
                                equationContext={equation}
                            />

                            <div>
                                <p className="dark:text-white font-thin text-sm">
                                    Time: {equation(`${time}`)}s
                                </p>
                                <input
                                    id="default-range"
                                    type="range"
                                    value={time}
                                    onChange={(e) => {
                                        setTime(Number(e.target.value));
                                    }}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                />

                                <div className="flex my-5">
                                    <div>
                                        <p className="dark:text-white font-thin text-sm">
                                            xMin: {equation(`${xMin}`)}
                                        </p>
                                        <input
                                            id="default-range"
                                            type="range"
                                            min={-10}
                                            max={0}
                                            value={xMin}
                                            onChange={(e) => {
                                                setXMin(Number(e.target.value));
                                            }}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                    </div>
                                    <div>
                                        <p className="dark:text-white font-thin text-sm">
                                            xMax: {equation(`${xMax}`)}
                                        </p>
                                        <input
                                            id="default-range"
                                            type="range"
                                            min={0}
                                            max={10}
                                            value={xMax}
                                            onChange={(e) => {
                                                setXMax(Number(e.target.value));
                                            }}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div>
                                        <p className="dark:text-white font-thin text-sm">
                                            Sampling Time:{" "}
                                            {equation(`${sampleTime}`)}
                                        </p>
                                        <input
                                            id="default-"
                                            type="range"
                                            min={1}
                                            max={50}
                                            value={sampleTime*50}
                                            onChange={(e) => {
                                                setSampleTime(
                                                    Number(e.target.value)/50
                                                );
                                            }}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={shouldConvolve}
                                                className="sr-only peer"
                                                onChange={(e) => {
                                                    setShouldConvolve(
                                                        e.target.checked
                                                    );
                                                }}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                Convolve?
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <Conv
                                signalA={parse(equationAInput)}
                                signalB={parse(equationBInput)}
                                domain={[debouncedXMin, debouncedXMax]}
                                sampleTime={debouncedSampleTime}
                                shouldConvolve={shouldConvolve}
                            />
                        </>
                    )}
                />
            </EquationOptions>
        </code>
    );
}

type EquationUIProps = {
    name: string;
    input: string;
    setInput: React.Dispatch<React.SetStateAction<string>>;

    equationContext: (value: string) => JSX.Element;
};

export function EquationUI({
    name,
    input,
    setInput,
    equationContext,
}: EquationUIProps) {
    const [internalInput, setInternalInput] = React.useState<string>(input);

    return (
        <div className="dark:text-white">
            <h1>{name}</h1>
            <form className="flex justify-between items-center my-2">
                <div className="px-5 dark:text-white">
                    <p
                        ref={(ref) => {
                            if (ref) {
                                setDisplay(ref);
                            }
                        }}
                    >
                        {equationContext(input)}
                    </p>
                </div>
                <div className="w-1/2">
                    <label
                        htmlFor="search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BeakerIcon className="h-5 w-5 dark:text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id="equation1"
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Equation 1"
                            value={internalInput}
                            onChange={(e) => {
                                setInternalInput(e.target.value);
                            }}
                        />
                        <button
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                setInput(internalInput);
                            }}
                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Parse
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
