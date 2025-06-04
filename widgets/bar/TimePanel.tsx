import { Gtk } from 'astal/gtk4'
import WeekdayPanel from './WeekdayPanel'
import DatePanel from './DatePanel'
import TimeOfDayPanel from './TimeOfDayPanel'
import { combiningPanelSpacing } from './consts'

function TimePanel() {
  return (
    <box
      spacing={combiningPanelSpacing}
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
    >
      <box cssClasses={['container', 'leftmost-element']}>
        <WeekdayPanel isSeparate={false} />
      </box>
      <box cssClasses={['container', 'middle-element']}>
        <DatePanel isSeparate={false} />
      </box>
      <box cssClasses={['container', 'rightmost-element']}>
        <TimeOfDayPanel isSeparate={false} />
      </box>
    </box>
  )
}

export default TimePanel
