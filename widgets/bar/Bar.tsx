import { Astal, Gdk, Gtk } from 'ags/gtk4'
import app from 'ags/gtk4/app'
import WeekdayPanel from './WeekdayPanel'
import DatePanel from './DatePanel'
import TimeOfDayPanel from './TimeOfDayPanel'
import WorkspacesPanel from './WorkspacesPanel'
import CurrentAppPanel from './CurrentAppPanel'
import TimeUntilDeathPanel from './TimeUntilDeathPanel'
import PowerOffButton from './PowerOffButton'
import BatteryPanel from './BatteryPanel'
import WifiPanel from './WifiPanel'
import KeyboardLanguagePanel from './KeyboardLanguagePanel'
import MusicVisualizer from './MusicVisualizer'

export default function Bar({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) {
  const spacing = 7
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name={'bar'}
      cssClasses={['widget']}
      resizable={true}
      valign={Gtk.Align.CENTER}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={app}
    >
      <centerbox
        cssClasses={['centerbox']}
        orientation={Gtk.Orientation.HORIZONTAL}
      >
        <box spacing={spacing} $type='start'>
          <WeekdayPanel />
          <DatePanel />
          <TimeOfDayPanel />
          <WorkspacesPanel />
          <MusicVisualizer />
        </box>
        <box spacing={spacing} $type='center'>
          <CurrentAppPanel />
        </box>
        <box spacing={spacing} $type='end'>
          <TimeUntilDeathPanel />
          <KeyboardLanguagePanel />
          <WifiPanel />
          <BatteryPanel />
          <PowerOffButton />
        </box>
      </centerbox>
    </window>
  )
}
