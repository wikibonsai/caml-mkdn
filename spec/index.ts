// import

// concat all render tests together to create a single export
import type { CamlTestCase } from './types';

import { camlPrefixedListCommaCases } from './cases/prefixed-list-comma';
import { camlPrefixedListMkdnCases } from './cases/prefixed-list-mkdn';
import { camlPrefixedSingleCases } from './cases/prefixed-single';
import { camlUnprefixedListCommaCases } from './cases/unprefixed-list-comma';
import { camlUnprefixedListMkdnCases } from './cases/unprefixed-list-mkdn';
import { camlUnprefixedSingleCases } from './cases/unprefixed-single';

import { camlNoValCases } from './cases/no-val';


/* eslint-disable indent */
const camlPrefixedCases   : CamlTestCase[]  = ([] as CamlTestCase[]).concat(camlPrefixedSingleCases)
                                                                    .concat(camlPrefixedListCommaCases)
                                                                    .concat(camlPrefixedListMkdnCases);
const camlUnprefixedCases : CamlTestCase[]  = ([] as CamlTestCase[]).concat(camlUnprefixedSingleCases)
                                                                    .concat(camlUnprefixedListCommaCases)
                                                                    .concat(camlUnprefixedListMkdnCases);
const camlCases           : CamlTestCase[]  = ([] as CamlTestCase[]).concat(camlPrefixedCases)
                                                                    .concat(camlUnprefixedCases)
                                                                    .concat(camlNoValCases);
/* eslint-enable indent */

// export

export { camlPrefixedListCommaCases } from './cases/prefixed-list-comma';
export { camlPrefixedListMkdnCases } from './cases/prefixed-list-mkdn';
export { camlPrefixedSingleCases } from './cases/prefixed-single';
export { camlUnprefixedListCommaCases } from './cases/unprefixed-list-comma';
export { camlUnprefixedListMkdnCases } from './cases/unprefixed-list-mkdn';
export { camlUnprefixedSingleCases } from './cases/unprefixed-single';
// handle wikirefs cases separately -- dependent on plugin setup context (i.e. has sibling wikirefs plugin installed or not)
export { camlWithoutWikiRefsCases } from './cases/without-wikiref';

// 'edge' cases
export { camlNoValCases } from './cases/no-val';


export { camlCases, camlPrefixedCases, camlUnprefixedCases };

// types

export type { CamlTestCase } from './types';
