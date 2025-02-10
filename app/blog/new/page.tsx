"use client";

import parse from "html-react-parser";
import { useState } from "react";
import { db } from "@/utils/firebase";
import { setDoc, doc } from "firebase/firestore";
import TiptapEditor from "@/components/Editor";
import { Input } from "@/components/Input";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const { user } = useUserInfo();
  const [postData, setPostData] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const router = useRouter();
  if (!user) return null;
  const handleSave = async (content: string) => {
    try {
      setPostData(content);
      const postId = crypto.randomUUID();
      await setDoc(doc(db, "posts", postId), {
        postId,
        title: postTitle,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: user.uid,
      });
      router.push(`post/${postId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="bg-background-700 py-16">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-3xl font-bold text-sky-900 dark:text-sky-600">
          Create New Post
        </h1>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="mb-2 block font-medium text-gray-700 dark:text-gray-400"
          >
            Title
          </label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Enter a title..."
            value={postTitle}
            onChange={(e) => setPostTitle(e.currentTarget.value)}
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block font-medium text-gray-700 dark:text-gray-400">
            Content
          </label>
          <TiptapEditor onPreview={setPostData} onSave={handleSave} />
        </div>
        <h2 className="mb-2 font-medium text-gray-700 dark:text-gray-400">
          Preview
        </h2>
        {postData && (
          <div className="tiptap border-foreground/30 bg-background mt-4 rounded-lg border p-4">
            {parse(postData)}
          </div>
        )}
      </div>
    </main>
  );
}
