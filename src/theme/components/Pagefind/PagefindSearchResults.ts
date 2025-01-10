import type { PagefindResult } from './pagefind'
import { PagefindSearchResultItem } from './PagefindSearchResultItem'

class PagefindSearchResults extends HTMLElement {
	clear() {
		this.innerHTML = ''
	}

	push(result: PagefindResult) {
		const resultItem = new PagefindSearchResultItem(result)
		this.appendChild(resultItem)
	}
}

customElements.define('pagefind-search-results', PagefindSearchResults)
