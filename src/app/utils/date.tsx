export function ExtractLocaleHoursMinutes(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
}