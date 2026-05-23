// app/mangas/[slug]/page/[pageNum]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMangaBySlug, getPagesByManga, getMetafieldValue } from '@/lib/cosmic'

export default async function MangaReaderPage({
  params,
}: {
  params: Promise<{ slug: string; pageNum: string }>
}) {
  const { slug, pageNum } = await params
  const manga = await getMangaBySlug(slug)

  if (!manga) notFound()

  const pages = await getPagesByManga(manga.id)
  const currentPageNum = parseInt(pageNum, 10)
  const currentPage = pages.find((p) => p.metadata?.page_number === currentPageNum)

  if (!currentPage) notFound()

  const currentIndex = pages.findIndex((p) => p.metadata?.page_number === currentPageNum)
  const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null
  const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null

  const pageImg = currentPage.metadata?.page_image?.imgix_url
  const sceneDesc = getMetafieldValue(currentPage.metadata?.scene_description)
  const mangaTitle = getMetafieldValue(manga.metadata?.title) || manga.title

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <Link href={`/mangas/${manga.slug}`} className="text-red-400 hover:text-red-300 text-sm">
          ← {mangaTitle}
        </Link>
        <span className="text-gray-400 text-sm">
          Page {currentPageNum} of {pages.length}
        </span>
      </div>

      {pageImg && (
        <div className="bg-black rounded-xl overflow-hidden border border-red-900/30 mb-6">
          <img
            src={`${pageImg}?w=1600&fit=max&auto=format,compress`}
            alt={`Page ${currentPageNum}`}
            className="w-full h-auto"
          />
        </div>
      )}

      {sceneDesc && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 mb-6">
          <p className="text-sm text-red-400 font-semibold tracking-wider mb-2">SCENE</p>
          <p className="text-gray-300 leading-relaxed">{sceneDesc}</p>
        </div>
      )}

      <div className="flex justify-between gap-4">
        {prevPage ? (
          <Link
            href={`/mangas/${manga.slug}/page/${prevPage.metadata?.page_number}`}
            className="flex-1 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-center font-semibold transition"
          >
            ← Previous
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextPage ? (
          <Link
            href={`/mangas/${manga.slug}/page/${nextPage.metadata?.page_number}`}
            className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-center font-semibold transition"
          >
            Next →
          </Link>
        ) : (
          <Link
            href={`/mangas/${manga.slug}`}
            className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-center font-semibold transition"
          >
            Finish ★
          </Link>
        )}
      </div>
    </div>
  )
}