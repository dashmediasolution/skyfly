
"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  undo,
  redo,
  undoDepth,
  redoDepth,
} from "@tiptap/pm/history";
import Link from "@tiptap/extension-link";
import {
  Table,
  TableRow,
  TableCell,
  TableHeader,
} from "@tiptap/extension-table";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  Table as TableIcon,
  Trash2,
  Columns3,
  Rows3,
} from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function TiptapEditor({ value, onChange }: Props) {
  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit.configure({
        undoRedo: {},
        heading: {
          levels: [1, 2, 3],
        },
      }),

      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
        },
        isAllowedUri: (url, options) => {
          return options.defaultValidate(url);
        },
      }),

      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "editor-table",
        },
      }),

      TableRow,
      TableHeader,
      TableCell,
    ],

    content: value || "<p></p>",

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class: "tiptap focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (!editor) return;

    const newContent = value || "<p></p>";

    if (editor.getHTML() !== newContent) {
      editor.commands.setContent(newContent, {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="h-80 animate-pulse rounded-lg bg-gray-100" />
    );
  }

  const currentEditor = editor;

  const buttons = [
    {
      label: "Bold",
      icon: Bold,
      action: () =>
        currentEditor.chain().focus().toggleMark("bold").run(),
      active: currentEditor.isActive("bold"),
      disabled: false,
    },
    {
      label: "Italic",
      icon: Italic,
      action: () =>
        currentEditor.chain().focus().toggleMark("italic").run(),
      active: currentEditor.isActive("italic"),
      disabled: false,
    },
    {
      label: "Heading 1",
      icon: Heading1,
      action: () =>
        currentEditor
          .chain()
          .focus()
          .toggleHeading({ level: 1 })
          .run(),
      active: currentEditor.isActive("heading", { level: 1 }),
      disabled: false,
    },
    {
      label: "Heading 2",
      icon: Heading2,
      action: () =>
        currentEditor
          .chain()
          .focus()
          .toggleNode("heading", "paragraph", { level: 2 })
          .run(),
      active: currentEditor.isActive("heading", { level: 2 }),
      disabled: false,
    },
    {
      label: "Heading 3",
      icon: Heading3,
      action: () =>
        currentEditor
          .chain()
          .focus()
          .toggleNode("heading", "paragraph", { level: 3 })
          .run(),
      active: currentEditor.isActive("heading", { level: 3 }),
      disabled: false,
    },
    {
      label: "Bullet list",
      icon: List,
      action: () =>
        currentEditor
          .chain()
          .focus()
          .toggleList("bulletList", "listItem")
          .run(),
      active: currentEditor.isActive("bulletList"),
      disabled: false,
    },
    {
      label: "Numbered list",
      icon: ListOrdered,
      action: () =>
        currentEditor
          .chain()
          .focus()
          .toggleList("orderedList", "listItem")
          .run(),
      active: currentEditor.isActive("orderedList"),
      disabled: false,
    },
    {
      label: "Quote",
      icon: Quote,
      action: () =>
        currentEditor
          .chain()
          .focus()
          .toggleNode("blockquote", "paragraph")
          .run(),
      active: currentEditor.isActive("blockquote"),
      disabled: false,
    },
    {
      label: "Undo",
      icon: Undo,
      action: () =>
        currentEditor
          .chain()
          .focus()
          .command(({ state, dispatch }) => undo(state, dispatch))
          .run(),
      active: false,
      disabled: undoDepth(currentEditor.state) === 0,
    },
    {
      label: "Redo",
      icon: Redo,
      action: () =>
        currentEditor
          .chain()
          .focus()
          .command(({ state, dispatch }) => redo(state, dispatch))
          .run(),
      active: false,
      disabled: redoDepth(currentEditor.state) === 0,
    },
  ];

  function insertLink() {
    const previous =
      currentEditor.getAttributes("link").href || "";

    const url = window.prompt("Enter URL", previous);

    if (url === null) return;

    if (!url.trim()) {
      currentEditor
        .chain()
        .focus()
        .extendMarkRange("link")
        .unsetLink()
        .run();

      return;
    }

    try {
      const parsed = new URL(url.trim());

      if (!["http:", "https:"].includes(parsed.protocol)) {
        throw new Error("Invalid URL");
      }

      const isExternal =
        parsed.hostname !== window.location.hostname;

      currentEditor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({
          href: parsed.href,
          target: isExternal ? "_blank" : "_self",
          rel: isExternal
            ? "noopener noreferrer"
            : undefined,
        })
        .run();
    } catch {
      window.alert("Please enter a valid HTTP or HTTPS URL.");
    }
  }

  function insertTable() {
    currentEditor
      .chain()
      .focus()
      .insertTable({
        rows: 3,
        cols: 3,
        withHeaderRow: true,
      })
      .run();
  }

  const tableButtons = [
    {
      label: "Insert Table",
      icon: TableIcon,
      action: insertTable,
      disabled: false,
    },
    {
      label: "Add Column",
      icon: Columns3,
      action: () =>
        currentEditor.chain().focus().addColumnAfter().run(),
      disabled: !currentEditor.can().addColumnAfter(),
    },
    {
      label: "Add Row",
      icon: Rows3,
      action: () =>
        currentEditor.chain().focus().addRowBefore().run(),
      disabled: !currentEditor.can().addRowBefore(),
    },
    {
      label: "Delete Column",
      icon: Trash2,
      action: () =>
        currentEditor.chain().focus().deleteColumn().run(),
      disabled: !currentEditor.can().deleteColumn(),
    },
    {
      label: "Delete Row",
      icon: Trash2,
      action: () =>
        currentEditor.chain().focus().deleteRow().run(),
      disabled: !currentEditor.can().deleteRow(),
    },
    {
      label: "Delete Table",
      icon: Trash2,
      action: () =>
        currentEditor.chain().focus().deleteTable().run(),
      disabled: !currentEditor.can().deleteTable(),
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b bg-gray-50 p-2">
        {buttons.map((button) => {
          const Icon = button.icon;

          return (
            <button
              key={button.label}
              type="button"
              title={button.label}
              aria-label={button.label}
              disabled={button.disabled}
              onMouseDown={(e) => e.preventDefault()}
              onClick={button.action}
              className={`rounded-md p-2 transition ${button.active
                ? "bg-[#538440]/15 text-[#538440]"
                : "text-gray-600 hover:bg-gray-200"
                } disabled:cursor-not-allowed disabled:opacity-30`}
            >
              <Icon size={18} />
            </button>
          );
        })}

        <button
          type="button"
          title="Insert Link"
          aria-label="Insert Link"
          onMouseDown={(e) => e.preventDefault()}
          onClick={insertLink}
          className={`rounded-md p-2 transition ${currentEditor.isActive("link")
            ? "bg-[#538440]/15 text-[#538440]"
            : "text-gray-600 hover:bg-gray-200"
            }`}
        >
          <LinkIcon size={18} />
        </button>

        <div className="mx-1 h-6 w-px bg-gray-300" />

        {tableButtons.map((button, index) => {
          const Icon = button.icon;

          return (
            <button
              key={button.label}
              type="button"
              title={button.label}
              aria-label={button.label}
              disabled={button.disabled}
              onMouseDown={(e) => e.preventDefault()}
              onClick={button.action}
              className={`rounded-md p-2 transition ${index === 0
                ? "bg-[#538440] text-white hover:bg-[#3f6632]"
                : "text-gray-600 hover:bg-gray-200"
                } disabled:cursor-not-allowed disabled:opacity-30`}
            >
              <Icon size={18} />
            </button>
          );
        })}
      </div>

      <div className="max-h-[700px] min-h-[350px] overflow-auto">
        <EditorContent
          editor={currentEditor}
          className="
            min-h-[350px] px-5 py-4

            [&_.tiptap]:min-h-[320px]
            [&_.tiptap]:outline-none

            [&_.tiptap_p]:mb-4
            [&_.tiptap_p]:leading-7
            [&_.tiptap_h1]:mb-4
            [&_.tiptap_h1]:mt-8
            [&_.tiptap_h1]:text-3xl
            [&_.tiptap_h1]:font-bold
            [&_.tiptap_h1]:leading-tight

            [&_.tiptap_h2]:mb-3
            [&_.tiptap_h2]:mt-6
            [&_.tiptap_h2]:text-2xl
            [&_.tiptap_h2]:font-bold

            [&_.tiptap_h3]:mb-3
            [&_.tiptap_h3]:mt-5
            [&_.tiptap_h3]:text-xl
            [&_.tiptap_h3]:font-semibold

            [&_.tiptap_ul]:mb-4
            [&_.tiptap_ul]:list-disc
            [&_.tiptap_ul]:pl-6

            [&_.tiptap_ol]:mb-4
            [&_.tiptap_ol]:list-decimal
            [&_.tiptap_ol]:pl-6

            [&_.tiptap_blockquote]:my-4
            [&_.tiptap_blockquote]:border-l-4
            [&_.tiptap_blockquote]:border-[#538440]
            [&_.tiptap_blockquote]:pl-4
            [&_.tiptap_blockquote]:italic

            [&_.tiptap_a]:text-blue-600
            [&_.tiptap_a]:underline

            [&_.tiptap_table]:my-5
            [&_.tiptap_table]:w-full
            [&_.tiptap_table]:min-w-[500px]
            [&_.tiptap_table]:border-collapse

            [&_.tiptap_th]:border
            [&_.tiptap_th]:border-gray-300
            [&_.tiptap_th]:bg-gray-100
            [&_.tiptap_th]:p-3
            [&_.tiptap_th]:text-left
            [&_.tiptap_th]:font-semibold

            [&_.tiptap_td]:min-w-[100px]
            [&_.tiptap_td]:border
            [&_.tiptap_td]:border-gray-300
            [&_.tiptap_td]:p-3
            [&_.tiptap_td]:align-top

            [&_.tiptap_.selectedCell]:bg-[#538440]/10
            [&_.tiptap_.column-resize-handle]:bg-[#538440]
          "
        />
      </div>
    </div>
  );
}
