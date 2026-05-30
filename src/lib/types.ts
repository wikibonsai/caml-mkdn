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
