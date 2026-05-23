import { getAllCharacters, getMetafieldValue } from '@/lib/cosmic'
import CharacterCard from '@/components/CharacterCard'

export default async function CharactersPage() {
  const characters = await getAllCharacters()

  const goodTeam = characters.filter((c) => {
    const team = getMetafieldValue(c.metadata?.team).toLowerCase()
    return team.includes('good')
  })
  const badTeam = characters.filter((c) => {
    const team = getMetafieldValue(c.metadata?.team).toLowerCase()
    return team.includes('bad')
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="manga-title text-5xl gradient-text mb-2">Characters</h1>
      <p className="text-gray-400 mb-10">Heroes and villains of the manga war.</p>

      {goodTeam.length > 0 && (
        <section className="mb-16">
          <h2 className="manga-title text-3xl gradient-text mb-6">🛡️ Good Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {goodTeam.map((char) => <CharacterCard key={char.id} character={char} />)}
          </div>
        </section>
      )}

      {badTeam.length > 0 && (
        <section className="mb-16">
          <h2 className="manga-title text-3xl villain-text mb-6">⚔️ Bad Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {badTeam.map((char) => <CharacterCard key={char.id} character={char} />)}
          </div>
        </section>
      )}

      {characters.length === 0 && (
        <p className="text-gray-500 text-center py-20">No characters yet.</p>
      )}
    </div>
  )
}