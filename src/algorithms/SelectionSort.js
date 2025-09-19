export function selectionSort(arr) {
    let steps = [];
    let array = [...arr];

    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            steps.push({ type: "compare", indices: [minIndex, j] });
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            steps.push({ type: "swap", array: [...array], indices: [i, minIndex] });
        }
    }
    return steps;
}
