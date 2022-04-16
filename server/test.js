

const A = {
    names: "jun",
    age : 10
}

const B = {
    name: "ahn",
    age: 8
}

const A1 = [1, 2, 3, 4];
const B1 = [5, 6, 7, 8];

console.log([...A1,...B1]);


console.log({ ...A, ...B });


class Test{
    a = 2;
    constructor() {
        const a = 10;
        this.a = 10;
    }

    ouput() {
    console.log(a);
    }
}

const a = new Test();
a.ouput();

var g = 20;
console.log(this.g); // 20v