//elementary functions
export function step(t: number): number {
    if (t === 0) {
        return 0.5;
    } else if (t > 0) {
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
export function triangularPulse(a: number, t: number): number {
    if (t >= -a && t <= a) {
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

//need to make this function async to see if it helps with the lag

export function Convolve(
    a: Function,
    b: Function,
    domain: number[],
    sampleTime: number
) {
    return (t: number) => {
        let sum = 0;
        for (let i = domain[0]; i <= domain[1]; i += sampleTime) {
            sum += a(i) * b(t - i);
        }
        return sum * 2 * sampleTime;
    };
}
