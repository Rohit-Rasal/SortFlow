export function mergeSort(arr) {
    let steps = [];
    let array = [...arr];

    function merge(start, mid, end) {
        let left = array.slice(start, mid + 1);
        let right = array.slice(mid + 1, end + 1);

        let i = 0, j = 0, k = start;
        while (i < left.length && j < right.length) {
            steps.push({ type: "compare", indices: [start + i, mid + 1 + j] });
            if (left[i] <= right[j]) {
                array[k] = left[i++];
            } else {
                array[k] = right[j++];
            }
            steps.push({ type: "swap", array: [...array], indices: [k] });
            k++;
        }
        while (i < left.length) {
            array[k] = left[i++];
            steps.push({ type: "swap", array: [...array], indices: [k] });
            k++;
        }
        while (j < right.length) {
            array[k] = right[j++];
            steps.push({ type: "swap", array: [...array], indices: [k] });
            k++;
        }
    }

    function divide(start, end) {
        if (start >= end) return;
        let mid = Math.floor((start + end) / 2);
        divide(start, mid);
        divide(mid + 1, end);
        merge(start, mid, end);
    }

    divide(0, array.length - 1);
    return steps;
}
