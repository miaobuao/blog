const fs = require('fs')
const path = require('path')

const imageRegex = /!\[.*?\]\((.*?)\)/g

function checkImagesInMarkdown(dirPath) {
	const items = fs.readdirSync(dirPath)

	items.forEach((item) => {
		const fullPath = path.join(dirPath, item)
		const stats = fs.statSync(fullPath)

		if (stats.isDirectory()) {
			checkImagesInMarkdown(fullPath)
		} else if (
			stats.isFile() &&
			(item.endsWith('.md') || item.endsWith('.mdx'))
		) {
			const content = fs.readFileSync(fullPath, 'utf8')
			const lines = content.split('\n')

			lines.forEach((line, lineNumber) => {
				let match
				while ((match = imageRegex.exec(line)) !== null) {
					const imagePath = match[1]
					const imageFullPath = path.resolve(dirPath, imagePath)

					if (!fs.existsSync(imageFullPath)) {
						const charPosition = match.index + 1
						console.warn(
							`位置: ${fullPath}:${lineNumber + 1}:${charPosition}\n引用: ${imageFullPath}\n`,
						)
					}
				}
			})
		}
	})
}

checkImagesInMarkdown(path.resolve(__dirname, '../src/content'))
