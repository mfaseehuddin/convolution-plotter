import Conv from "../components/conv/conv";
import React from "react";
import MathInput from "../components/mathInput/mathInput";

type Props = {};

export default function Home({}: Props) {
    return (
        <div className="h-[calc(100vh-123px)]">
            <Conv />
            <MathInput />
        </div>
    );
}
