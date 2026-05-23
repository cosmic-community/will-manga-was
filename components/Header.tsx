import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-red-900/50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="manga-title text-3xl gradient-text font-bold">
          WILL MANGA WAS
        </Link>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-red-400 transition">Home</Link>
          <Link href="/mangas" className="hover:text-red-400 transition">Mangas</Link>
          <Link href="/characters" className="hover:text-red-400 transition">Characters</Link>
        </nav>
      </div>
    </header>
  )
}