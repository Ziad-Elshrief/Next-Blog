import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// This would typically come from a database or API
const posts = [
  {
    postId: "14",
    title: "The Future of Web Development",
    content: "Web development is constantly evolving...",
    author: {
      name: "Jane Doe",
      avatar: "/placeholder.svg?height=80&width=80",
      bio: "Senior Web Developer with 10 years of experience",
    },
    date: "2023-06-01",
  },
  // Add more posts as needed
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const { postId } = await params;
  const post = posts.find((post) => post.postId === postId);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: `${post.content.substring(0, 160)}...`,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = posts.find((post) => post.postId === postId);

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
        <Image
          src={post.author.avatar || "/placeholder.svg"}
          alt={post.author.name}
          width={40}
          height={40}
          className="mr-4 rounded-full"
        />
        <div>
          <p className="text-lg font-semibold text-sky-900 dark:text-sky-600">
            {post.author.name}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>
    </article>
  );
}
