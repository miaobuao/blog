import { debounce } from 'lodash-es'

class PagefindSearchInput extends HTMLElement {
	input = this.querySelector('input')!
	clearBtn = this.querySelector('button')!
	results: PagefindSearchResults = this.querySelector(
		'pagefind-search-results',
	)!
	mask: PagefindMask = this.querySelector('pagefind-mask')!

	connectedCallback() {
		this.input.addEventListener('keyup', (e) => {
			if (e.isComposing) {
				return
			}
			this.adjustResultsHeight()
			this.search(this.input.value)
			if (this.input.value.length) {
				this.clearBtn.classList.remove('hidden')
			} else {
				this.clearBtn.classList.add('hidden')
			}
		})

		this.input.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				this.results.clear()
				this.mask.hide()
				this.input.blur()
				e.preventDefault()
			}
		})

		this.input.addEventListener('focus', () => {
			this.adjustResultsHeight()
			this.search(this.input.value)
		})

		this.mask.addEventListener('click', () => {
			this.mask.hide()
			this.results?.clear()
		})

		this.clearBtn.addEventListener('mousedown', (e) => {
			this.input.value = ''
			this.mask?.hide()
			this.results?.clear()
			e.preventDefault()
		})

		// bind ctrl/command + f
		document.addEventListener('keydown', (event) => {
			if (
				(event.ctrlKey || event.metaKey) &&
				event.key === 'f' &&
				!event.shiftKey
			) {
				event.preventDefault()
				this.input.focus()
				this.mask.show()
			}
		})

		if (this.input.value.length) {
			this.search(this.input.value)
			this.clearBtn.classList.remove('hidden')
		}
	}

	search = debounce(async (text) => {
		if (!text.length) {
			return
		}
		// @ts-expect-error pagefind 定义在 window 上
		const searchResults = await pagefind.search(text)
		this.results.clear()
		if (searchResults.results.length) {
			this.mask?.show()
		}
		searchResults.results.forEach(async (res) => {
			this.results.push(await res.data())
		})
	}, 200)

	adjustResultsHeight() {
		const resultRect = this.results.getBoundingClientRect()
		const maxHeight = window.innerHeight - resultRect.top
		this.results.style.maxHeight = `${maxHeight}px`
	}
}

customElements.define('pagefind-search-input', PagefindSearchInput)
