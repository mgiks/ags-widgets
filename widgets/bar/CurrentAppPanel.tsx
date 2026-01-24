import Hyprland from 'gi://AstalHyprland'
import { Accessor, createBinding } from 'ags'
import { Gtk } from 'ags/gtk4'

const hyprland = Hyprland.get_default()

function trimTitle(title: string) {
  const maxChars = 30
  return title.length > 30 ? title.slice(0, maxChars) + '...' : title
}

function CurrentAppPanel() {
  const focusedClient = createBinding(hyprland, 'focusedClient')
  const title = focusedClient.as((focusedClient) => {
    if (!focusedClient) {
      return ' desktop'
    }
    return createBinding(focusedClient, 'initialTitle')
  })

  return (
    <box
      valign={Gtk.Align.CENTER}
      halign={Gtk.Align.CENTER}
      cssClasses={['panel']}
    >
      <label cssClasses={['red-symbol']} label={'󰣇'} />
      <label
        label={title.as((t) => t === ' desktop' ? t : ' ' + trimTitle(t.get()))}
      />
    </box>
  )
}

export default CurrentAppPanel
