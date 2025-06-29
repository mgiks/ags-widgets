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
    <Astal.Window
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
      <Gtk.CenterBox orientation={Gtk.Orientation.HORIZONTAL}>
        <Gtk.Box spacing={spacing} $type='start'>
          <WeekdayPanel />
          <DatePanel />
          <TimeOfDayPanel />
          <WorkspacesPanel />
          <MusicVisualizer />
        </Gtk.Box>
        <Gtk.Box spacing={spacing} $type='center'>
          <CurrentAppPanel />
        </Gtk.Box>
        <Gtk.Box spacing={spacing} $type='end'>
          <TimeUntilDeathPanel />
          <KeyboardLanguagePanel />
          <WifiPanel />
          <BatteryPanel />
          <PowerOffButton />
        </Gtk.Box>
      </Gtk.CenterBox>
    </Astal.Window>
  )
}
