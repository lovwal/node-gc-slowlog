const gc = require('./index')

gc.setThreshold(1)

function generate_garbage() {
    let l = []
    for(let i=0;i<1000000;i++) {
        l.push(i);
    }
}

generate_garbage()
generate_garbage()
generate_garbage()
generate_garbage()


function sleep(timeout) {
    return new Promise(r => setTimeout(r, timeout));
}

sleep(2000).then(() => {})
