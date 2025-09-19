import React, { useState, useEffect } from "react";
import Visualizer from "./components/Visualizer";
import Controls from "./components/Controls";

import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";

export default function App() {
  const [array, setArray] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [activeIndices, setActiveIndices] = useState([]);
  const [speed, setSpeed] = useState(200); // lower = faster
  const [isRunning, setIsRunning] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [selectedAlgo, setSelectedAlgo] = useState("");

  // Generate random array
  const generateArray = (size = 20) => {
    let arr = Array.from({ length: size }, () => Math.floor(Math.random() * 80) + 5);
    setArray(arr);
    setSteps([]);
    setStepIndex(0);
    setIsRunning(false);
    setIsSorted(false);
  };

  // Prepare sorting steps for selected algorithm
  const prepareSort = (algorithm) => {
    setSelectedAlgo(algorithm);
    let result = [];
    if (algorithm === "bubble") result = bubbleSort(array);
    else if (algorithm === "selection") result = selectionSort(array);
    else if (algorithm === "insertion") result = insertionSort(array);
    else if (algorithm === "merge") result = mergeSort(array);
    else if (algorithm === "quick") result = quickSort(array);

    setSteps(result);
    setStepIndex(0);
    setIsSorted(false);
    setIsRunning(false);
  };

  // Start sorting
  const handleStart = () => {
    if (!selectedAlgo) return;
    if (steps.length === 0) {
      prepareSort(selectedAlgo);
    }
    setIsRunning(true);
  };

  // Stop/Pause sorting
  const handleStop = () => setIsRunning(false);

  // Sorting animation
  useEffect(() => {
    if (isRunning && steps.length > 0 && stepIndex < steps.length) {
      const timer = setTimeout(() => {
        let step = steps[stepIndex];
        if (step.type === "compare") {
          setActiveIndices(step.indices);
        } else if (step.type === "swap") {
          setArray(step.array);
          setActiveIndices(step.indices);
        }
        setStepIndex(stepIndex + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (isRunning && stepIndex >= steps.length) {
      setIsRunning(false);
      setActiveIndices([]);
      setIsSorted(true);
    }
  }, [steps, stepIndex, speed, isRunning]);

  // Initial array on load
  useEffect(() => {
    generateArray();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold my-4">SortFlow - Sorting Visualizer</h1>
      <Visualizer array={array} activeIndices={activeIndices} isSorted={isSorted} />
      <Controls
        onGenerate={() => generateArray(20)}
        onSort={prepareSort}
        onChangeSize={(size) => generateArray(size)}
        onChangeSpeed={(val) => {
          let inverted = 1000 - val;
          setSpeed(inverted < 10 ? 10 : inverted);
        }}
        onStart={handleStart}
        onStop={handleStop}
        isRunning={isRunning}
      />
    </div>
  );
}
