// data

export interface CamlValData {
  type: string;
  string: string;
  value: null | boolean | number | bigint | Date | string; // | NaN;
}

// func

// dump()

export interface CamlDumpOpts {
  format?: 'pretty' | 'pad' | 'none';
  listFormat?: 'comma' | 'mkdn';
  prefix?: boolean;
  multiLine?: 'none' | 'literal' | 'folded';
  chomp?: 'clip' | 'strip' | 'keep';
  indent?: number;
}

// load()

export interface CamlLoadPayload {
  data: any;
  content: string;
}

// scan()

export interface CamlScanOpts {
  skipEsc?: boolean;    // whether to skip escaped CAML instances (default: true)
  wikirefs?: boolean;   // recognize `[[x]]` values as a 'wiki' type (default: false — treat as string)
}

export interface ScanTxt {
  text: string;
  start: number;
}

export interface CamlScanResVal {
  type: string;
  val: ScanTxt;
}

export interface CamlScanResult {
  key: ScanTxt;
  vals: CamlScanResVal[];
}
