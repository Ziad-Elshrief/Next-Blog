import { Input } from "@/components/Input";
import { ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
       <header className="bg-background-900">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-foreground sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-sky-600">Next Blog</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Explore our latest thoughts and ideas on technology, design, and more.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
              <button className="h-9 cursor-pointer rounded-lg bg-sky-600 px-4 py-2 text-white shadow hover:bg-sky-500">
            Read Latest Post
          </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <section className="bg-sky-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-sky-900">Pinned Post</h2>
          <div className="rounded-lg bg-sky-100 p-8 shadow-lg">
            <h3 className="mb-4 text-2xl font-semibold text-sky-800">
              The Future of Web Development
            </h3>
            <p className="mb-4 text-sky-700">
              Explore the cutting-edge technologies shaping the future of web
              development...
            </p>
            <button className="flex animate-bounce cursor-pointer items-center gap-x-1.5 text-sky-700 underline hover:text-sky-800">
              Read More <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </section>

      <section className=" py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-sky-900 dark:text-sky-600">Recent Posts</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((post) => (
              <div
                key={post}
                className="rounded-lg bg-white p-6 shadow-md dark:bg-background-500"
              >
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  Blog Post Title {post}
                </h3>
                <p className="mb-4 text-sky-600">
                  A brief excerpt from the blog post goes here...
                </p>
                <button className="flex animate-bounce cursor-pointer items-center gap-x-1.5 text-sky-700 underline hover:text-sky-600">
                  Read More <ArrowRight className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-sky-900">Stay Updated</h2>
          <p className="mb-8 text-sky-700">
            Subscribe to our newsletter for the latest blog posts and updates.
          </p>
          <form className="mx-auto flex max-w-md gap-4">
            <Input type="email" placeholder="Enter your email" />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover flex h-9 cursor-pointer items-center justify-center gap-x-1.5 rounded-lg px-4 py-2 text-white shadow"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
            <Footer />
    </div>
  );
}
