import type { GiscusWidget } from 'giscus'

export type GiscusConfig = Pick<
  GiscusWidget,
  'repo' | 'repoId' | 'category' | 'categoryId' | 'mapping' | 'term' | 'strict' | 'reactionsEnabled' | 'emitMetadata' | 'inputPosition' | 'theme' | 'lang' | 'loading'
>

export interface ThemeConfig {
  site: {
    title: string
    description: string
    locale: `${string}-${string}`
    url?: string
  }
  author: {
    name: string
    email: string
    signature: string
    avatar: {
      url: string
      alt: string
    }
  }
  comment?: {
    giscus?: GiscusConfig
  }
}

export function defineThemeConfig(config: ThemeConfig) {
  return config
}
