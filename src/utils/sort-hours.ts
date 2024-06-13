export const sortHours = (hours: string[], sortOrder = 'asc'): string[] => {
  return [...hours].sort((a, b) => {
    const [aHours, aMinutes] = a.split(':').map(Number)
    const [bHours, bMinutes] = b.split(':').map(Number)

    const aTotalMinutes = aHours * 60 + aMinutes
    const bTotalMinutes = bHours * 60 + bMinutes

    if (sortOrder === 'asc') {
      return aTotalMinutes - bTotalMinutes
    } else {
      return bTotalMinutes - aTotalMinutes
    }
  })
}
