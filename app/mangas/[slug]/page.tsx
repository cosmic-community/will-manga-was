// app/mangas/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getMangaBySlug, getPagesByManga, getMetafieldValue } from '@/lib/cosmic'
import CharacterCard from '@/components/CharacterCard'

export default async function MangaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const manga = await getMangaBySlug(slug)

  if (!manga) notFound()

  const pages = await getPagesByManga(manga.id)
  const coverUrl = manga.metadata?.cover_image?.imgix_url
  const title = getMetafieldValue(manga.metadata?.title) || manga.title
  const synopsis = getMetafieldValue(manga.metadata?.synopsis)
  const volumeNum = manga.metadata?.volume_number
  const status = getMetafieldValue(manga.metadata?.status)
  const totalPages = manga.metadata?.total_pages
  const featuredChars = manga.metadata?.featured_characters || []

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link href="/mangas" className="text-red-400 hover:text-red-300 text-sm mb-6 inline-block">← Back to mangas</Link>
      
      <div className="grid md:grid-cols-3 gap-10 mb-16">
        {coverUrl && (
          <div className="aspect-[2/3] rounded-xl overflow-hidden border border-red-900/30">
            <img
              src={`${coverUrl}?w=900&h=1350&fit=crop&auto=format,compress`}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="md:col-span-2">
          {volumeNum && <p className="text-red-400 font-semibold tracking-widest text-sm">VOLUME {volumeNum}</p>}
          <h1 className="manga-title text-5xl gradient-text mb-4">{title}</h1>
          <div className="flex gap-3 mb-6">
            {status && <span className="px-3 py-1 bg-red-900/40 rounded text-red-300 text-sm">{status}</span>}
            {totalPages && <span className="px-3 py-1 bg-zinc-800 rounded text-gray-300 text-sm">{totalPages} pages</span>}
          </div>
          {synopsis && <p className="text-lg text-gray-300 leading-relaxed mb-8">{synopsis}</p>}
          
          {pages.length > 0 && pages[0] && (
            <Link
              href={`/mangas/${manga.slug}/page/${pages[0].metadata?.page_number || 1}`}
              className="inline-block px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
            >
              Start Reading →
            </Link>
          )}
        </div>
      </div>

      {featuredChars.length > 0 && (
        <section className="mb-16">
          <h2 className="manga-title text-3xl mb-6 villain-text">Featured Characters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredChars.map((char) => <CharacterCard key={char.id} character={char} />)}
          </div>
        </section>
      )}

      {pages.length > 0 && (
        <section>
          <h2 className="manga-title text-3xl mb-6 gradient-text">Pages ({pages.length})</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3">
            {pages.map((page) => {
              const pageNum = page.metadata?.page_number
              const pageImg = page.metadata?.page_image?.imgix_url
              return (
                <Link
                  key={page.id}
                  href={`/mangas/${manga.slug}/page/${pageNum}`}
                  className="aspect-[2/3] rounded overflow-hidden border border-zinc-800 hover:border-red-500 transition relative group"
                >
                  {pageImg && (
                    <img
                      src={`${pageImg}?w=400&h=600&fit=crop&auto=format,compress`}
                      alt={`Page ${pageNum}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <span className="manga-title text-2xl text-white">{pageNum}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}