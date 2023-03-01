// html

export function htmlSingle(key: string, type: string, value: string): string {
  return `<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attribute</dt>
<dd><span class="attr ${type} ${key}">${value}</span></dd>
</dl>
</aside>
`;
}

export function htmlListComma(
  keyOne: string, typeOne: string, valueOne: string,
  keyTwo: string, typeTwo: string, valueTwo: string,
): string {
  return `<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attribute</dt>
<dd><span class="attr ${typeOne} ${keyOne}">${valueOne}</span></dd>
<dd><span class="attr ${typeTwo} ${keyTwo}">${valueTwo}</span></dd>
</dl>
</aside>
`;
}

export function htmlListMkdn(
  keyOne: string, typeOne: string, valueOne: string,
  keyTwo: string, typeTwo: string, valueTwo: string,
): string {
  return `<aside class="attrbox">
<span class="attrbox-title">Attributes</span>
<dl>
<dt>attribute</dt>
<dd><span class="attr ${typeOne} ${keyOne}">${valueOne}</span></dd>
<dd><span class="attr ${typeTwo} ${keyTwo}">${valueTwo}</span></dd>
</dl>
</aside>
`;
}
