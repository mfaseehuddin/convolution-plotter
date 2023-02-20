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

    //elementary functions
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
    function trianglarPulse(t: number): number {
        if (t >= -1 && t <= 1) {
            return 1 - Math.abs(t);
        } else {
            return 0;
        }
    }
    function rectangularPulse(t: number): number {
        if (t >= -1 && t <= 1) {
            return 1;
        } else {
            return 0;
        }
    }

    function sgn(t: number): number {
        if (t > 0) {
            return 1;
        } else if (t < 0) {
            return -1;
        } else {
            return 0;
        }
    }

    function sinc(a: number, t: number): number {
        if (t === 0) {
            return a;
        } else {
            return Math.sin(a * t) / t;
        }
    }

    function gauss(t: number): number {
        return Math.exp(-t * t);
    }

    function comb(T: number, t: number) {
        return impulse(t % T);
    }

    function conv(a: Function, b: Function) {
        return (t: number) => {
            let sum = 0;
            for (let i = domain[0]; i <= domain[1]; i += sampleRate) {
                sum += a(i) * b(t - i);
            }
            return sum * 2 * sampleRate;
        };
    }

    const domain = [-5, 5];
    const sampleRate = 0.1;
    const pi = Math.PI;

    const timeRange = time(domain[0], domain[1], sampleRate);

    const mySignal1 = (t: number) =>
        (step(t + pi / 2) - step(t - pi / 2)) * sine(t);
    const mySignal2 = (t: number) => trianglarPulse(t-3);
    const mySignal3 = (t: number) => sinc(pi, t);
    const mySignal4 = (t: number) => impulse(t - 1);
    // const comber = (t: number) => comb(0, t);

    const signalA = mySignal2;
    const signalB = mySignal1;

    type plotterInputType = {
        name: string;
        function: Function;
        stroke: string;
        animationDuration?: number;
    };

    const functionsToPlot: plotterInputType[] = [
        {
            name: "signalA",
            function: signalA,
            stroke: "#8884d8",
            animationDuration: 100,
        },
        {
            name: "signalB",
            function: signalB,
            stroke: "#82ca9d",
            animationDuration: 100,
        },
        {
            name: "conv",
            function: conv(signalA, signalB),
            stroke: "#ff0000",
            animationDuration: 1000,
        },
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
                        Math.round(functionsToPlot[idx].function(t) * 1000) /
                        1000,
                };
            }
            return dataAtEachTime;
        });
    };
    const plotFunctions = plotFunctions2(functionsToPlot, timeRange);
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
                                    stroke={func.stroke}
                                    dot={false}
                                    key={func.name}
                                    animationDuration={func.animationDuration}
                                />
                            );
                        })
                    }
                    <XAxis
                        dataKey="time"
                        type="number"
                        domain={[5, 5]}
                        allowDecimals={false}
                        minTickGap={1}
                    />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>

        </div>
    );
}
