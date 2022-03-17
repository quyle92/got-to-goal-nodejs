
module.exports = function getRandomItem(itemList) {
    Array.prototype.random = function () {
        return this[Math.floor((Math.random() * this.itemList))];
    }

    return itemList.random();
}
