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
    // multi-line string indicators (YAML block scalar styles)
    // ref: https://yaml.org/spec/1.2.2/#81-block-scalar-headers
    // order matters: longer patterns first to avoid partial matches
    MLINE_STR      : /(>-|>\+|\|-|\|\+|>|\|)/,
  } as const;

  // for whitespace handling...
  export const MARKER_WS = {
    KEY_PRFX       : /(:? ?)/,
    COL            : /( *)::( ?)/,
  } as const;

  export const VALID_CHARS = {
    // todo: add link
    // match: wikilink's RGX.USABLE_CHAR.LINKTYPE
    KEY            : /[^\n\r!:^|[\]`]+/i,
    // permissive: used by parsers (micromark) for character-level tokenization
    VAL            : /[^\n]+/,
    // restrictive: excludes brackets so LINE.KEY doesn't swallow typed wikilinks
    VAL_LINE       : /[^\n[\]]+/,
  } as const;

  export const CAP_GRP = {
    KEY            : new RegExp('(' + VALID_CHARS.KEY.source + ')'),
    VAL            : new RegExp('(' + VALID_CHARS.VAL.source + ')'),
    VAL_LINE       : new RegExp('(' + VALID_CHARS.VAL_LINE.source + ')'),
    // multi-line block body: continuation requires >= 2 spaces (or a tab);
    // blank lines allowed; a line indented < 2 spaces ends the block.
    VAL_MSTR       : /((?:(?:(?:[ ]{2,}|\t).*|[ \t]*)\n)*)/,
  } as const;

  export const LINE = {
    KEY            : new RegExp(
                                  '^'
                                    + MARKER.KEY_PRFX.source + '?'
                                    + CAP_GRP.KEY.source
                                    + MARKER.COL.source
                                    + CAP_GRP.VAL_LINE.source + '?'
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
