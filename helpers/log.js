// console.log 管理
function log(...args) {
    const date = new Date();
    console.log(date + "\n");
    console.log(...args);
    console.log("\n===============================\n");
}
// -------------------------------------------------------------
// -------------------------------------------------------------
// -------------------------------------------------------------
module.exports = log;
