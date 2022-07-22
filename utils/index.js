export function flattenCollection(collection, edges = false) {
    const result = {}
    if (edges) return collection.map(edge => flattenCollection(edge.node)); // collection is array when 'edges' is true
    Object.keys(collection).forEach(key => {
        if (collection[key]?.edges) {
            result[key] = flattenCollection(collection[key].edges, true);
        } else {
            result[key] = collection[key]
        }
    });
    return result;
}