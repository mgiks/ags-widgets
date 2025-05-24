import { readFile } from 'astal'

type DisplayMode = 'days' | 'hours' | 'minutes' | 'seconds' | 'years'

export function getDisplayMode() {
  const displayMode = readFile(
    '/home/mgik/.config/ags/widgets/bar/.cache/display-mode',
  ) as DisplayMode
  return displayMode || 'days'
}
