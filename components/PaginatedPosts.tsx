"use client"

import { extractFirstParagraph, fortmatDate } from "@/utils/formatPosts"
import Link from "next/link"
import Pagination from "./PaginationToolbar"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { DocumentData } from "firebase/firestore"


export default function PaginatedPosts({posts}:{posts:DocumentData[]}) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 5
    const totalPages = Math.ceil(posts.length / postsPerPage)

    useEffect(() => {
        const page = Number(searchParams.get("page")) || 1
        setCurrentPage(page)
      }, [searchParams])
    
      const indexOfLastPost = currentPage * postsPerPage
      const indexOfFirstPost = indexOfLastPost - postsPerPage
      const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    
      const handlePageChange = (page: number) => {
        router.push(`/blog?page=${page}`)
      }
  return (
    <>
    {currentPosts.map((post) => (
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
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  )
}