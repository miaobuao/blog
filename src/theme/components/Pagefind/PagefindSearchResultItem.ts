import type { PagefindResult } from './pagefind'

export class PagefindSearchResultItem extends HTMLElement {
	constructor(result: PagefindResult) {
		super()
		const title = document.createElement('a')
		title.href = result.url
		title.classList.add('title')
		title.textContent = result.meta.title || 'Untitled'

		const excerpt = document.createElement('p')
		excerpt.classList.add('excerpt')
		excerpt.innerHTML = result.excerpt

		this.appendChild(title)
		this.appendChild(excerpt)
	}
}

customElements.define('pagefind-search-result-item', PagefindSearchResultItem)
