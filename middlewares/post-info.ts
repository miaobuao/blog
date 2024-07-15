import { sequence } from 'astro/middleware'
import { defineMiddleware } from 'astro:middleware'
import { getMarkdownFilePath, getTagsFromId } from '@/lib/file'
import { getFirstCommitTime, getGitTimestamp } from '@/lib/git'

const prepare = defineMiddleware(async (context, next) => {
  context.locals.post = {}
  if (typeof context.props.collection === 'string' && typeof context.props.id === 'string') {
    context.locals.isPost = true
  }
  else {
    context.locals.isPost = false
  }
  return next()
})

const getCreateTime = defineMiddleware(async (context, next) => {
  if (context.locals.isPost) {
    const ctime = context.props.data?.pubDate || context.props.data?.date || await getFirstCommitTime(
      getMarkdownFilePath(context.props.collection, context.props.id),
    )
    context.locals.post.ctime = ctime
  }
  return next()
})

const getModifyTime = defineMiddleware(async (context, next) => {
  if (context.locals.isPost) {
    const mtime = context.props.data?.updatedDate || await getGitTimestamp(
      getMarkdownFilePath(context.props.collection, context.props.id),
    )
    context.locals.post.mtime = mtime
  }
  return next()
})

const getTags = defineMiddleware(async (context, next) => {
  if (context.locals.isPost) {
    const tags = context.props.data?.tags || getTagsFromId(context.props.id)
    context.locals.post.tags = tags
  }
  return next()
})

export const onRequest = sequence(prepare, getCreateTime, getModifyTime, getTags)
