import Link from 'next/link'
import { Manga } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function MangaCard({ manga }: { manga: Manga }) {
  const coverUrl = manga.metadata?.cover_image?.imgix_url
  const title = getMetafieldValue(manga.metadata?.title) || manga.title
  const synopsis = getMetafieldValue(manga.metadata?.synopsis)
  const volumeNum = manga.metadata?.volume_number
  const status = getMetafieldValue(manga.metadata?.status)
  const totalPages = manga.metadata?.total_pages

  return (
    <Link href={`/mangas/${manga.slug}`} className="group block">
      <div className="bg-gradient-to-br from-zinc-900 to-black rounded-xl overflow-hidden border border-red-900/30 hover:border-red-500 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20">
        {coverUrl && (
          <div className="aspect-[2/3] overflow-hidden bg-zinc-800">
            <img
              src={`${coverUrl}?w=800&h=1200&fit=crop&auto=format,compress`}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-5">
          {volumeNum && (
            <span className="text-xs text-red-400 font-semibold tracking-wider">VOLUME {volumeNum}</span>
          )}
          <h3 className="manga-title text-2xl mt-1 mb-2 text-white group-hover:text-red-400 transition">{title}</h3>
          {synopsis && <p className="text-sm text-gray-400 line-clamp-3 mb-3">{synopsis}</p>}
          <div className="flex items-center justify-between text-xs">
            {status && <span className="px-2 py-1 bg-red-900/40 rounded text-red-300">{status}</span>}
            {totalPages && <span className="text-gray-500">{totalPages} pages</span>}
          </div>
        </div>
      </div>
    </Link>
  )
}