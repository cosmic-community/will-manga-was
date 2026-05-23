# Will Manga Was
![App Preview](https://imgix.cosmicjs.com/3165c4b0-56d2-11f1-97f1-6d8ebd88a07e-autopilot-photo-1607604276583-eef5d076aa5f-1779559619693.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

An epic manga website featuring the battle of Wolter & Flexigirl versus Woxer & the Slime army.

## Features
- 📖 Browse two complete 30-page manga volumes
- 🦸 Character profiles with team affiliations
- 📄 Full manga reader with page navigation
- 🎨 Dark, dramatic manga-inspired UI
- 📱 Fully responsive design

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a11ec53f2c683f5f2b2f03e&clone_repository=6a11ed74f2c683f5f2b2f0a0)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "I will do a manga that was 30 pages about the team of wolter and flexigirl and th other hand bad team of woxer and mini slimes and the king slime that they were fighting about the universe means good team tries to protect but the other tries to attack and and of that wolter dies and transforms into a controller titan of wolter and kills woxer and after the slime covers the wolter and both die but there was one left flexigirl. And she cries after this and they don't like anything flexi girl looks like flame girl and wolter and woxer likes twins and the changed colour of one punch and slimes looks like Minecraft slimes but they were ate and the boss slime is equal to the Minecraft slimes. You will do the fight your own. There were 2 mangas . Each one have 30 pages"

### Code Generation Prompt

> Build a Next.js application for a website called "Will manga was". The content is managed in Cosmic CMS with the following object types: mangas, characters, pages. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

## Technologies
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Cosmic CMS

## Getting Started

### Prerequisites
- Bun installed
- Cosmic account

### Installation
```bash
bun install
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all mangas
const { objects } = await cosmic.objects.find({ type: 'mangas' }).depth(1)

// Fetch pages for a manga
const { objects } = await cosmic.objects
  .find({ type: 'pages', 'metadata.manga': mangaId })
  .depth(1)
```

## Cosmic CMS Integration
This app connects to your Cosmic bucket and reads mangas, characters, and pages using the Cosmic SDK with depth queries for object relationships.

## Deployment
Deploy on Vercel or Netlify. Set `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, and `COSMIC_WRITE_KEY` environment variables.

<!-- README_END -->