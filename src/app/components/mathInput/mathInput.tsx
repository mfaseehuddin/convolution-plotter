import React from "react";
import {
    EquationContext,
    EquationOptions,
    defaultErrorHandler,
} from "react-equation";
import { defaultFunctions, defaultVariables } from "equation-resolver";
import { parse } from "equation-parser";
import Conv from "../conv/conv";
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

export default function MathInput({}: Props) {
    const [equationAInput, setEquationAInput] =
        React.useState<string>("(2^t)*u(-t)");
    const [equationBInput, setEquationBInput] = React.useState<string>(
        "rectangularPulse(1,t)"
    );

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


                            <Conv
                                signalA={parse(equationAInput)}
                                signalB={parse(equationBInput)}
                                equationContext={equation}
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
                        {name}
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <BeakerIcon className="h-5 w-5 dark:text-gray-400" />
                        </div>
                        <input
                            type="text"
                            id={name}
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter equation"
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
