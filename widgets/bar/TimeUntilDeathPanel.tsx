import { GLib, timeout, Variable } from 'astal'
import { Gtk, Widget } from 'astal/gtk4'
import { getDisplayMode } from './utils/getDisplayMode'
import { cycleDisplayMode } from './utils/cycleDisplayMode'
import { addCommasToNumber } from './utils/addCommasToNumber'
import { wrapWithRevealer } from './utils/wrapWithRevealer'
import { Label } from 'astal/gtk4/widget'

const shouldLeftYearsLabelBeRevealed = Variable(false)
const redraw = Variable(false)

function TimeUntilDeathPanel() {
  const birthday = GLib.DateTime.new_local(2006, 8, 31, 0, 0, 0)
  const deathDate = birthday.add_years(80)!

  const timeDiff = Variable(0).poll(
    1000,
    () => {
      const currentTime = GLib.DateTime.new_now_local()
      GLib.DateTime.new_from_iso8601
      return deathDate.difference(currentTime).valueOf()
    },
  )
  const seconds = timeDiff().as((v) => Math.floor(v / 1000000))
  const minutes = timeDiff().as(() => Math.floor(seconds.get() / 60))
  const hours = timeDiff().as(() => Math.floor(minutes.get() / 60))
  const days = timeDiff().as(() => Math.floor(hours.get() / 24))
  const years = timeDiff().as(() => Math.floor(days.get() / 365))

  const toolTipText = timeDiff().as(() => {
    const displayYears = years.get()
    const displayDays = days.get() % 365
    const displayHours = hours.get() % 24
    const displayMinutes = minutes.get() % 60
    const displaySeconds = seconds.get() % 60

    const yearLabel = displayYears !== 1 ? 'years' : 'year'
    const dayLabel = displayDays !== 1 ? 'days' : 'day'
    const hourLabel = displayHours !== 1 ? 'hours' : 'hour'
    const minuteLabel = displayMinutes !== 1 ? 'minutes' : 'minute'
    const secondLabel = displaySeconds !== 1 ? 'seconds' : 'second'

    const yearCount = displayYears + ' ' + yearLabel
    const daysCount = displayDays + ' ' + dayLabel
    const hoursCount = displayHours + ' ' + hourLabel
    const minutesCount = displayMinutes + ' ' + minuteLabel
    const secondsCount = displaySeconds + ' ' + secondLabel

    const toolTipText = [
      yearCount,
      daysCount,
      hoursCount,
      minutesCount,
      secondsCount,
    ].join(' ')

    return toolTipText
  })
  const displayMode = Variable(getDisplayMode())
  const displayData = Variable.derive(
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

  return (
    <box
      onHoverEnter={revealChild}
      onHoverLeave={hideChild}
      onButtonPressed={() => {
        cycleDisplayMode()
        displayMode.set(getDisplayMode())
        redoAnimation()
      }}
      tooltipText={toolTipText}
      spacing={3}
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['container']}
    >
      <box
        spacing={3}
        cssClasses={redraw.get() ? ['clicked-on'] : ['']}
      >
        <image iconName='skull' />
        {wrapWithRevealer(<label>{displayData()}</label>)}
      </box>
      <revealer
        transitionDuration={150}
        revealChild={shouldLeftYearsLabelBeRevealed()}
        transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
      >
        <label>left alive</label>
      </revealer>
    </box>
  )
}

function revealChild() {
  shouldLeftYearsLabelBeRevealed.set(true)
}

function hideChild() {
  shouldLeftYearsLabelBeRevealed.set(false)
}

function redoAnimation() {
  redraw.set(true)
  timeout(5000, () => redraw.set(false))
}

export default TimeUntilDeathPanel
