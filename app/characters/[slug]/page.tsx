// app/characters/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCharacterBySlug, getMetafieldValue } from '@/lib/cosmic'

export default async function CharacterDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const character = await getCharacterBySlug(slug)

  if (!character) notFound()

  const imageUrl = character.metadata?.character_image?.imgix_url
  const name = getMetafieldValue(character.metadata?.name) || character.title
  const team = getMetafieldValue(character.metadata?.team)
  const description = getMetafieldValue(character.metadata?.description)
  const abilities = getMetafieldValue(character.metadata?.abilities)
  const fate = getMetafieldValue(character.metadata?.fate)

  const isGood = team.toLowerCase().includes('good')
  const accentClass = isGood ? 'gradient-text' : 'villain-text'
  const teamBg = isGood ? 'bg-red-500/20 text-red-300 border-red-500' : 'bg-purple-500/20 text-purple-300 border-purple-500'

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link href="/characters" className="text-red-400 hover:text-red-300 text-sm mb-6 inline-block">← All characters</Link>

      <div className="grid md:grid-cols-2 gap-10">
        {imageUrl && (
          <div className="aspect-square rounded-xl overflow-hidden border-2 border-zinc-800">
            <img
              src={`${imageUrl}?w=1000&h=1000&fit=crop&auto=format,compress`}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div>
          {team && (
            <span className={`inline-block text-xs px-3 py-1 rounded border ${teamBg} font-semibold mb-3 tracking-wider`}>
              {team.toUpperCase()}
            </span>
          )}
          <h1 className={`manga-title text-6xl mb-4 ${accentClass}`}>{name}</h1>
          
          {description && (
            <div className="mb-6">
              <p className="text-gray-300 leading-relaxed text-lg">{description}</p>
            </div>
          )}

          {abilities && (
            <div className="mb-6 bg-zinc-900/50 border border-zinc-800 rounded-lg p-5">
              <h3 className="text-red-400 font-semibold tracking-wider text-sm mb-2">⚡ ABILITIES</h3>
              <p className="text-gray-300">{abilities}</p>
            </div>
          )}

          {fate && (
            <div className="bg-gradient-to-br from-purple-900/30 to-red-900/30 border border-purple-500/30 rounded-lg p-5">
              <h3 className="text-purple-400 font-semibold tracking-wider text-sm mb-2">💀 FATE</h3>
              <p className="text-gray-300 italic">{fate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}