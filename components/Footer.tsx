export default function Footer() {
  return (
    <footer className="border-t border-red-900/30 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
        <p className="manga-title text-xl gradient-text mb-2">WILL MANGA WAS</p>
        <p>The epic battle for the universe. © {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}