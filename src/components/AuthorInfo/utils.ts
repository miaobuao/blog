import type { IPostInfo } from '@/lib/post'

export function aggreateByTag(posts: IPostInfo[]) {
  const res = new Map<string, IPostInfo[]>()
  posts.forEach((p) => {
    p.tags.forEach((t) => {
      if (!res.has(t.toString())) {
        res.set(t.toString(), [])
      }
      res.get(t.toString())?.push(p)
    })
  })
  return res
}
