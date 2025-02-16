"use client";

import parse from "html-react-parser";
import { useEffect, useState } from "react";
import TiptapEditor from "@/components/Editor";
import { Input } from "@/components/Input";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createPost } from "@/app/actions/posts";
import toast from "react-hot-toast";

export default function NewPostPage() {
  const { user, isLoading } = useUserInfo();
  const [postData, setPostData] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const router = useRouter();

  const handleSave = async (content: string) => {
    setPostData(content);
    const postId = await createPost(postTitle, content, user?.uid);
    if (postId) {
      router.push(`/blog/post/${postId}`);
      toast.success("Post created");
    } else {
      toast.error("Post was not created");
    }
  };

  // Wait until the user is loaded
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
    if (user?.isBanned) router.replace("/banned");
  }, [isLoading, user, router]);

  return (
    <main className="bg-background-700 py-16">
      {isLoading ? (
        <>
          <span className="sr-only"></span>
          <Loader2 className="text-primary mx-auto mt-20 size-40 animate-spin" />
        </>
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-x-1.5 text-sky-600 hover:text-sky-500"
          >
            <ArrowLeft className="size-4" />
            Back to all posts
          </Link>
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
            <TiptapEditor
              onPreview={setPostData}
              onSave={handleSave}
              saveButtonLabel="Save Post"
            />
          </div>
          <h2 className="mb-2 font-medium text-gray-700 dark:text-gray-400">
            Preview
          </h2>
          <div className="tiptap border-foreground/30 bg-background mt-4 rounded-lg border p-4">
            {postData && <>{parse(postData)}</>}
          </div>
        </div>
      )}
    </main>
  );
}
