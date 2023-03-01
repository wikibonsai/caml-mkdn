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
