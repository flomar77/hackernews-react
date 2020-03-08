export const splitArrInChunks = (arr, chunk_size) => {
    var results = [];   
    while (arr.length) {
        results.push(arr.splice(0, chunk_size));
    }
    return results;
}