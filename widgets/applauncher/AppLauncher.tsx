import { Accessor, createState, For } from 'ags'
import { Astal, Gdk, Gtk } from 'ags/gtk4'
import app from 'ags/gtk4/app'
import Fuse from 'fuse.js'
import Apps from 'gi://AstalApps'
import Pango from 'gi://Pango?version=1.0'

const apps = new Apps.Apps().get_list()
const fuse = new Fuse(apps, {
  includeScore: true,
  keys: ['name'],
})

const WINDOW_NAME = 'app-launcher'

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
      onNotifyVisible={(
        widget,
      ) => (setCurrentAppIndex(0),
        setQuery(''),
        widget.child_focus(Gtk.DirectionType.TAB_FORWARD))}
    >
      <Gtk.EventControllerKey
        onKeyPressed={({ widget }, keyval, _, mod) => {
          if (keyval === Gdk.KEY_Escape) {
            widget.hide()
            return
          }
          if (mod == Gdk.ModifierType.CONTROL_MASK) {
            if (keyval === Gdk.KEY_j) {
              widget.child_focus(Gtk.DirectionType.TAB_FORWARD)
            } else if (keyval === Gdk.KEY_k) {
              widget.child_focus(Gtk.DirectionType.TAB_BACKWARD)
            }
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

const appList = query((q) => fuse.search(q))

function SearchEntry() {
  const onEnter = () => {
    appList.get()[currentAppIndex.get()].item.launch()
    hide()
  }

  return (
    <overlay cssClasses={['app-search']}>
      <entry
        $type='overlay'
        vexpand
        cssClasses={['app-search__entry']}
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
          {(app, i) => <AppButton app={app.item} appIndex={i} />}
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

function AppButton({ app }: AppButtonProps) {
  return (
    <button
      cssClasses={['app-button']}
      onClicked={() => {
        hide()
        app.launch()
      }}
    >
      <box spacing={4}>
        <image icon_size={Gtk.IconSize.NORMAL} iconName={app.iconName} />
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
        </box>
      </box>
    </button>
  )
}

function hide() {
  app.get_window(WINDOW_NAME)?.hide()
}
