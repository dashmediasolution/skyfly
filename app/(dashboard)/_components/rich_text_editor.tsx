
'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';

import {
  Bold,
  Italic,
  Underline,
  Link,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  ImageIcon,
  Table as TableIcon,
  Trash2,
  Columns3,
  Rows3,
  Combine,
  Split,
} from 'lucide-react';

import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import UnderlineExtension from '@tiptap/extension-underline';
import LinkExtension from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import ImageExtension from '@tiptap/extension-image';
import { TableKit } from '@tiptap/extension-table';

import { Palette, Highlighter, RotateCcw } from 'lucide-react';

import { useState, useEffect, useCallback } from 'react';
import { BlockBackground } from './extension/BlockBackground';
import { toast } from 'sonner';
import { mergeAttributes } from '@tiptap/core';

// -----------------------------
// Toolbar
// -----------------------------

const MenuBar = ({
  editor,
  addImage,
}: {
  editor: Editor | null;
  addImage: () => void;
}) => {
  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  // Table toolbar actions
  const tableButtons = [
    {
      label: 'Insert Table',
      icon: TableIcon,
      action: () =>
        editor.chain().focus().insertTable({
          rows: 3,
          cols: 3,
          withHeaderRow: true,
        }).run(),
      disabled: false,
    },
    {
      label: 'Add Column Before',
      icon: Columns3,
      action: () => editor.chain().focus().addColumnBefore().run(),
      disabled: !editor.can().addColumnBefore(),
    },
    {
      label: 'Add Column After',
      icon: Columns3,
      action: () => editor.chain().focus().addColumnAfter().run(),
      disabled: !editor.can().addColumnAfter(),
    },
    {
      label: 'Add Row Before',
      icon: Rows3,
      action: () => editor.chain().focus().addRowBefore().run(),
      disabled: !editor.can().addRowBefore(),
    },
    {
      label: 'Add Row After',
      icon: Rows3,
      action: () => editor.chain().focus().addRowAfter().run(),
      disabled: !editor.can().addRowAfter(),
    },
    {
      label: 'Toggle Header Row',
      icon: Heading3,
      action: () => editor.chain().focus().toggleHeaderRow().run(),
      disabled: !editor.can().toggleHeaderRow(),
    },
    {
      label: 'Delete Column',
      icon: Trash2,
      action: () => editor.chain().focus().deleteColumn().run(),
      disabled: !editor.can().deleteColumn(),
    },
    {
      label: 'Delete Row',
      icon: Trash2,
      action: () => editor.chain().focus().deleteRow().run(),
      disabled: !editor.can().deleteRow(),
    },
    {
      label: 'Merge Cells',
      icon: Combine,
      action: () => editor.chain().focus().mergeCells().run(),
      disabled: !editor.can().mergeCells(),
    },
    {
      label: 'Split Cell',
      icon: Split,
      action: () => editor.chain().focus().splitCell().run(),
      disabled: !editor.can().splitCell(),
    },
    {
      label: 'Delete Table',
      icon: Trash2,
      action: () => editor.chain().focus().deleteTable().run(),
      disabled: !editor.can().deleteTable(),
    },
  ];

  return (
    <div className="sticky top-0 z-20 flex flex-wrap gap-2 rounded-t-md border border-b bg-white p-2 dark:bg-gray-800">

      {/* Headings */}

      <Button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} variant={editor.isActive('heading', { level: 1 }) ? 'secondary' : 'outline'} size="sm">
        <Heading1 className="h-4 w-4" />
      </Button>

      <Button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} variant={editor.isActive('heading', { level: 2 }) ? 'secondary' : 'outline'} size="sm">
        <Heading2 className="h-4 w-4" />
      </Button>

      <Button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} variant={editor.isActive('heading', { level: 3 }) ? 'secondary' : 'outline'} size="sm">
        <Heading3 className="h-4 w-4" />
      </Button>

      {/* Text Formatting */}

      <Button type="button" onClick={() => editor.chain().focus().toggleBold().run()} variant={editor.isActive('bold') ? 'secondary' : 'outline'} size="sm">
        <Bold className="h-4 w-4" />
      </Button>

      <Button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} variant={editor.isActive('italic') ? 'secondary' : 'outline'} size="sm">
        <Italic className="h-4 w-4" />
      </Button>

      <Button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} variant={editor.isActive('underline') ? 'secondary' : 'outline'} size="sm">
        <Underline className="h-4 w-4" />
      </Button>

      {/* Text Color */}

      <div className="flex items-center gap-1 rounded-md border bg-white px-2 dark:bg-gray-900">
        <Palette className="h-4 w-4" />

        <input
          type="color"
          title="Text Colour"
          aria-label="Text Colour"
          value={editor.getAttributes('textStyle').color || '#000000'}
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
          className="h-7 w-7 cursor-pointer border-0 bg-transparent"
        />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          title="Remove Text Colour"
          onClick={() => editor.chain().focus().unsetColor().run()}
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      </div>

      {/* Highlight Color */}

      <div className="flex items-center gap-1 rounded-md border bg-white px-2 dark:bg-gray-900">
        <Highlighter className="h-4 w-4" />

        <input
          type="color"
          title="Background Colour"
          aria-label="Background Colour"
          value={editor.getAttributes('highlight').color || '#ffff00'}
          onChange={(e) =>
            editor.chain().focus().setHighlight({ color: e.target.value }).run()
          }
          className="h-7 w-7 cursor-pointer border-0 bg-transparent"
        />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          title="Remove Highlight"
          onClick={() => editor.chain().focus().unsetHighlight().run()}
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      </div>

      {/* Block Background */}

      <div className="flex items-center gap-1 rounded-md border bg-white px-2 dark:bg-gray-900">
        <div className="h-4 w-4 rounded-sm border bg-blue-200" />

        <input
          type="color"
          title="Block Background Colour"
          aria-label="Block Background Colour"
          defaultValue="#e0f2fe"
          onChange={(e) =>
            editor.chain().focus().setBlockBackground(e.target.value).run()
          }
          className="h-7 w-7 cursor-pointer border-0 bg-transparent"
        />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          title="Remove Block Background"
          onClick={() => editor.chain().focus().unsetBlockBackground().run()}
        >
          <RotateCcw className="h-3 w-3" />
        </Button>
      </div>

      {/* Links */}

      <Button type="button" onClick={setLink} variant={editor.isActive('link') ? 'secondary' : 'outline'} size="sm">
        <Link className="h-4 w-4" />
      </Button>

      {/* Image Upload */}

      <Button type="button" onClick={addImage} variant="outline" size="sm" title="Upload Image">
        <ImageIcon className="h-4 w-4" />
      </Button>

      {/* Text Alignment */}

      <Button type="button" onClick={() => editor.chain().focus().setTextAlign('left').run()} variant={editor.isActive({ textAlign: 'left' }) ? 'secondary' : 'outline'} size="sm">
        <AlignLeft className="h-4 w-4" />
      </Button>

      <Button type="button" onClick={() => editor.chain().focus().setTextAlign('center').run()} variant={editor.isActive({ textAlign: 'center' }) ? 'secondary' : 'outline'} size="sm">
        <AlignCenter className="h-4 w-4" />
      </Button>

      <Button type="button" onClick={() => editor.chain().focus().setTextAlign('right').run()} variant={editor.isActive({ textAlign: 'right' }) ? 'secondary' : 'outline'} size="sm">
        <AlignRight className="h-4 w-4" />
      </Button>

      <Button type="button" onClick={() => editor.chain().focus().setTextAlign('justify').run()} variant={editor.isActive({ textAlign: 'justify' }) ? 'secondary' : 'outline'} size="sm">
        <AlignJustify className="h-4 w-4" />
      </Button>

      {/* Lists */}

      <Button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} variant={editor.isActive('bulletList') ? 'secondary' : 'outline'} size="sm">
        <List className="h-4 w-4" />
      </Button>

      <Button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} variant={editor.isActive('orderedList') ? 'secondary' : 'outline'} size="sm">
        <ListOrdered className="h-4 w-4" />
      </Button>

      {/* Table Controls */}

      <div className="flex flex-wrap items-center gap-1 border-l pl-2">
        {tableButtons.map((item) => {
          const Icon = item.icon;

          return (
            <Button
              key={item.label}
              type="button"
              variant="outline"
              size="sm"
              title={item.label}
              disabled={item.disabled}
              onClick={item.action}
              className="gap-1"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden xl:inline text-xs">
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

// -----------------------------
// Main Rich Text Editor
// -----------------------------

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}

export function RichTextEditor({
  value,
  onChange,
  onBlur,
}: RichTextEditorProps) {
  const [, setForceUpdate] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),

      UnderlineExtension,
      TextStyle,
      Color,

      Highlight.configure({
        multicolor: true,
      }),

      BlockBackground,

      LinkExtension.extend({
        renderHTML({ HTMLAttributes }) {
          const href = HTMLAttributes.href || '';

          let isInternal =
            href.startsWith('/') || href.startsWith('#');

          if (href && !isInternal && typeof window !== 'undefined') {
            try {
              const url = new URL(href, window.location.origin);

              const currentHost = window.location.hostname.replace(/^www\./, '');
              const targetHost = url.hostname.replace(/^www\./, '');

              isInternal =
                url.origin === window.location.origin ||
                (targetHost === currentHost &&
                  (url.protocol === 'http:' || url.protocol === 'https:'));
            } catch {
              isInternal = false;
            }
          }

          return [
            'a',
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              target: isInternal ? '_self' : '_blank',
              rel: isInternal
                ? undefined
                : 'noopener noreferrer nofollow',
            }),
            0,
          ];
        },
      }).configure({
        openOnClick: false,
      }),

      // Table functionality

      TableKit.configure({
        table: {
          resizable: true,
          cellMinWidth: 100,
          HTMLAttributes: {
            class: 'editor-table',
          },
        },
        tableHeader: {
          HTMLAttributes: {
            class: 'editor-table-header',
          },
        },
        tableCell: {
          HTMLAttributes: {
            class: 'editor-table-cell',
          },
        },
      }),

      TextAlign.configure({
        types: ['heading', 'paragraph', 'image'],
      }),

      ImageExtension.configure({
        inline: true,
        allowBase64: true,
      }),
    ],

    content: value,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
      setForceUpdate(Date.now());
    },

    onSelectionUpdate() {
      setForceUpdate(Date.now());
    },

    onBlur() {
      onBlur();
    },

    editorProps: {
      attributes: {
        class:
          'prose dark:prose-invert min-h-[400px] w-full max-w-none rounded-b-md border p-4 focus:outline-none bg-white dark:bg-gray-900 [&_img]:rounded-md [&_img]:w-full [&_img]:object-cover [&_img]:mx-auto [&_img]:my-4',
      },
    },

    immediatelyRender: false,
  });

  // -----------------------------
  // Image Upload
  // -----------------------------

  const addImage = useCallback(() => {
    const input = document.createElement('input');

    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];

      if (!file) return;

      const altText = window.prompt(
        'Set Alt Text description for this image:',
        file.name.split('.')[0]
      );

      if (altText === null) return;

      const toastId = toast.loading('Uploading image...');

      try {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('folder', 'skyfly_blogs/content_images');

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok && data.imageUrl) {
          editor?.chain().focus().setImage({
            src: data.imageUrl,
            alt: altText,
          }).run();

          toast.success('Image uploaded successfully', {
            id: toastId,
          });
        } else {
          throw new Error(data.error || 'Upload failed');
        }
      } catch (error) {
        console.error('Editor upload error:', error);

        toast.error(
          error instanceof Error
            ? error.message
            : 'Failed to upload image',
          { id: toastId }
        );
      }
    };

    input.click();
  }, [editor]);

  // -----------------------------
  // Sync External Value
  // -----------------------------

  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      const editorHtml = editor.getHTML();

      if (value !== editorHtml) {
        editor.commands.setContent(value || '', {
          emitUpdate: false,
        });
      }
    }
  }, [value, editor]);

  return (
    <div className="flex flex-col flex-grow">
      <MenuBar editor={editor} addImage={addImage} />

      <EditorContent
        editor={editor}
        className="flex-grow flex flex-col"
      />
    </div>
  );
}
