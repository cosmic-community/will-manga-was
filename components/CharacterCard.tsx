import Link from 'next/link'
import { Character } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CharacterCard({ character }: { character: Character }) {
  const imageUrl = character.metadata?.character_image?.imgix_url
  const name = getMetafieldValue(character.metadata?.name) || character.title
  const team = getMetafieldValue(character.metadata?.team)
  const description = getMetafieldValue(character.metadata?.description)

  const isGood = team.toLowerCase().includes('good')
  const teamColor = isGood ? 'border-red-500' : 'border-purple-500'
  const teamBg = isGood ? 'bg-red-500/20 text-red-300' : 'bg-purple-500/20 text-purple-300'

  return (
    <Link href={`/characters/${character.slug}`} className="group block">
      <div className={`bg-zinc-900 rounded-xl overflow-hidden border-2 ${teamColor} hover:scale-[1.03] transition-all`}>
        {imageUrl && (
          <div className="aspect-square overflow-hidden bg-zinc-800">
            <img
              src={`${imageUrl}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="manga-title text-xl text-white mb-1">{name}</h3>
          {team && (
            <span className={`inline-block text-xs px-2 py-1 rounded ${teamBg} font-semibold mb-2`}>
              {team}
            </span>
          )}
          {description && <p className="text-xs text-gray-400 line-clamp-2">{description}</p>}
        </div>
      </div>
    </Link>
  )
}