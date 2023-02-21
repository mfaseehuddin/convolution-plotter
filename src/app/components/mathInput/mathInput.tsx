import React from "react";
import {
    EquationContext,
    EquationOptions,
    defaultErrorHandler,
} from "react-equation";
import { defaultFunctions, defaultVariables } from "equation-resolver";
import { parse } from "equation-parser";
import Conv from "../convPlot/conv"
import { EquationUI } from './equationInput/equationInput';

type Props = {};

export default function MathInput({}: Props) {
    const [equationAInput, setEquationAInput] =
        React.useState<string>("(2^t)*u(-t)");
    const [equationBInput, setEquationBInput] = React.useState<string>(
        "rectangularPulse(1,t)"
    );

    return (
        <code className={`font-semibold h-screen w-screen`}>
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

export const setDisplay = (node: HTMLElement) => {
    if (node.nodeName === "SPAN") {
        node.style.display = "flex";
    }
    node.childNodes.forEach((child) => {
        if (child.nodeName === "SPAN") {
            setDisplay(child as HTMLElement);
        }
    });
};
