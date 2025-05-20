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
  const days = timeDiff().as((v) => (v / 1000000 / 60 / 60 / 24).toFixed(0))

  const toolTipText = timeDiff().as((v) => {
    const seconds = Math.floor(v / 1000000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const years = Math.floor(days / 365)

    const displayDays = days % 365
    const displayHours = hours % 24
    const displayMinutes = minutes % 60
    const displaySeconds = seconds % 60

    const yearLabel = years !== 1 ? 'years' : 'year'
    const dayLabel = displayDays !== 1 ? 'days' : 'day'
    const hourLabel = displayHours !== 1 ? 'hours' : 'hour'
    const minuteLabel = displayMinutes !== 1 ? 'minutes' : 'minute'
    const secondLabel = displaySeconds !== 1 ? 'seconds' : 'second'

    const yearCount = years + ' ' + yearLabel
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
