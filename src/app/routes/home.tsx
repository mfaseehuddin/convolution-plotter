import Conv from "../components/convPlot/conv";
import React from "react";
import MathInput from "../components/mathInput/mathInput";

type Props = {};

export default function Home({}: Props) {
    return (
        <div className="dark:text-white h-[calc(100vh-110px)] flex flex-col justify-between">
            <div>
                <h1 className="text-lg font-bold">
                    Welcome to the LUMS SSE toolkit!
                </h1>
                <p className="font-thin text-md italic">
                    a project by mfaseehudin | mirage
                </p>
                <br />
                <p className="font-light text-md">
                    The SSE Toolkit is a collection of tools that are useful for
                    students of the science and engineering department at LUMS.
                    The toolkit is currently in development and will be updated
                    with new tools as they are developed.
                </p>
                <br />
                <p className="font-light text-md">The current tools are:</p>
                <ul className="list-disc px-10">
                    <li className="list-item">
                        <div>
                            <a
                                className="hover:text-orange-400 hover:cursor-pointer"
                                href="/convplot"
                            >
                                Convolution Plotter
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="flex gap-2">
                <p>
                    If you face any issues or have any suggestions, please feel
                    free to contact me at
                </p>
                <a href="mailto:faseeh@promirage.com">
                    <p className="hover:text-orange-400 hover:cursor-pointer">
                        faseeh@promirage.com
                    </p>
                </a>
            </div>
        </div>
    );
}
