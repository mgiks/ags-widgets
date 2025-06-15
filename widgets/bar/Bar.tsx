import { App, Astal, Gdk, Gtk } from 'astal/gtk4'
import WorkspacesPanel from './WorkspacesPanel'
import CurrentAppPanel from './CurrentAppPanel'
import TimeUntilDeathPanel from './TimeUntilDeathPanel'
import PowerOffButton from './PowerOffButton'
import { barPanelsSpacing } from './consts'
import KeyboardLanguagePanel from './KeyboardLanguagePanel'
import WifiPanel from './WifiPanel'
import BatteryPanel from './BatteryPanel'
import WeekdayPanel from './WeekdayPanel'
import DatePanel from './DatePanel'
import TimeOfDayPanel from './TimeOfDayPanel'

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name={'bar'}
      resizable={true}
      cssClasses={['Bar']}
      valign={Gtk.Align.CENTER}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox cssName='centerbox'>
        <box spacing={barPanelsSpacing}>
          <WeekdayPanel isSeparate={true} />
          <DatePanel isSeparate={true} />
          <TimeOfDayPanel isSeparate={true} />
          <WorkspacesPanel />
        </box>
        <box>
          <CurrentAppPanel />
        </box>
        <box spacing={barPanelsSpacing}>
          <TimeUntilDeathPanel />
          <KeyboardLanguagePanel isSeparate={true} />
          <WifiPanel isSeparate={true} />
          <BatteryPanel isSeparate={true} />
          <PowerOffButton />
        </box>
      </centerbox>
    </window>
  )
}
