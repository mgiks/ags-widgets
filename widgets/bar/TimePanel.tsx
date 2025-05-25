import { Gtk } from 'astal/gtk4'
import WeekdayPanel from './WeekdayPanel'
import DatePanel from './DatePanel'
import TimeOfDayPanel from './TimeOfDayPanel'

function TimePanel() {
  return (
    <box
      spacing={8}
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['container']}
    >
      <WeekdayPanel isSeparate={false} />
      <DatePanel isSeparate={false} />
      <TimeOfDayPanel isSeparate={false} />
    </box>
  )
}

export default TimePanel
