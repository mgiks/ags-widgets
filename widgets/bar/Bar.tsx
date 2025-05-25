import { App, Astal, Gdk } from 'astal/gtk4'
import TimePanel from './TimePanel'
import WorkspacesPanel from './WorkspacesPanel'
import CurrentAppPanel from './CurrentAppPanel'
import TimeUntilDeathPanel from './TimeUntilDeathPanel'
import KeyboardLanguagePanel from './KeyboardLanguagePanel'
import WifiPanel from './WifiPanel'
import BatteryPanel from './BatteryPanel'

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor
  const spacing = 10

  return (
    <window
      visible
      resizable={true}
      cssClasses={['Bar']}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox cssName='centerbox'>
        <box spacing={spacing}>
          <TimePanel />
          <WorkspacesPanel />
        </box>
        <box>
          <CurrentAppPanel />
        </box>
        <box spacing={spacing}>
          <TimeUntilDeathPanel />
          <WifiPanel isSeparate={true} />
          <BatteryPanel isSeparate={true} />
          <KeyboardLanguagePanel isSeparate={true} />
        </box>
      </centerbox>
    </window>
  )
}
