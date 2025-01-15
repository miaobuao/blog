import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema

	schema: ({ image }) =>
		z.object({
			title: z.string().optional(),
			description: z.string().optional(),
			tags: z.array(z.string().or(z.number())).optional(),
			date: z.coerce.date().optional(),
			ctime: z.coerce.date().optional(),
			mtime: z.coerce.date().optional(),
			pubDate: z.coerce.date().optional(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			cover: image().optional(),
			draft: z.boolean().optional(),
		}),
})

export const collections = { blog }
