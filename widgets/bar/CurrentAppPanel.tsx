import { Variable } from 'astal'
import Hyprland from 'gi://AstalHyprland'
import { wrapWithRevealer } from './utils/wrapWithRevealer'

const hyprland = Hyprland.get_default()

function CurrentAppPanel() {
  const toolTipText = Variable(getFocusedClientTitle())
  const currentAppTitle = Variable('').poll(
    8,
    () => {
      toolTipText.set(getFocusedClientTitle())
      return trimTitle(getFocusedClientTitle())
    },
  )

  return (
    <box cssClasses={['container']} tooltipText={toolTipText()}>
      <label cssClasses={['red-symbol']}>
        󰣇
      </label>
      {wrapWithRevealer(<label>{currentAppTitle()}</label>)}
    </box>
  )
}

function getFocusedClientTitle() {
  const focusedClient = hyprland.focusedClient

  if (!focusedClient) {
    return ' desktop'
  }

  let focusedClientTitle = focusedClient.title

  if (focusedClient.workspace.name == 'special:magic') {
    focusedClientTitle += ' '
  }

  return ' ' + focusedClientTitle
}

function trimTitle(title: string) {
  const maxChars = 30

  if (title.length > 30) {
    title = title.slice(0, maxChars + 1) + '...'
  }

  return title
}

export default CurrentAppPanel
