import PinnedPost from "@/components/PinnedPost";
import { extractFirstParagraph, fortmatDate } from "@/utils/formatPosts";
import { PenBoxIcon } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "../actions/posts";
import { Suspense } from "react";

export default function BlogPage() {
  return (
    <>
      <PinnedPost />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-sky-900 dark:text-sky-600">
            Blog Posts
          </h2>
          <Link
            href="blog/new"
            className="bg-primary hover:bg-primary-hover flex cursor-pointer items-center justify-center gap-x-1.5 rounded-lg p-2 text-sm text-white shadow"
          >
            <PenBoxIcon className="size-3.5" />
            Create
          </Link>
        </div>
        <div className="grid gap-8">
          <Suspense
            fallback={
              <>
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </>
            }
          >
            <PostsSuspense />
          </Suspense>
        </div>
      </div>
    </>
  );
}

async function PostsSuspense() {
  const posts = (await getAllPosts()) ?? [];
  return (
    <>
      {posts.map((post) => (
        <article
          key={post.postId}
          className="border-b border-gray-200 pb-8 dark:border-gray-700"
        >
          <Link href={`/blog/post/${post.postId}`} className="block">
            <h2 className="mb-2 text-2xl font-bold text-sky-900 hover:text-sky-700 dark:text-sky-600">
              {post.title}
            </h2>
            <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
              {extractFirstParagraph(post.content)}
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
              <span>{post.authorName}</span>
              <span className="mx-2">·</span>
              <span>{fortmatDate(post.createdAt)}</span>
            </div>
          </Link>
        </article>
      ))}
    </>
  );
}

function PostSkeleton() {
  return (
    <article className="animate-pulse overflow-hidden border-b border-gray-200 pb-8 dark:border-gray-700">
      <div className="block">
        <h2 className="mb-2">
          <div className="h-6 w-1/2 rounded-full bg-gray-300 dark:bg-gray-600" />
        </h2>
        <div className="mb-4 space-y-2">
          <div className="h-4 w-full rounded-full bg-gray-300 dark:bg-gray-600" />
          <div className="h-4 w-3/4 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>
        <div className="flex items-center">
          <div className="h-4 w-1/6 rounded-full bg-gray-300 dark:bg-gray-600" />
          <span className="mx-2">·</span>
          <div className="h-4 w-1/6 rounded-full bg-gray-300 dark:bg-gray-600" />
        </div>
      </div>
    </article>
  );
}
