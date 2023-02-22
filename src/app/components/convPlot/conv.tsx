import { convInterfacer } from "../mathInput/resolverFunctions/functions";
import { Convolve } from "./elementaryFunctions/functions";
import { EquationNode } from "equation-parser";
import { EquationParserError } from "equation-parser/dist/EquationParserError";
import { useDebounce } from "usehooks-ts";
import { useState } from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

type Props = {
    signalA: EquationNode | EquationParserError;
    signalB: EquationNode | EquationParserError;
    equationContext: (value: string) => JSX.Element;
};

export default function Conv({ signalA, signalB, equationContext }: Props) {
    const [xMin, setXMin] = useState<number>(-10);
    //useDebounce to set the xMin
    const debouncedXMin = useDebounce(xMin, 1000);
    const [xMax, setXMax] = useState<number>(10);
    //useDebounce to set the xMax
    const debouncedXMax = useDebounce(xMax, 1000);

    const [sampleTime, setSampleTime] = useState<number>(0.1);
    const [shouldConvolve, setShouldConvolve] = useState<boolean>(false);

    const domain = [debouncedXMin, debouncedXMax];

    const timeRange = time(domain[0], domain[1], sampleTime);

    if (signalA.type === "parser-error") {
        return <div>signalA is an EquationParserError</div>;
    }
    if (signalB.type === "parser-error") {
        return <div>signalB is an EquationParserError</div>;
    }

    type plotterInputType = {
        name: string;
        function: Function;
        stroke: string;
        animationDuration?: number;
    };

    const interfacedSignalA = (t: number) =>
        convInterfacer(signalA as EquationNode, t);
    const interfacedSignalB = (t: number) =>
        convInterfacer(signalB as EquationNode, t);

    const functionsToPlot: plotterInputType[] = [
        {
            name: "signalA",
            function: (t: number) => convInterfacer(signalA as EquationNode, t),
            stroke: "#8884d8",
            animationDuration: 100,
        },
        {
            name: "signalB",
            function: (t: number) => convInterfacer(signalB as EquationNode, t),
            stroke: "#82ca9d",
            animationDuration: 100,
        },
        {
            name: "xaxis",
            function: (t: number) => 0,
            stroke: "#000000",
            animationDuration: 100,
        },
        shouldConvolve
            ? {
                  name: "conv",
                  function: Convolve(
                      interfacedSignalA,
                      interfacedSignalB,
                      domain,
                      sampleTime
                  ),
                  stroke: "#ff0000",
                  animationDuration: 1000,
              }
            : {
                  name: "conv",
                  function: (t: number) => 0,
                  stroke: "#ff0000",
                  animationDuration: 1000,
              },
    ];

    //lets make this function async to see if it helps with the lag
    const plotFunctions = plotFunctionsHelper(functionsToPlot, timeRange);

    return (
        <div className="mt-10 h-screen max-h-[50vh] w-full flex flex-row-reverse flex-wrap-reverse md:flex-nowrap">
            <div className="w-1/4 flex flex-col justify-center p-5 ml-5 dark:bg-gray-900 rounded-2xl hover:scale-105 transition-all duration-500">
                <p className="dark:text-white">Plot Settings:</p>
                <div className="flex my-5 w-full">
                    <div className="w-full">
                        <p className="dark:text-white font-thin text-sm">
                            xMin: {equationContext(`${xMin}`)}
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
                    <div className="w-full">
                        <p className="dark:text-white font-thin text-sm">
                            xMax: {equationContext(`${xMax}`)}
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

                <div className="flex flex-col w-full">
                    <div className="w-full">
                        <p className="dark:text-white font-thin text-sm">
                            Sampling Time: {equationContext(`${sampleTime}`)}
                        </p>
                        <input
                            id="default-"
                            type="range"
                            min={1}
                            max={50}
                            value={sampleTime * 50}
                            onChange={(e) => {
                                setSampleTime(Number(e.target.value) / 50);
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
                                    setShouldConvolve(e.target.checked);
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

            <div className="h-full w-3/4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart height={300} width={500} data={plotFunctions}>
                        {
                            //map over the functionsToPlot array and return a line for each function
                            functionsToPlot.map((func) => {
                                return (
                                    <Line
                                        type="monotone"
                                        dataKey={func.name}
                                        stroke={func.stroke}
                                        dot={false}
                                        key={func.name}
                                        animationDuration={
                                            func.animationDuration
                                        }
                                    />
                                );
                            })
                        }
                        <XAxis
                            dataKey="time"
                            type="number"
                            domain={["dataMin", "dataMax"]}
                            allowDecimals={false}
                            minTickGap={0.5}
                            axisLine={true}
                        />
                        <YAxis
                            type="number"
                            domain={["dataMin-0.5", "dataMax+0.5"]}
                            allowDecimals={false}
                            minTickGap={0.5}
                        />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

// time function
export function time(st: number, et: number, steps: number) {
    const time = [];
    for (let i = st; i <= et; i += steps * 2) {
        time.push(Math.round(i * 100) / 100);
    }
    return time;
}

export const timeGenerator = (start: number, end: number, step: number) => {
    let timeArray = [];
    for (let i = start; i <= end; i += step) {
        timeArray.push(i);
    }
    return timeArray;
};

export const plotFunctionsHelper = (
    functionsToPlot: { name: string; function: Function }[],
    timeRange: number[]
) => {
    return timeRange.map((t) => {
        let dataAtEachTime = {
            time: t,
        };
        for (let idx = 0; idx < functionsToPlot.length; idx++) {
            dataAtEachTime = {
                ...dataAtEachTime,
                [functionsToPlot[idx].name]:
                    Math.round(functionsToPlot[idx].function(t) * 1000) / 1000,
            };
        }
        return dataAtEachTime;
    });
};
