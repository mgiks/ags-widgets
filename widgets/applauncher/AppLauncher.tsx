import { Variable } from 'astal'
import { App, Astal, Gdk, Gtk, hook } from 'astal/gtk4'
import Apps from 'gi://AstalApps'
import Pango from 'gi://Pango?version=1.0'

const apps = new Apps.Apps()
const query = Variable('')

const WINDOW_NAME = 'applauncher'

export default function AppLauncher(gdkmonitor: Gdk.Monitor) {
  return (
    <window
      name='applauncher'
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.IGNORE}
      application={App}
      keymode={Astal.Keymode.ON_DEMAND}
      onKeyPressed={function (self, keyval) {
        if (keyval == Gdk.KEY_Escape) {
          self.hide()
        }
      }}
      resizable={false}
    >
      <box
        widthRequest={100}
        hexpand={true}
        cssName='app-launcher'
        spacing={2}
        vertical
      >
        <SearchEntry />
        <AppsScrolledWindow />
      </box>
    </window>
  )
}

function SearchEntry() {
  const onEnter = () => {
    apps.fuzzy_query(query.get())?.[0].launch()
    hide()
  }

  return (
    <overlay cssClasses={['entry-overlay']} heightRequest={100}>
      <Gtk.ScrolledWindow heightRequest={100}>
      </Gtk.ScrolledWindow>
      <entry
        type='overlay'
        vexpand
        primaryIconName={'system-search-symbolic'}
        placeholderText='Search...'
        text={query.get()}
        setup={(self) => {
          hook(self, App, 'window-toggled', (_, win) => {
            const winName = win.name
            const visible = win.visible

            if (winName == WINDOW_NAME && visible) {
              query.set('')
              self.set_text('')
              self.grab_focus()
            }
          })
        }}
        onChanged={(self) => query.set(self.text)}
        onActivate={onEnter}
      />
    </overlay>
  )
}

function AppsScrolledWindow() {
  const appList = query((query) =>
    apps.fuzzy_query(query).filter((
      app,
    ) => (!app.get_name().startsWith('LibreOffice')))
  )

  return (
    <Gtk.ScrolledWindow vexpand>
      <box spacing={6} vertical>
        {appList.as((appList) => appList.map((app) => <AppButton app={app} />))}
        <box
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
          cssClasses={['not-found']}
          vertical
          vexpand
          visible={appList.as((l) => l.length === 0)}
        >
          <image
            iconName='system-search-symbolic'
            iconSize={Gtk.IconSize.LARGE}
          />
          <label label='No match found' />
        </box>
      </box>
    </Gtk.ScrolledWindow>
  )
}

function AppButton({ app }: { app: Apps.Application }) {
  return (
    <button
      cssName='app-button'
      onClicked={() => {
        hide()
        app.launch()
      }}
    >
      <box>
        <image icon_size={Gtk.IconSize.LARGE} iconName={app.iconName} />
        <box valign={Gtk.Align.CENTER} vertical>
          <label
            cssName='app-label'
            ellipsize={Pango.EllipsizeMode.END}
            xalign={0}
            label={app.name}
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
  App.get_window(WINDOW_NAME)?.hide()
}
