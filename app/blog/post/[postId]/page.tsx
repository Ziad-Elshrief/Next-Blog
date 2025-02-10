import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft, Ban } from "lucide-react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import parse from "html-react-parser";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const { postId } = await params;
  try {
    const post = (await getDoc(doc(db, "posts", postId))).data();
    if (!post) {
      return {
        title: "Post Not Found",
      };
    }

    return {
      title: post.title,
      description: `${post.content.substring(0, 160)}...`,
    };
  } catch (error) {
    console.log(error);
  }
  return {
    title: "Post Not Found",
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  let post;
  let author;
  try {
    post = (await getDoc(doc(db, "posts", postId))).data();
    if (post) author = (await getDoc(doc(db, "users", post.author))).data();
  } catch (error) {
    console.log(error);
  }
  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-x-1.5 text-sky-600 hover:text-sky-500"
      >
        <ArrowLeft className="size-4" />
        Back to all posts
      </Link>
      <h1 className="mb-4 text-4xl font-bold text-gray-600 dark:text-gray-300">
        {post.title}
      </h1>
      <div className="mb-6 flex items-center">
        {author?.avatar ? (
          <Image
            src={author.avatar || "/placeholder.svg"}
            alt={author.firstName}
            width={40}
            height={40}
            className="mr-4 rounded-full"
          />
        ) : (
          <div className="border-primary-hover text-primary-hover mr-4 flex size-10 items-center justify-center rounded-full border-2 bg-gray-400 text-xl select-none">
            {author ? (
              <>{author.firstName.slice(0, 2).toUpperCase()}</>
            ) : (
              <Ban className="suze-10" />
            )}
          </div>
        )}
        <div>
          <p className="text-lg font-semibold text-sky-900 dark:text-sky-600">
            {author ? (
              <>
                {author.firstName} {author.lastName}
              </>
            ) : (
              "Deleted Account"
            )}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="tiptap">{parse(post.content)}</div>
    </article>
  );
}
