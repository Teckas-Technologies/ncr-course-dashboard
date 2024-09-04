"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import Heading from "@tiptap/extension-heading";
import CodeBlock from "@tiptap/extension-code-block";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";

export default function TipTap({
  content,
  onChange,
  disabled,
  isNewLesson,
  disableEdit,
  setIsEditable,
}: {
  content: string;
  onChange: (richText: string) => void;
  disabled: boolean;
  isNewLesson: boolean;
  disableEdit: boolean;
  setIsEditable: (e: boolean) => void;
}) {
  const [isEditorEditable, setEditorEditable] = useState(!disabled);
  const [toolBar, setToolBar] = useState(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
      }),
      Heading.configure({
        HTMLAttributes: {
          class: "text-xl font-bold",
          levels: [2],
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: "bg-stone-800 text-white p-2 rounded-lg mx-2 my-2",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "border border-collapse px-3 py-1 w-full overflow-scroll",
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: "border border-collapse px-3 py-1",
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: "border border-collapse px-3 py-1",
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: "border border-collapse px-3 py-1",
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
        openOnClick: false,
      }),
    ],
    content: content,
    editable: isEditorEditable,
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[150px] border-input bg-back disabled:cursor-not-allowed disabled:opacity-50 p-2",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  useEffect(() => {
    if (editor) {
      // Update editor options based on `isEditorEditable` state
      editor.setOptions({ editable: isEditorEditable });
      setIsEditable(editor.isEditable);
    }
  }, [isEditorEditable, editor]);

  useEffect(() => {
    // Ensure editor editability is set correctly based on `isNewLesson` and `disableEdit`
    if (editor) {
      setEditorEditable(isNewLesson && !disableEdit);
    }
  }, [isNewLesson, disableEdit, editor]);

  useEffect(() => {
    // Update parent component about the editor's editability
    if (editor) {
      setIsEditable(editor.isEditable);
    }
  }, [editor?.isEditable, editor]);

  const setEditable = () => {
    setEditorEditable(true);
    setIsEditable(true);
  };

  const setDisableEdit = () => {
    setEditorEditable(false);
    setIsEditable(false);
  };

  return (
    <>
      <div className="flex flex-col justify-stretch min-h-[250px] gap-2 overflow-scroll">
        <Toolbar
          editor={editor}
          setEditable={setEditable}
          disabled={disabled}
          disableEdit={disableEdit}
          setDisableEdit={setDisableEdit}
          toolbar={isEditorEditable}
        />
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
