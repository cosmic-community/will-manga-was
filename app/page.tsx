import Link from 'next/link'
import { getAllMangas, getAllCharacters, getMetafieldValue } from '@/lib/cosmic'
import MangaCard from '@/components/MangaCard'
import CharacterCard from '@/components/CharacterCard'

export default async function HomePage() {
  const mangas = await getAllMangas()
  const characters = await getAllCharacters()

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-purple-900/20" />
        <div className="relative max-w-5xl mx-auto text-center">
          <p className="text-red-400 font-semibold tracking-widest text-sm mb-4">A BATTLE FOR THE UNIVERSE</p>
          <h1 className="manga-title text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text">WILL</span>
            <br />
            <span className="villain-text">MANGA WAS</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Wolter and Flexigirl fight to protect the universe from Woxer and his army of slimes.
            Witness the epic battle that ends in tragedy.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/mangas" className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition">
              Read the Manga
            </Link>
            <Link href="/characters" className="px-8 py-3 border-2 border-purple-500 hover:bg-purple-500/20 rounded-lg font-semibold transition">
              Meet the Characters
            </Link>
          </div>
        </div>
      </section>

      {/* Mangas */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-8">
          <h2 className="manga-title text-4xl gradient-text">The Mangas</h2>
          <Link href="/mangas" className="text-red-400 hover:text-red-300 text-sm">View all →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mangas.map((manga) => <MangaCard key={manga.id} manga={manga} />)}
        </div>
      </section>

      {/* Characters */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-end justify-between mb-8">
          <h2 className="manga-title text-4xl villain-text">The Warriors</h2>
          <Link href="/characters" className="text-purple-400 hover:text-purple-300 text-sm">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.slice(0, 8).map((char) => <CharacterCard key={char.id} character={char} />)}
        </div>
      </section>
    </div>
  )
}