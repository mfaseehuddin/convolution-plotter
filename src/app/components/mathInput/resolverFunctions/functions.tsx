import { EquationNodeFunction } from "equation-parser";
import { ResultNode } from "equation-resolver";
import { ResolveOptions } from "equation-resolver/dist/ResolveOptions";
import { resolve } from "equation-resolver";

import {
    step,
    trianglarPulse,
    sine,
    sgn,
    ramp,
    exponential,
    comb,
    gauss,
    rectangularPulse,
    sinc,
    impulse,
    Convolve,
} from "../../conv/conv";

//list of elementary functions to implement

export const stepResolver = (
    node: EquationNodeFunction,
    options: ResolveOptions
): ResultNode => {
    if (node.args.length !== 1) {
        throw new Error("Expected 1 argument");
    }

    const arg = resolve(node.args[0], options);

    if (arg.type !== "number") {
        throw new Error("Expected number");
    }

    return {
        type: "number",
        value: step(arg.value),
    };
};

export const trianglarPulseResolver = (
    node: EquationNodeFunction,
    options: ResolveOptions
): ResultNode => {
    if (node.args.length !== 1) {
        throw new Error("Expected 1 argument");
    }

    const arg = resolve(node.args[0], options);

    if (arg.type !== "number") {
        throw new Error("Expected number");
    }

    return {
        type: "number",
        value: trianglarPulse(arg.value),
    };
};

export const sineResolver = (
    node: EquationNodeFunction,
    options: ResolveOptions
): ResultNode => {
    if (node.args.length !== 1) {
        throw new Error("Expected 1 argument");
    }

    const arg = resolve(node.args[0], options);

    if (arg.type !== "number") {
        throw new Error("Expected number");
    }

    return {
        type: "number",
        value: sine(arg.value),
    };
};

export const sgnResolver = (
    node: EquationNodeFunction,
    options: ResolveOptions
): ResultNode => {
    if (node.args.length !== 1) {
        throw new Error("Expected 1 argument");
    }

    const arg = resolve(node.args[0], options);

    if (arg.type !== "number") {
        throw new Error("Expected number");
    }

    return {
        type: "number",
        value: sgn(arg.value),
    };
};

export const rampResolver = (
    node: EquationNodeFunction,
    options: ResolveOptions
): ResultNode => {
    if (node.args.length !== 1) {
        throw new Error("Expected 1 argument");
    }

    const arg = resolve(node.args[0], options);

    if (arg.type !== "number") {
        throw new Error("Expected number");
    }

    return {
        type: "number",
        value: ramp(arg.value),
    };
};

export const exponentialResolver = (
    node: EquationNodeFunction,
    options: ResolveOptions
): ResultNode => {
    if (node.args.length !== 1) {
        throw new Error("Expected 1 argument");
    }

    const arg = resolve(node.args[0], options);

    if (arg.type !== "number") {
        throw new Error("Expected number");
    }

    return {
        type: "number",
        value: exponential(arg.value),
    };
};

export const combResolver = (
    node: EquationNodeFunction,
    options: ResolveOptions
): ResultNode => {
    if (node.args.length !== 2) {
        throw new Error("Expected 2 arguments");
    }

    const a = resolve(node.args[0], options);
    const arg = resolve(node.args[1], options);

    if (a.type !== "number") {
        throw new Error("Expected number");
    }

    if (arg.type !== "number") {
        throw new Error("Expected number");
    }

    return {
        type: "number",
        value: comb(a.value, arg.value),
    };
};

export const gaussResolver = (
    node: EquationNodeFunction,
    options: ResolveOptions
): ResultNode => {
    if (node.args.length !== 1) {
        throw new Error("Expected 1 argument");
    }

    const arg = resolve(node.args[0], options);

    if (arg.type !== "number") {
        throw new Error("Expected number");
    }

    return {
        type: "number",
        value: gauss(arg.value),
    };
};

export const rectangularPulseResolver = (
    node: EquationNodeFunction,
    options: ResolveOptions
): ResultNode => {
    if (node.args.length !== 2) {
        throw new Error("Expected 2 arguments");
    }
    const a = resolve(node.args[0], options);
    const arg = resolve(node.args[1], options);

    if (a.type !== "number") {
        throw new Error("Expected number");
    }

    if (arg.type !== "number") {
        throw new Error("Expected number");
    }

    return {
        type: "number",
        value: rectangularPulse(a.value, arg.value),
    };
};

export const sincResolver = (
    node: EquationNodeFunction,
    options: ResolveOptions
): ResultNode => {
    if (node.args.length !== 2) {
        throw new Error("Expected 2 arguments");
    }
    const a = resolve(node.args[0], options);
    const arg = resolve(node.args[1], options);

    if (a.type !== "number") {
        throw new Error("Expected number");
    }

    if (arg.type !== "number") {
        throw new Error("Expected number");
    }

    return {
        type: "number",
        value: sinc(a.value, arg.value),
    };
};

export const impulseResolver = (
    node: EquationNodeFunction,
    options: ResolveOptions
): ResultNode => {
    if (node.args.length !== 1) {
        throw new Error("Expected 1 argument");
    }

    const arg = resolve(node.args[0], options);

    if (arg.type !== "number") {
        throw new Error("Expected number");
    }

    return {
        type: "number",
        value: impulse(arg.value),
    };
};

// export const convRevResolver = (
//     node: EquationNodeFunction,
//     options: ResolveOptions
// ): ResultNode => {
//     if (node.args.length !== 2) {
//         throw new Error("Expected 2 arguments");
//     }

//     const a = resolve(node.args[0], options);
//     const b = resolve(node.args[1], options);

//     if (a.type !== "number") {
//         throw new Error("Expected number");
//     }

//     if (b.type !== "number") {
//         throw new Error("Expected number");
//     }

//     return {
//         type: "number",
//         value: Convolve(a.value, b.value),
//     };
// };

import { FunctionLookup } from "equation-resolver";

export const convResolvers: FunctionLookup = {
    u: stepResolver,
    sgn: sgnResolver,
    ramp: rampResolver,
    exponential: exponentialResolver,
    comb: combResolver,
    gauss: gaussResolver,
    rectangularPulse: rectangularPulseResolver,
    sinc: sincResolver,
    impulse: impulseResolver,
    // convRev: convRevResolver,
};

import { EquationNode } from "equation-parser";
import { defaultFunctions } from "equation-resolver";
import { ResultNodeNumber } from "equation-resolver";

export const convInterfacer = (
    parsedEquation: EquationNode,
    t: number
): number => {
    try {
        const result = resolve(parsedEquation, {
            variables: {
                t: {
                    type: "number",
                    value: t,
                },
            },
            functions: { ...convResolvers, ...defaultFunctions },
        });

        if (result.type !== "number") {
            throw new Error("WHY IS THIS NOT A NUMBER");
        }

        return result.value;
    } catch (error) {
        console.log("WRONG INPUT", error);
        //warn the user!
        return 0;
    }
};

//TODO: THIS WORKED SO FIGURE OUT HOW TO MAKE IT WORK

// // Parse function expression
// console.log("equationAInput", equationAInput);
// const node = parse("f(a,b) = a+b");
// console.log("node", node);
// // Check that expression can be made into a resolver function
// if (
//     node.type !== "equals" ||
//     node.a.type !== "function" ||
//     node.a.args.every((arg) => arg.type !== "variable")
// ) {
//     throw new Error(
//         "Expected equals with a function with only variable-args as left-hand side"
//     );
// }

// // Create the function
// const func = createResolverFunction(
//     node.a.args.map((arg) => {
//         if (arg.type === "variable") {
//             return arg.name;
//         } else {
//             throw new Error("Expected variable");
//         }
//     }),
//     node.b,
//     {
//         variables: {},
//         functions: {},
//     }
// );

// // making resolver functions myself
// //make a function of type ResolverFunction

// const myfunctions = resolve(parse("step(-1+1)"), {
//     functions: {
//         // Assign the function as the correct name, `f`
//         step: step,
//     },
// });
