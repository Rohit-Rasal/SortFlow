export function insertionSort(arr) {
    let steps = [];
    let array = [...arr];

    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            steps.push({ type: "compare", indices: [j, j + 1] });
            array[j + 1] = array[j];
            steps.push({ type: "swap", array: [...array], indices: [j, j + 1] });
            j--;
        }
        array[j + 1] = key;
        steps.push({ type: "swap", array: [...array], indices: [j + 1, i] });
    }
    return steps;
}
