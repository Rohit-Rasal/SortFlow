export function quickSort(arr) {
    let steps = [];
    let array = [...arr];

    function partition(low, high) {
        let pivot = array[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            steps.push({ type: "compare", indices: [j, high] });
            if (array[j] < pivot) {
                i++;
                [array[i], array[j]] = [array[j], array[i]];
                steps.push({ type: "swap", array: [...array], indices: [i, j] });
            }
        }
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        steps.push({ type: "swap", array: [...array], indices: [i + 1, high] });
        return i + 1;
    }

    function quick(low, high) {
        if (low < high) {
            let pi = partition(low, high);
            quick(low, pi - 1);
            quick(pi + 1, high);
        }
    }

    quick(0, array.length - 1);
    return steps;
}
