import { Variable, writeFile } from 'astal'

const currentDisplayModeIndex = Variable(0)

export function cycleDisplayMode() {
  const displayModes = ['days', 'hours', 'minutes', 'seconds', 'years']
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
