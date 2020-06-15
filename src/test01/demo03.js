// // @flow

// function foo(x: ?number): string {
//     if (x) {
//       return x;
//     }
//     return "default string";
// }

// function acceptsBoolean(value: boolean) {
//   // ...
// }

// acceptsBoolean(!!0);          // Error!
// acceptsBoolean(Boolean(0)); // Works!
// acceptsBoolean(!!0);        // Works!
//  // @flow
//  function acceptsNumber(value: number) {
//   // ...
// }
// acceptsNumber(42);       // Works!
// acceptsNumber(3.14);     // Works!
// acceptsNumber(NaN);      // Works!
// acceptsNumber(Infinity); // Works!
// acceptsNumber("foo");    // Error! 

// // @flow
// function acceptsString(value: string) {
//   // ...
// }
// acceptsString("foo"); // Works!
// acceptsString(false); // Error!
// //仅接受strigng与string或者number相加
// acceptsString("foo" + 42); // Works!
// acceptsString("foo" + "foo"); // Works!
// acceptsString("foo" + {}); // errors!
// acceptsString("foo" + []); // errors!

// //必须显示的声明 让flow接受
// acceptsString("foo" + String({})); // Works!
// acceptsString("foo" + [].toString()); // Works!
// acceptsString("" + JSON.stringify({})); // Works!

//  // 加跟没加一样的也许类型
//   // @flow
//   function acceptsMaybeString(value: ?string) {
//     // ...
//   }
//   acceptsMaybeString("bar");     // Works!
//   acceptsMaybeString(undefined); // Works!
//   acceptsMaybeString(null);      // Works!
//   acceptsMaybeString();          // Works!

//   // @flow
// function acceptsOptionalString(value?: string) {
//   // ...
// }

// acceptsOptionalString("bar");     // Works!
// acceptsOptionalString(undefined); // Works!
// acceptsOptionalString(null);      // Error!
// acceptsOptionalString();          // Works!