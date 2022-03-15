const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
    // setTimeout(resolve, 100, 'foo');
    return Promise.resolve(3)
});
promise3.then((v) => console.log(v))
Promise.all([promise1, promise2]).then((values) => {
    console.log(values);
});
module.exports = promise1;
