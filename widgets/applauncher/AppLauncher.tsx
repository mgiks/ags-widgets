import { Variable } from 'astal'
import { App, Astal, Gdk, Gtk } from 'astal/gtk4'
import Apps from 'gi://AstalApps'

const MAX_ITEMS = 5

export default function Bar(gdkmonitor: Gdk.Monitor) {
  const apps = new Apps.Apps()
  const text = Variable('')
  const list = text((text) => apps.fuzzy_query(text).slice(0, MAX_ITEMS))

  function selectFirstMatch() {
    apps.fuzzy_query(text.get())[0].launch()
    hide()
  }

  return (
    <window
      name='applauncher'
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={App}
      keymode={Astal.Keymode.ON_DEMAND}
      onFocusEnter={() => text.set('')}
      onKeyPressed={function (self, keyval) {
        if (keyval == Gdk.KEY_Escape) {
          self.hide()
        }
      }}
      resizable={false}
    >
      <box
        hexpand={false}
        cssName='applauncher'
        spacing={2}
        vertical
      >
        <entry
          placeholderText={'Search'}
          onNotifyText={(self) => text.set(self.text)}
          onActivate={selectFirstMatch}
        />
        <box vertical>
          {list.as((list) => list.map((app) => <AppButton app={app} />))}
        </box>
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
              wrapMode={Gtk.WrapMode.WORD}
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
