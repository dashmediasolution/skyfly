import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    blockBackground: {
      setBlockBackground: (color: string) => ReturnType;
      unsetBlockBackground: () => ReturnType;
    };
  }
}

export const BlockBackground = Extension.create({
  name: "blockBackground",

  addGlobalAttributes() {
    return [
      {
        types: ["paragraph", "heading"],
        attributes: {
          backgroundColor: {
            default: null,

            parseHTML: (element) =>
              element.style.backgroundColor || null,

            renderHTML: (attributes) => {
              if (!attributes.backgroundColor) return {};

              return {
                style: [
                  `background-color: ${attributes.backgroundColor}`,
                  "padding: 16px 20px",
                  "border-radius: 8px",
                  "margin: 12px 0",
                  "box-sizing: border-box",
                ].join("; "),
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setBlockBackground:
        (color) =>
        ({ commands }) => {
          return (
            commands.updateAttributes("paragraph", {
              backgroundColor: color,
            }) ||
            commands.updateAttributes("heading", {
              backgroundColor: color,
            })
          );
        },

      unsetBlockBackground:
        () =>
        ({ commands }) => {
          return (
            commands.resetAttributes("paragraph", "backgroundColor") ||
            commands.resetAttributes("heading", "backgroundColor")
          );
        },
    };
  },
});