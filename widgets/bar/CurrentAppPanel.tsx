import { Variable } from 'astal'
import Hyprland from 'gi://AstalHyprland'

function CurrentAppPanel() {
  const hyprland = Hyprland.get_default()

  const isFocusedClientOnSpecialWorkspace = Variable(false)

  const currentAppTitle = Variable('').poll(8, () => {
    isFocusedClientOnSpecialWorkspace.set(false)

    const focusedClient = hyprland.focusedClient

    if (!focusedClient) {
      return ' desktop'
    }

    let focusedClientTitle = ' ' + focusedClient.title

    if (focusedClientTitle.length > 70) {
      focusedClientTitle = focusedClientTitle.slice(0, 71) + '...'
    }

    if (focusedClient.workspace.name == 'special:magic') {
      focusedClientTitle += ' '
      isFocusedClientOnSpecialWorkspace.set(true)
    }

    return focusedClientTitle
  })

  return (
    <box cssClasses={['container']}>
      <label cssClasses={['red-symbol']}>
        󰣇
      </label>
      {currentAppTitle()}
      <label
        visible={isFocusedClientOnSpecialWorkspace()}
        cssClasses={['red-symbol']}
      >
        
      </label>
    </box>
  )
}

export default CurrentAppPanel
