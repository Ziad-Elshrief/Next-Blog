import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PinnedPost() {
  return (
    <section className="bg-background-800 py-16">
    <div className="container mx-auto px-4">
      <h2 className="mb-8 text-3xl font-bold text-sky-900 dark:text-sky-600">
        Pinned Post
      </h2>
      <div className="rounded-lg bg-sky-100 p-8 shadow-lg">
        <h3 className="mb-4 text-2xl font-semibold text-sky-800">
          The Future of Web Development
        </h3>
        <p className="mb-4 text-sky-700 line-clamp-2">
          Explore the cutting-edge technologies shaping the future of web
          development...
        </p>
        <Link
          href="/"
          className="flex animate-bounce cursor-pointer items-center gap-x-1.5 text-sky-700 underline visited:text-purple-700 hover:text-sky-600"
        >
          Read More <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  </section>
  )
}