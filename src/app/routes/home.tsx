import Conv from "../components/conv/conv";
import React from "react";

type Props = {};

export default function Home({}: Props) {
    return (
        <div className="h-[calc(100vh-123px)]">
            <Conv />
        </div>
    );
}
