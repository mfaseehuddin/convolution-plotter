import MathInput from "../components/mathInput/mathInput";
import React from "react";

type Props = {};

export default function ConvolutionPlotter({}: Props) {
    return (
        <div className="flex flex-col w-full p-5 dark:text-white">
            <div className="mb-10 text-center">
                <h1 className="text-2xl">Convolution Plotter</h1>
                <p className="font-thin text-md">
                    scroll down for documentation
                </p>
            </div>
            <div className="">
                <MathInput />
            </div>
            <div className="">
                {/* u: stepResolver, sgn: sgnResolver, ramp: rampResolver,
                exponential: exponentialResolver, comb: combResolver, gauss:
                gaussResolver, rectangularPulse: rectangularPulseResolver, sinc:
                sincResolver, impulse: impulseResolver, triangularPulse:
                triangularPulseResolver,  put this in a list */}

                <h1 className="text-2xl font-bold">Documentation</h1>
                <p className="font-thin text-md">
                    This is a convolution plotter. It takes two functions and
                    plots their convolution. The functions can be entered in the
                    input boxes, and the convolution will be plotted in the
                    graph below. The functions can be entered in the form of
                    equations, and the following functions are supported.
                </p>
                <br />
                <p className="text-lg font-semibold">Supported Functions</p>
                <code>
                    <ul className="list-disc list-inside px-5">
                        <li>u(t)</li>
                        <li>sgn(t)</li>
                        <li>ramp(t)</li>
                        <li>exponential(t)</li>
                        <li>comb(T, t); where T is the period</li>
                        <li>gauss(t)</li>
                        <li>rectangularPulse(a, t); where a is the width</li>
                        <li>sinc(a, t)</li>
                        <li>impulse(t)</li>
                        <li>triangularPulse(a, t); where a is the width</li>
                    </ul>
                </code>
            </div>
        </div>
    );
}
