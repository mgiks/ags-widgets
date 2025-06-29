import { createState, For } from 'ags'
import { Astal, Gdk, Gtk } from 'ags/gtk4'
import app from 'ags/gtk4/app'
import Apps from 'gi://AstalApps'
import Pango from 'gi://Pango?version=1.0'

const apps = new Apps.Apps()
const [query, seQuery] = createState('')

const WINDOW_NAME = 'app-launcher'

export default function AppLauncher(
  { gdkmonitor }: { gdkmonitor: Gdk.Monitor },
) {
  return (
    <Astal.Window
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
      <Gtk.Box
        hexpand={true}
        cssClasses={['app-launcher']}
        orientation={Gtk.Orientation.VERTICAL}
      >
        <SearchEntry />
        <AppList />
      </Gtk.Box>
    </Astal.Window>
  )
}

function SearchEntry() {
  const onEnter = () => {
    apps.fuzzy_query(query.get())[0].launch()
    hide()
  }

  return (
    <Gtk.Overlay cssClasses={['app-search']}>
      <Gtk.Entry
        $type='overlay'
        vexpand
        cssClasses={['app-search__entry']}
        primaryIconName={'system-search'}
        placeholderText='Search...'
        text={query.get()}
        onNotifyText={(self) => seQuery(self.text)}
        onActivate={onEnter}
      />
    </Gtk.Overlay>
  )
}

function AppList() {
  const appList = query((query) => apps.fuzzy_query(query))

  return (
    <Gtk.ScrolledWindow vexpand>
      <Gtk.Box orientation={Gtk.Orientation.VERTICAL}>
        <For each={appList}>
          {(app, i) => <AppButton app={app} appIndex={i.get()} />}
        </For>
        <Gtk.Box
          halign={Gtk.Align.CENTER}
          valign={Gtk.Align.CENTER}
          cssClasses={['app-launcher__failed-search']}
          orientation={Gtk.Orientation.VERTICAL}
          vexpand
          visible={appList((l) => l.length === 0)}
        >
          <Gtk.Image
            iconName='system-search'
            iconSize={Gtk.IconSize.LARGE}
          />
          <Gtk.Label label='No match found' />
        </Gtk.Box>
      </Gtk.Box>
    </Gtk.ScrolledWindow>
  )
}

function AppButton(
  { app, appIndex }: { app: Apps.Application; appIndex: number },
) {
  return (
    <Gtk.Button
      cssClasses={['app-button']}
      onClicked={() => {
        hide()
        app.launch()
      }}
    >
      <Gtk.Box spacing={4}>
        {appIndex == 0 && <Gtk.Box cssClasses={['red-symbol']}>{''}</Gtk.Box>}
        <Gtk.Image icon_size={Gtk.IconSize.LARGE} iconName={app.iconName} />
        <Gtk.Box
          valign={Gtk.Align.CENTER}
          orientation={Gtk.Orientation.VERTICAL}
        >
          <Gtk.Label
            cssClasses={['app-button__label']}
            ellipsize={Pango.EllipsizeMode.END}
            xalign={0}
            label={app.name}
          />
          {app.description && (
            <Gtk.Label
              cssClasses={['app-button__description']}
              wrap
              xalign={0}
              label={app.description}
            />
          )}
        </Gtk.Box>
      </Gtk.Box>
    </Gtk.Button>
  )
}

function hide() {
  app.get_window(WINDOW_NAME)?.hide()
}
