import PinnedPost from "@/components/PinnedPost";
import { PenBoxIcon } from "lucide-react";
import Link from "next/link";
import { getAllPosts } from "../actions/posts";
import { Suspense } from "react";
import PaginatedPosts from "@/components/PaginatedPosts";

export default function BlogPage() {
  return (
    <>
      <PinnedPost />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
      <PaginatedPosts posts={posts} />
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
