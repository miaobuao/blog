import { Language } from '@/consts'

export function formatDatetime(date: Date) {
  return new Intl.DateTimeFormat(
    Language,
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    },
  ).format(date)
}
