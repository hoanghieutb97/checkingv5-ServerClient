function checkStates(dataJSON) {
    let items = dataJSON.items;

    const groupedByState = items.reduce((acc, item) => {
        if (!acc[item.state]) {
            acc[item.state] = [];
        }
        acc[item.state].push(item);
        return acc;
    }, {});
    var allStates = Object.keys(groupedByState);
    
    return allStates.length
}
module.exports = checkStates