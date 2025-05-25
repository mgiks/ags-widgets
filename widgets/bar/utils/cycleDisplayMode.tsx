import { readFile, Variable, writeFile } from 'astal'

const displayModes = ['years', 'days', 'hours', 'minutes', 'seconds']
const displayModeToIndex = displayModes.reduce((acc, cur, i) => {
  acc[cur] = i
  return acc
}, {} as { [key: string]: number })

let initialDisplayMode = readFile(
  '/home/mgik/.config/ags/widgets/bar/.cache/display-mode',
)
if (!initialDisplayMode) initialDisplayMode = 'days'

const currentDisplayModeIndex = Variable(displayModeToIndex[initialDisplayMode])

export function cycleDisplayMode() {
  if (currentDisplayModeIndex.get() < displayModes.length - 1) {
    currentDisplayModeIndex.set(currentDisplayModeIndex.get() + 1)
  } else {
    currentDisplayModeIndex.set(0)
  }
  writeFile(
    '/home/mgik/.config/ags/widgets/bar/.cache/display-mode',
    displayModes[currentDisplayModeIndex.get()],
  )
}
