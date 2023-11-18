/* eslint-disable prettier/prettier */
export const Mixins = {
  flex: (direction, alignItems, justifyContent) => {
    return {
        flexDirection: direction,
        alignItems: alignItems,
        justifyContent: justifyContent
    };
  },

  flexJustify: (direction, justifyContent) => {
    return {
        flexDirection: direction,
        justifyContent: justifyContent
    };
  },

  flexAlign: (direction, alignItems) => {
    return {
        flexDirection: direction,
        alignItems: alignItems
    };
  },

  alignJustify: (alignItems, justifyContent) => {
    return {
        alignItems: alignItems,
        justifyContent: justifyContent
    };
  },

  fontStyle: (color, size) => {
    return {
        fontSize: size,
        color: color
    };
  },
};