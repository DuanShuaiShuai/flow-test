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

declare module "lodash" {
  // Declares a named "concatPath" export
  // declare export function foreach(dirA: string, dirB: string): string;
  declare module.exports: {
      foreach(dirA: string, dirB: string): string;
    };
}