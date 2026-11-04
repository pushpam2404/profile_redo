const fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });

export function formatVizagTime(d: Date): string {
  return `${fmt.format(d)} IST`;
}
