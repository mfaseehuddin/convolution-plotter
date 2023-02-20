import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import { EquationNode } from "equation-parser";
// import { EquationParserError } from "equation-parser";
import { EquationParserError } from "equation-parser/dist/EquationParserError";
import { convInterfacer } from "../mathInput/resolverFunctions/functions";
const pi = Math.PI;

type Props = {
    signalA: EquationNode | EquationParserError;
    signalB: EquationNode | EquationParserError;
    domain: number[];
    sampleFrequency: number;
    shouldConvolve: boolean;
};

export default function Conv({
    signalA,
    signalB,
    domain,
    sampleFrequency,
    shouldConvolve,
}: Props) {
    const timeRange = time(domain[0], domain[1], sampleFrequency);

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

    const interfacedSignalA = (t:number) => convInterfacer(signalA as EquationNode, t);
    const interfacedSignalB = (t:number) => convInterfacer(signalB as EquationNode, t);

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
        shouldConvolve
            ? {
                  name: "conv",
                  function: Convolve(interfacedSignalA, interfacedSignalB, domain, sampleFrequency),
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
    const plotFunctionsHelper = (
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
    const plotFunctions = plotFunctionsHelper(functionsToPlot, timeRange);
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
                        domain={domain}
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



//time function
export function time(st: number, et: number, steps: number): number[] {
    const time = [];
    for (let i = st; i <= et; i += steps) {
        time.push(Math.round(i * 100) / 100);
    }
    return time;
}

//elementary functions
export function step(t: number): number {
    if (t >= 0) {
        return 1;
    } else {
        return 0;
    }
}
export function impulse(t: number): number {
    if (t === 0) {
        return 1;
    } else {
        return 0;
    }
}
export function ramp(t: number): number {
    if (t >= 0) {
        return t;
    } else {
        return 0;
    }
}
export function exponential(t: number): number {
    if (t >= 0) {
        return Math.exp(t);
    } else {
        return 0;
    }
}
export function sine(t: number): number {
    return Math.sin(t);
}
export function trianglarPulse(t: number): number {
    if (t >= -1 && t <= 1) {
        return 1 - Math.abs(t);
    } else {
        return 0;
    }
}
export function rectangularPulse(a: number, t: number): number {
    if (t >= -a && t <= a) {
        return 1;
    } else {
        return 0;
    }
}

export function sgn(t: number): number {
    if (t > 0) {
        return 1;
    } else if (t < 0) {
        return -1;
    } else {
        return 0;
    }
}

export function sinc(a: number, t: number): number {
    if (t === 0) {
        return a;
    } else {
        return Math.sin(a * t) / t;
    }
}

export function gauss(t: number): number {
    return Math.exp(-t * t);
}

export function comb(T: number, t: number) {
    return impulse(t % T);
}

export function Convolve(
    a: Function,
    b: Function,
    domain: number[],
    sampleFrequency: number
) {
    return (t: number) => {
        let sum = 0;
        for (let i = domain[0]; i <= domain[1]; i += sampleFrequency) {
            sum += a(i) * b(t - i);
        }
        return sum * 2 * sampleFrequency;
    };
}