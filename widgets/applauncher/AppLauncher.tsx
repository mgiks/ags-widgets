import { Accessor, createComputed, createState, For } from 'ags'
import { Astal, Gdk, Gtk } from 'ags/gtk4'
import app from 'ags/gtk4/app'
import Apps from 'gi://AstalApps'
import Pango from 'gi://Pango?version=1.0'

const WINDOW_NAME = 'app-launcher'

const apps = new Apps.Apps()
const [query, setQuery] = createState('')
const [currentAppIndex, setCurrentAppIndex] = createState(0)

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
      onNotifyVisible={() => setQuery('')}
    >
      <Gtk.EventControllerKey
        onKeyPressed={({ widget }, keyval, _, mod) => {
          switch (keyval) {
            case (Gdk.KEY_Escape):
              widget.hide()
              break
            case (Gdk.KEY_j):
              mod == Gdk.ModifierType.CONTROL_MASK &&
                setCurrentAppIndex((i) =>
                  i < appList.get().length - 1 ? i + 1 : i
                )
              break
            case (Gdk.KEY_k):
              mod == Gdk.ModifierType.CONTROL_MASK &&
                setCurrentAppIndex((i) => i > 0 ? i - 1 : i)
              break
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

const appList = query((q) => apps.fuzzy_query(q))

function SearchEntry() {
  const onEnter = () => {
    appList.get()[currentAppIndex.get()].launch()
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
        text={query}
        onNotifyText={(self) => {
          setCurrentAppIndex(0)
          setQuery(self.text)
        }}
        onActivate={onEnter}
      />
    </overlay>
  )
}

function AppList() {
  return (
    <scrolledwindow vexpand>
      <box orientation={Gtk.Orientation.VERTICAL}>
        <For each={appList}>
          {(app, i) => <AppButton app={app} appIndex={i} />}
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

type AppButtonProps = {
  app: Apps.Application
  appIndex: Accessor<number>
}

function AppButton({ app, appIndex }: AppButtonProps) {
  return (
    <button
      cssClasses={['app-button']}
      onClicked={() => {
        hide()
        app.launch()
      }}
    >
      <box spacing={4}>
        <box
          visible={createComputed(
            [appIndex, currentAppIndex],
            (appIndex, currentAppIndex) => appIndex == currentAppIndex,
          )}
          cssClasses={['red-symbol']}
        >
          {''}
        </box>
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
              label={app.description.length > 60
                ? app.description.slice(0, 60).trimEnd() + '...'
                : app.description}
            />
          )}
        </box>
      </box>
    </button>
  )
}

function hide() {
  app.get_window(WINDOW_NAME)?.hide()
}
