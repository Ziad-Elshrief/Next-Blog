import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RecentPosts() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold text-sky-900 dark:text-sky-600">
          Recent Posts
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((post) => (
            <div
              key={post}
              className="bg-background-700 rounded-lg p-6 shadow-md"
            >
              <h3 className="text-foreground mb-2 text-xl font-semibold">
                Blog Post Title {post}
              </h3>
              <p className="mb-4 line-clamp-2 text-sky-600">
                A brief excerpt from the blog post goes here...
              </p>
              <Link
                href="/"
                className="flex animate-bounce cursor-pointer items-center gap-x-1.5 text-sky-700 underline visited:text-purple-700 hover:text-sky-600"
              >
                Read More <ArrowRight className="size-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
