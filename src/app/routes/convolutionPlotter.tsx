import MathInput from "../components/mathInput/mathInput";
import React from "react";

type Props = {};

export default function ConvolutionPlotter({}: Props) {
    return (
        <div className="flex flex-col w-full p-5 dark:text-white">
            <div className="mb-10 text-center">
                <h1 className="text-2xl">Convolution Plotter</h1>
                <p className="font-thin text-md">scroll down for documentation</p>
            </div>
            <div className="">
                <MathInput />
            </div>
            <div>

                


            </div>
        </div>
    );
}
