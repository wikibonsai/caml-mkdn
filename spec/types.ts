// types

export interface CamlTestCase {
  descr: string;               // test description
  error?: boolean;             // test reflects an error state
  opts?: any;                  // plugin options
  mkdn: string;                // markdown input
  html: string;                // html output

  content?: string;            // content besides caml attributes
  strData: any;                // data payload with values as strings
  valData: any;                // data payload with values as their raw value
  parseData: any;              // data payload with 'CamlValData'
}
