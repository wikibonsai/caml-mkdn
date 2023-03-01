// data

export interface CamlValData {
  type: string;
  string: string;
  value: null | boolean | number | bigint | Date | string; // | NaN;
}

// func

// dump()

export interface CamlDumpOpts {
  format: 'pretty' | 'pad' | 'none';
  listFormat: 'comma' | 'mkdn';
  prefix: boolean;
}

// load()

export interface CamlLoadPayload {
  data: any;
  content: string;
}

// scan()

export interface CamlScanResKey {
  key: [string, number];
}

export interface CamlScanResVal {
  type: string;
  val: [string, number];
}
