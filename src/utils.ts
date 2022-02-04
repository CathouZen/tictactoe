/**
 *
 * @param arr
 * @returns Wether or not all values in the array are the same
 */
export const areAllTheSame = <T>(arr: Array<T>) => {
    return arr.every((val) => val === arr[0]);
};

export const randomPick = <T>(arr: Array<T>): T => {
    return arr[Math.floor(Math.random() * arr.length)];
};
