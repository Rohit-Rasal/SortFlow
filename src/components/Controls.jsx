import React from "react";

export default function Controls({
    onGenerate,
    onSort,
    onChangeSize,
    onChangeSpeed,
    onStart,
    onStop,
    isRunning,
}) {
    return (
        <div className="flex flex-wrap gap-4 mt-6 items-center justify-center">
            {/* Generate Array */}
            <button
                onClick={onGenerate}
                disabled={isRunning}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400"
            >
                Generate Array
            </button>

            {/* Algorithm Dropdown */}
            <select
                onChange={(e) => onSort(e.target.value)}
                disabled={isRunning}
                className="px-3 py-2 border rounded-lg"
                defaultValue=""
            >
                <option value="" disabled>
                    Select Algorithm
                </option>
                <option value="bubble">Bubble Sort</option>
                <option value="selection">Selection Sort</option>
                <option value="insertion">Insertion Sort</option>
                <option value="merge">Merge Sort</option>
                <option value="quick">Quick Sort</option>
            </select>

            {/* Array Size Slider */}
            <div>
                <label className="mr-2">Array Size</label>
                <input
                    type="range"
                    min="5"
                    max="50"
                    defaultValue="20"
                    disabled={isRunning} // disable during sorting
                    onChange={(e) => onChangeSize(Number(e.target.value))}
                />
            </div>

            {/* Speed Slider */}
            <div>
                <label className="mr-2">Speed</label>
                <input
                    type="range"
                    min="100"
                    max="900"
                    defaultValue="500"
                    onChange={(e) => onChangeSpeed(Number(e.target.value))}
                />
            </div>

            {/* Start & Stop Buttons */}
            <button
                onClick={onStart}
                disabled={isRunning}
                className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:bg-gray-400"
            >
                Start
            </button>
            <button
                onClick={onStop}
                disabled={!isRunning}
                className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:bg-gray-400"
            >
                Stop
            </button>
        </div>
    );
}
