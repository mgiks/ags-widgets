import { createComputed, createState } from 'ags'
import { readFile, writeFile } from 'ags/file'
import { Gtk } from 'ags/gtk4'
import { createPoll } from 'ags/time'
import GLib from 'gi://GLib?version=2.0'

const BIRTHDAY = GLib.DateTime.new_local(2006, 8, 31, 0, 0, 0)
const DISPLAY_MODES = ['years', 'days', 'hours', 'minutes', 'seconds']

const [displayMode, setDisplayMode] = createState(
  readFile('/home/mgik/.config/ags/widgets/bar/.cache/display-mode') || 'days',
)

function TimeUntilDeathPanel() {
  const deathDate = BIRTHDAY.add_years(80)!

  const timeDiff = createPoll(
    0,
    1000,
    () => {
      const currentTime = GLib.DateTime.new_now_local()
      GLib.DateTime.new_from_iso8601
      return deathDate.difference(currentTime).valueOf()
    },
  )

  const seconds = timeDiff.as((v) => Math.floor(v / 1000000))
  const minutes = timeDiff.as(() => Math.floor(seconds.get() / 60))
  const hours = timeDiff.as(() => Math.floor(minutes.get() / 60))
  const days = timeDiff.as(() => Math.floor(hours.get() / 24))
  const years = timeDiff.as(() => Math.floor(days.get() / 365))

  const toolTipText = timeDiff.as(() => {
    const y = years.get()
    const d = days.get() % 365
    const h = hours.get() % 24
    const m = minutes.get() % 60
    const s = seconds.get() % 60

    const yearCount = y + ' ' + (y !== 1 ? 'years' : 'year')
    const daysCount = d + ' ' + (d !== 1 ? 'days' : 'day')
    const hoursCount = h + ' ' + (h !== 1 ? 'hours' : 'hour')
    const minutesCount = m + ' ' + (m !== 1 ? 'minutes' : 'minute')
    const secondsCount = s + ' ' + (s !== 1 ? 'seconds' : 'second')

    const toolTipText = [
      yearCount,
      daysCount,
      hoursCount,
      minutesCount,
      secondsCount,
    ].join(' ')

    return toolTipText
  })

  const displayData = createComputed(
    [displayMode, years, days, hours, minutes, seconds],
    (
      displayMode: string,
      years: number,
      days: number,
      hours: number,
      minutes: number,
      seconds: number,
    ) => {
      let timeAmount: number
      switch (displayMode) {
        case 'years':
          timeAmount = years
          break
        case 'days':
          timeAmount = days
          break
        case 'hours':
          timeAmount = hours
          break
        case 'minutes':
          timeAmount = minutes
          break
        case 'seconds':
          timeAmount = seconds
          break
        default:
          timeAmount = 0
          break
      }
      const data = addCommasToNumber(timeAmount) + ' ' + displayMode
      return data
    },
  )

  const [hovered, setHovered] = createState(false)

  return (
    <Gtk.Box
      tooltipText={toolTipText}
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel']}
    >
      <Gtk.GestureClick onPressed={cycleDisplayMode} />
      <Gtk.EventControllerMotion
        onEnter={() => setHovered(true)}
        onLeave={() => setHovered(false)}
      />

      <Gtk.Box spacing={3}>
        <Gtk.Image iconName='skull' />
        <Gtk.Label label={displayData} />
      </Gtk.Box>
      <Gtk.Revealer
        transitionDuration={150}
        revealChild={hovered}
        transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
      >
        <Gtk.Label label={' left alive'} />
      </Gtk.Revealer>
    </Gtk.Box>
  )
}

function addCommasToNumber(n: number) {
  const numberAsString = n.toString()
  let reversedNumberAsStringWithCommas = ''
  let charCounter = 0

  for (let i = numberAsString.length - 1; i >= 0; i--) {
    charCounter++
    reversedNumberAsStringWithCommas += numberAsString[i]
    if (charCounter == 3 && i !== 0) {
      reversedNumberAsStringWithCommas += ','
      charCounter = 0
    }
  }

  return reversedNumberAsStringWithCommas.split('').reverse().join('')
}

function cycleDisplayMode() {
  const displayModeIndex = DISPLAY_MODES.indexOf(
    displayMode.get(),
  )

  setDisplayMode(
    DISPLAY_MODES[
      displayModeIndex < DISPLAY_MODES.length - 1 ? displayModeIndex + 1 : 0
    ],
  )

  writeDisplayModeToCache()
}

function writeDisplayModeToCache() {
  writeFile(
    '/home/mgik/.config/ags/widgets/bar/.cache/display-mode',
    displayMode.get(),
  )
}

export default TimeUntilDeathPanel
