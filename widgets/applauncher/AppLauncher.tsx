import { createState, For } from 'ags'
import { Astal, Gdk, Gtk } from 'ags/gtk4'
import app from 'ags/gtk4/app'
import Apps from 'gi://AstalApps'
import Pango from 'gi://Pango?version=1.0'

const apps = new Apps.Apps()
const [query, setQuery] = createState('')

const WINDOW_NAME = 'app-launcher'

export default function AppLauncher(
  { gdkmonitor }: { gdkmonitor: Gdk.Monitor },
) {
  return (
    <window
      name={WINDOW_NAME}
      cssClasses={['widget']}
      gdkmonitor={gdkmonitor}
      application={app}
      exclusivity={Astal.Exclusivity.NORMAL}
      keymode={Astal.Keymode.EXCLUSIVE}
      resizable={false}
    >
      <Gtk.EventControllerKey
        onKeyPressed={({ widget }, keyval: number) => {
          if (keyval == Gdk.KEY_Escape) {
            widget.hide()
          }
        }}
      />
      <box
        hexpand={true}
        cssClasses={['app-launcher']}
        orientation={Gtk.Orientation.VERTICAL}
      >
        <SearchEntry />
        <AppList />
      </box>
    </window>
  )
}

function SearchEntry() {
  const onEnter = () => {
    apps.fuzzy_query(query.get())[0].launch()
    hide()
  }

  return (
    <overlay cssClasses={['app-search']}>
      <entry
        $type='overlay'
        vexpand
        cssClasses={['app-search__entry']}
        primaryIconName={'system-search'}
        placeholderText='Search...'
        text={query.get()}
        onNotifyText={(self) => setQuery(self.text)}
        onActivate={onEnter}
      />
    </overlay>
  )
}

function AppList() {
  const appList = query((query) => apps.fuzzy_query(query))

  return (
    <scrolledwindow vexpand>
      <box orientation={Gtk.Orientation.VERTICAL}>
        <For each={appList}>
          {(app, i) => <AppButton app={app} appIndex={i.get()} />}
        </For>
        <box
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
          cssClasses={['app-launcher__failed-search']}
          orientation={Gtk.Orientation.VERTICAL}
          vexpand
          visible={appList((l) => l.length === 0)}
        >
          <image
            iconName='system-search'
            iconSize={Gtk.IconSize.LARGE}
          />
          <label label='No match found' />
        </box>
      </box>
    </scrolledwindow>
  )
}

function AppButton(
  { app, appIndex }: { app: Apps.Application; appIndex: number },
) {
  return (
    <button
      cssClasses={['app-button']}
      onClicked={() => {
        hide()
        app.launch()
      }}
    >
      <box spacing={4}>
        {appIndex == 0 && <SelectedAppIndicator />}
        <image icon_size={Gtk.IconSize.LARGE} iconName={app.iconName} />
        <box
          valign={Gtk.Align.CENTER}
          orientation={Gtk.Orientation.VERTICAL}
        >
          <label
            cssClasses={['app-button__label']}
            ellipsize={Pango.EllipsizeMode.END}
            xalign={0}
            label={app.name}
          />
          {app.description && (
            <label
              cssClasses={['app-button__description']}
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

function SelectedAppIndicator() {
  return <box cssClasses={['red-symbol']}>{''}</box>
}

function hide() {
  app.get_window(WINDOW_NAME)?.hide()
}
