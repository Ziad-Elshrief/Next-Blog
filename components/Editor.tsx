"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Eye,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
} from "lucide-react";
import { Dispatch, SetStateAction } from "react";

type TiptapEditorProps = {
  onSave: (content: string) => void;
  onPreview: Dispatch<SetStateAction<string>>;
  initialContent?: string;
};

const TiptapEditor = ({
  onSave,
  onPreview,
  initialContent,
}: TiptapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent || "<p>Start writing...</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "p-4 border rounded-lg min-h-[200px] focus:outline-none focus:border-sky-700 bg-background-900",
      },
    },
  });

  if (!editor) return null;

  const handleSave = () => {
    onSave(editor.getHTML());
  };
  const handlePreview = () => {
    onPreview(editor.getHTML());
  };

  return (
    <div className="border-foreground/30 bg-background-600 rounded-lg border p-4">
      <div className="mb-2 flex flex-wrap space-x-2">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`cursor-pointer rounded-lg p-2 ${editor.isActive("heading", { level: 1 }) ? "bg-sky-700 text-white" : "bg-gray-300"}`}
        >
          <Heading1 className="size-5" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`cursor-pointer rounded-lg p-2 ${editor.isActive("heading", { level: 2 }) ? "bg-sky-700 text-white" : "bg-gray-300"}`}
        >
          <Heading2 className="size-5" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`cursor-pointer rounded-lg p-2 ${editor.isActive("heading", { level: 3 }) ? "bg-sky-700 text-white" : "bg-gray-300"}`}
        >
          <Heading3 className="size-5" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={`cursor-pointer rounded-lg p-2 ${editor.isActive("heading", { level: 4 }) ? "bg-sky-700 text-white" : "bg-gray-300"}`}
        >
          <Heading4 className="size-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`cursor-pointer rounded-lg p-2 ${editor.isActive("bulletList") ? "bg-sky-700 text-white" : "bg-gray-300"}`}
        >
          <List className="size-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`cursor-pointer rounded-lg p-2 ${editor.isActive("orderedList") ? "bg-sky-700 text-white" : "bg-gray-300"}`}
        >
          <ListOrdered className="size-5" />
        </button>
        <button
          onClick={handlePreview}
          className="cursor-pointer rounded-lg bg-sky-900 p-2 text-white"
        >
          <Eye className="size-5" />
        </button>
      </div>

      <div className="max-h-[350px] min-h-[200px] overflow-auto">
        <EditorContent editor={editor} className="tiptap" />
      </div>
      <button
        onClick={handleSave}
        className="mt-6 h-9 cursor-pointer rounded-lg bg-sky-600 px-4 py-2 text-white shadow hover:bg-sky-500"
      >
        Save Post
      </button>
    </div>
  );
};

export default TiptapEditor;
