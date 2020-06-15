// @flow
var fooVar /* : number */ = 1;
let fooLet /* : number */ = 1;
var barVar: number = 2;
let barLet: number = 2;

// // @flow
// let foo: number = 1;
// foo = 2;   // Works!
// // $ExpectError
// foo = "3"; // Error!
// let foo = 42;

// if (Math.random()) foo = true;
// if (Math.random()) foo = "hello";

// let isOneOf: number | boolean | string = foo; // Works!





// // @flow
// let foo = 42;
// let isNumber: number = foo; // Works!

// foo = true;
// let isBoolean: boolean = foo; // Works!

// foo = "hello";
// let isString: string = foo; // Works!


// @flow
function concat(a : any, b :any) {
    return a + b;
}
  
concat("foo", "bar"); // Works!
// $ExpectError
concat(true, false);  // Error!

// type CallableObj = {
//     (number, number): number,
//     bar: string
//   };
  
//   function add(x, y) {
//     return x + y;
//   }
  
//   // $ExpectError
//   (add: CallableObj);
  
var obj = {};

obj.foo = 1;
obj.bar = true;

// var foo: number  = obj.foo; // Works!
// var bar: boolean = obj.bar; // Works!
// var baz: string  = obj.baz; // Works?
// var bax: number  = obj.bar; // Works?
//   add.bar = "hello world";
  
//   (add: CallableObj);

