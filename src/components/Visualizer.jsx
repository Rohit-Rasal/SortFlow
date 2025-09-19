import React from "react";

export default function Visualizer({ array, activeIndices, isSorted }) {
    return (
        <div className="flex items-end justify-center gap-1 w-full max-w-4xl h-80 bg-gray-100 p-4 rounded-lg shadow-inner">
            {array.map((value, index) => {
                // bar color logic
                let barColor = "bg-blue-500"; // default
                if (activeIndices.includes(index)) {
                    barColor = "bg-red-500"; // comparing/swapping
                }
                if (isSorted) {
                    barColor = "bg-green-500"; // sorted
                }

                return (
                    <div
                        key={index}
                        className={`flex justify-center items-end text-xs font-bold text-white ${barColor}`}
                        style={{
                            height: `${value * 3}px`, // keep inside container (max height)
                            width: "24px", // wider bars
                            borderRadius: "0.25rem",
                        }}
                    >
                        {value}
                    </div>
                );
            })}
        </div>
    );
}
    