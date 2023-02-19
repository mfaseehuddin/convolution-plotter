import { AdjustmentsHorizontalIcon } from "@heroicons/react/20/solid";
import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

type Props = {};

export default function Conv({}: Props) {
    function time(st: number, et: number, steps: number): number[] {
        const time = [];
        for (let i = st; i <= et; i += steps) {
            time.push(Math.round(i * 100) / 100);
        }
        return time;
    }
    // console.log("time: ", time(-1, 5, 0.1));
    function step(t: number): number {
        if (t >= 0) {
            return 1;
        } else {
            return 0;
        }
    }
    function impulse(t: number): number {
        if (t === 0) {
            return 1;
        } else {
            return 0;
        }
    }
    function ramp(t: number): number {
        if (t >= 0) {
            return t;
        } else {
            return 0;
        }
    }
    function exponential(t: number): number {
        if (t >= 0) {
            return Math.exp(t);
        } else {
            return 0;
        }
    }
    function sine(t: number): number {
        return Math.sin(t);
    }

    const timeRange = time(-10, 10, 0.1);

    const functionsToPlot = [
        // { name: "sine", function: (t:number) => Math.cos(t - 1) },
        { name: "step", function: (t: number) => step(2 * (t - 1)) },
        { name: "impulse", function: impulse },
        { name: "sex", function: (t: number) => Math.exp(- Math.pow(t,2)) },
        // { name: "ConvolutionOfSineAndStep", function: sine },
    ];

    const plotFunctions2 = (
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
                        functionsToPlot[idx].function(t),
                };
            }
            return dataAtEachTime;
        });
    };

    // console.log(plotFunctions2(functionsToPlot, timeRange));

    const plotFunctions = plotFunctions2(functionsToPlot, timeRange);

    // const plotFunctions = timeRange.map((t) => {
    //     const plot = {
    //         time: t,
    //         sine: sine(2 * Math.PI * t),
    //     };
    //     return plot;
    // });
    // console.log("plotFunctions: ", plotFunctions);

    return (
        <div className="h-1/2 w-full">
            {/* plot using rechart */}

            <ResponsiveContainer width="100%" height="100%">
                <LineChart height={300} width={500} data={plotFunctions}>
                    {
                        //map over the functionsToPlot array and return a line for each function
                        functionsToPlot.map((func) => {
                            return (
                                <Line
                                    type="monotone"
                                    dataKey={func.name}
                                    stroke="#8884d8"
                                    dot={false}
                                    key={func.name}
                                />
                            );
                        })
                    }
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
