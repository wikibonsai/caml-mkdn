/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-namespace */


export namespace RGX {

  export const MARKER = {
    // markdown bullet
    BULLET         : /[^\S\r\n]{0,4}([+*-]) /i,

    // todo: add links
    // match: wkilink's RGX.SP_CHAR.LINKTYPE_PRFX -- with the exception of the final '?' which is added here
    KEY_PRFX       : /(?:: ?)/,
    // match: wikilink's RGX.SP_CHAR.LINKTYPE
    COL            : /(?: *:: ?)/,
    // multi-line string indicators
    MLINE_STR      : /(>-|>\||>|\|)/,
  } as const;

  // for whitespace handling...
  export const MARKER_WS = {
    KEY_PRFX       : /(:? ?)/,
    COL            : /( *)::( ?)/,
  } as const;

  export const VALID_CHARS = {
    // todo: add link
    // match: wikilink's RGX.USABLE_CHAR.LINKTYPE
    KEY            : /[^\n\r!:^|[\]]+/i,
    // todo: now excluding brackets to ignore [[wiki values]]...would be better as a lookahead,
    //       but not sure how to combine single char excludes with pattern excludes...
    VAL            : /[^\n[\]]+/,
  } as const;

  export const CAP_GRP = {
    KEY            : new RegExp('(' + VALID_CHARS.KEY.source + ')'),
    VAL            : new RegExp('(' + VALID_CHARS.VAL.source + ')'),
    VAL_MSTR       : /((?:\s+.*\n?)*)/,
  } as const;

  export const LINE = {
    KEY            : new RegExp(
                                  '^'
                                    + MARKER.KEY_PRFX.source + '?'
                                    + CAP_GRP.KEY.source
                                    + MARKER.COL.source
                                    + CAP_GRP.VAL.source + '?'
                                  + '$'
                                , 'im'),
    LIST_ITEM      : new RegExp(
                                  '^'
                                    + ' *' + MARKER.BULLET.source
                                    + CAP_GRP.VAL.source
                                  + '$'
                                  , 'im'),
  } as const;

  // <------------------------------------------------------------------------>
  //  multi-line string patterns (compositional approach)
  // <------------------------------------------------------------------------>

  export const MLINE = {
    // standalone multi-line string: ":key:: >\n  content"
    SINGLE         : new RegExp(
                                  '^'
                                  + MARKER.KEY_PRFX.source + '?'
                                  + CAP_GRP.KEY.source
                                  + MARKER.COL.source
                                  + ' *'
                                  + MARKER.MLINE_STR.source
                                  + '\\n'
                                  + CAP_GRP.VAL_MSTR.source
                                , 'im'),
    
    // multi-line in comma list: "first, >\n  content"
    IN_COMMA       : new RegExp(
                                  ', *'
                                  + MARKER.MLINE_STR.source
                                  + '\\n'
                                  + CAP_GRP.VAL_MSTR.source
                                , 'im'),
    
    // multi-line in markdown list: "- >\n  content"  
    IN_MKDN_LIST   : new RegExp(
                                  '^'
                                  + ' *'
                                  + MARKER.BULLET.source
                                  + MARKER.MLINE_STR.source
                                  + '\\n'
                                  + CAP_GRP.VAL_MSTR.source
                                , 'im'),
  } as const;

  export const CAML = new RegExp(
                                  '^'
                                  + MARKER.KEY_PRFX.source + '?'
                                  + CAP_GRP.KEY.source
                                  + MARKER.COL.source
                                  + '('
                                    // single
                                    + CAP_GRP.VAL.source
                                    // list-comma
                                    + '(?:, *'
                                      + CAP_GRP.VAL.source
                                    + ')*'
                                    + '|'
                                    // list-mkdn
                                    + '(?:\n *' + '(?:'
                                        + MARKER.BULLET.source
                                        + CAP_GRP.VAL.source
                                    + ')'
                                  + ')+' + '\n)'
                                  ,'im');
}
