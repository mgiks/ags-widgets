import { Variable } from 'astal'
import { App, Astal, Gdk, Gtk } from 'astal/gtk4'
import Apps from 'gi://AstalApps'

const MAX_ITEMS = 5

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const apps = new Apps.Apps()
  const text = Variable('')
  const list = text((text) => apps.fuzzy_query(text).slice(0, MAX_ITEMS))

  return (
    <window
      name={'applauncher'}
      resizable={true}
      cssClasses={['Bar']}
      valign={Gtk.Align.CENTER}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      application={App}
      keymode={Astal.Keymode.ON_DEMAND}
    >
      <box
        cssName='applauncher'
        spacing={2}
        vertical
      >
        <entry
          placeholderText={'Search'}
        />
        {list.as((list) => list.map((app) => <AppButton app={app} />))}
      </box>
    </window>
  )
}

function AppButton({ app }: { app: Apps.Application }) {
  return (
    <button
      onClicked={() => {
        hide()
        app.launch()
      }}
    >
      <box spacing={10}>
        <image
          icon_size={Gtk.IconSize.LARGE}
          iconName={app.iconName}
        />
        <box valign={Gtk.Align.CENTER} vertical>
          <label
            cssName='app-label'
            label={app.name}
            xalign={0}
          />
          {app.description && (
            <label
              cssName='app-description'
              wrap
              xalign={0}
              label={app.description}
            />
          )}
        </box>
      </box>
    </button>
  )
}

function hide() {
  App.get_window('applauncher')!.hide()
}
