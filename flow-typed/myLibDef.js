declare function foo(a: number): string;

declare var PI: number;
declare type UserID = number;

declare class URL {
    constructor(urlStr: string): URL;
    toString(): string;
  
    static compare(url1: URL, url2: URL): boolean;
  }


  declare module 'lodash.template' {
    declare var exports: {
      (input: string, options: { interpolate: RegExp, escape: RegExp }): Function
    }
  }
  
declare function userlogin(a: number): string;