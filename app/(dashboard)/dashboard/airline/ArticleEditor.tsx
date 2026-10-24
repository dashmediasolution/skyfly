
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import {
  Bold,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Link as LinkIcon,
  Undo2,
  Redo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type ArticleEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ArticleEditor({
  value,
  onChange,
}: ArticleEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
          rel: "noopener noreferrer",
        },
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[300px] p-4 focus:outline-none dark:prose-invert",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="min-h-[300px] animate-pulse rounded-md border" />
    );
  }

  const tools = [
    {
      label: "Bold",
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      label: "Italic",
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      label: "Heading",
      icon: Heading2,
      action: () =>
        editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
    },
    {
      label: "Bulleted list",
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },
    {
      label: "Numbered list",
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
    {
      label: "Undo",
      icon: Undo2,
      action: () => editor.chain().focus().undo().run(),
      active: false,
    },
    {
      label: "Redo",
      icon: Redo2,
      action: () => editor.chain().focus().redo().run(),
      active: false,
    },
  ];

  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <div className="flex flex-wrap items-center gap-1 p-2">
        {tools.map(({ label, icon: Icon, action, active }) => (
          <Button
            key={label}
            type="button"
            size="icon"
            variant={active ? "secondary" : "ghost"}
            title={label}
            aria-label={label}
            onClick={action}
          >
            <Icon className="h-4 w-4" />
          </Button>
        ))}

        <Separator orientation="vertical" className="mx-1 h-6" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          title="Insert link"
          aria-label="Insert link"
          onClick={() => {
            const url = window.prompt("Enter the link URL");
            if (url) {
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
            }
          }}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>

      <Separator />

      <EditorContent editor={editor} />
    </div>
  );
}
