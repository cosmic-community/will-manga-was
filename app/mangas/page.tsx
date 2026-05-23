import { getAllMangas } from '@/lib/cosmic'
import MangaCard from '@/components/MangaCard'

export default async function MangasPage() {
  const mangas = await getAllMangas()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="manga-title text-5xl gradient-text mb-2">All Mangas</h1>
      <p className="text-gray-400 mb-10">Two volumes. Sixty pages. One epic war.</p>
      
      {mangas.length === 0 ? (
        <p className="text-gray-500 text-center py-20">No mangas available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mangas.map((manga) => <MangaCard key={manga.id} manga={manga} />)}
        </div>
      )}
    </div>
  )
}