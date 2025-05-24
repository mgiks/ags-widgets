import { GLib, Variable } from 'astal'
import { Gtk } from 'astal/gtk4'

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

  const toolTipText = timeDiff().as((v) => {
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

  return (
    <box
      tooltipText={toolTipText}
      spacing={8}
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['container']}
    >
      <box
        spacing={3}
      >
        <image iconName='skull' />
        <label>
          {days.as((v) => v + ' days left alive')}
        </label>
      </box>
    </box>
  )
}

export default TimeUntilDeathPanel
