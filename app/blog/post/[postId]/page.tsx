import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Ban } from "lucide-react";
import Link from "next/link";
import parse from "html-react-parser";
import { fortmatDate } from "@/utils/formatPosts";
import { getPostById } from "@/app/actions/posts";
import PostControls from "@/components/PostControls";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = await getPostById(postId);
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
        {post.authorAvatar ? (
          <Image
            src={post.authorAvatar ?? "User"}
            alt={post.authorName}
            width={40}
            height={40}
            className="mr-4 rounded-full"
          />
        ) : (
          <div className="border-primary-hover text-primary-hover mr-4 flex size-10 items-center justify-center rounded-full border-2 bg-gray-400 text-xl select-none">
            {post.authorName ? (
              <>{post.authorName.slice(0, 2).toUpperCase()}</>
            ) : (
              <Ban className="size-10" />
            )}
          </div>
        )}
        <div>
          <p className="text-lg font-semibold text-sky-900 dark:text-sky-600">
            {post.authorName ? <>{post.authorName}</> : "Deleted Account"}
          </p>
          <p className="text-sm text-gray-500">{fortmatDate(post.createdAt)}</p>
        </div>
      </div>
      <PostControls postId={postId} authorId={post.author} />
      <div className="tiptap">{parse(post.content)}</div>
    </article>
  );
}
