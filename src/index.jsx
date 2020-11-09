import React from 'react'
import { render } from 'react-dom'

/**
 * Components
 */
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import * as Save from 'file-saver'
import copy from 'copy-to-clipboard'
import DefaultItems from './DefaultItems'

/**
 * Styles
 */
import NativeStyles from './styles/native'
import MaterialStyles from './styles/material'

const error = msg => {
  throw new Error(`[EnhancedMenu] ${msg}`)
}

const styles = {
  native: NativeStyles,
  material: MaterialStyles
}

export default class NativeMenu extends React.Component {
  state = {
    selection: null,
    link: null,
    image: null,
    classes: {}
  }
  id = Math.random().toString()

  componentDidMount() {
    this.setTheme(this.props.theme || 'native', this.props)
  }

  componentDidUpdate(nextProps) {
    if (nextProps.theme !== this.props.theme) {
      this.setTheme(nextProps.theme, nextProps)
    }
  }

  setTheme = (value, config) => {
    const segments = value.split('-')
    const theme = segments[0]
    const variant = segments[1]

    if (styles[theme]) {
      this.setState({
        classes: styles[theme]({
          ...config,
          variant,
          styles: config.styles || {}
        })
      })
    } else {
      error('Unsupported theme type')
    }
  }

  item = item => {
    if (this.props.hide && this.props.hide.includes(item)) return null
    const [name, secondary, disabled] = DefaultItems(item, this.state.selection)
    return this.menuItem(name, secondary, disabled, e =>
      this.handleClick(e, item)
    )
  }

  menuItem = (primary, secondary, disabled, onClick) => {
    if (typeof onClick !== 'function') onClick = new Function()
    const { classes } = this.state
    return (
      <MenuItem onClick={onClick.bind(this)} disabled={!!disabled}>
        <div className={classes.primary}>{primary}</div>
        {secondary && <div className={classes.secondary}>{secondary}</div>}
      </MenuItem>
    )
  }

  customItems = () => {
    const { items } = this.props
    if (!items) return null
    return (
      <React.Fragment>
        {items.map(item => {
          if (!item.primary)
            error(
              `The primary key is required on all list items!\n\t${JSON.stringify(
                item
              )}`
            )
          return (
            <React.Fragment key={item.primary}>
              {this.menuItem(
                item.primary,
                item.secondary,
                item.disabled,
                item.onClick
              )}
            </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  }

  render() {
    const config = this.props
    const { selection, image, link, classes } = this.state
    const customItems = this.customItems()
    return (
      <React.Fragment>
        <ContextMenuTrigger id={this.id}>
          {this.props.children}
        </ContextMenuTrigger>

        <ContextMenu
          onShow={this.toggled.bind(this)}
          onHide={this.toggled.bind(this)}
          id={this.id}
          className={classes.root}
        >
          {image ? (
            <React.Fragment>
              {this.item('open-image')}
              {config.mimic && this.item('save-image')}
              {config.mimic && this.item('copy-image')}
              {this.item('copy-image-address')}
              {this.item('search-image')}
              {customItems && <MenuItem divider />}
              {customItems}
              {!this.props.minimal &&
                (config.mimic || customItems) && <MenuItem divider />}
              {!this.props.minimal && this.item('view-source')}
            </React.Fragment>
          ) : link ? (
            <React.Fragment>
              {this.item('open-link')}
              {this.item('new-window')}
              {config.mimic && this.item('new-incognito-window')}
              {!config.mimic && this.item('copy-link')}
              {customItems && <MenuItem divider />}
              {customItems}
              {!this.props.minimal && (
                <React.Fragment>
                  {config.mimic || customItems ? <MenuItem divider /> : null}
                  {config.mimic && this.item('save-link')}
                  {config.mimic && this.item('copy-link')}
                  {config.mimic && <MenuItem divider />}
                  {this.item('view-source')}
                </React.Fragment>
              )}
            </React.Fragment>
          ) : selection ? (
            <React.Fragment>
              {this.item('copy-text')}
              {this.item('search-text')}
              {!this.props.minimal && this.item('print')}
              {!this.props.minimal &&
                (config.mimic || (customItems && <MenuItem divider />))}
              {customItems}
              {customItems && !this.props.minimal && <MenuItem divider />}
              {!this.props.minimal && this.item('view-source')}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {customItems}
              {customItems && <MenuItem divider />}
              {this.item('back')}
              {this.item('forward')}
              {this.item('reload')}
              {!this.props.minimal && (
                <React.Fragment>
                  <MenuItem divider />
                  {this.item('save-as')}
                  {this.item('print')}
                  {config.mimic && this.item('cast')}
                  {config.mimic && this.item('translate')}
                  <MenuItem divider />
                  {this.item('view-source')}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
          {!this.props.minimal && config.mimic && this.item('inspect')}
        </ContextMenu>
      </React.Fragment>
    )
  }

  handleClick = (event, action) => {
    if (typeof this.props.nativeClick === 'function') {
      let shouldReturn = false
      event.preventDefault = () => {
        shouldReturn = true
      }
      this.props.nativeClick(event, action)
      if (shouldReturn) return
    }
    switch (action) {
      case 'back': {
        window.history.back(1)
        break
      }
      case 'forward': {
        window.history.forward(1)
        break
      }
      case 'reload': {
        window.location.reload()
        break
      }
      case 'save-as': {
        let blob = new Blob(
          [
            `<base href=${JSON.stringify(window.location.href)}>${
              document.documentElement.innerHTML
            }`
          ],
          { type: 'text/html' }
        )
        Save.saveAs(blob, `${document.title}.html`)
        break
      }
      case 'print': {
        window.print()
        break
      }
      case 'view-source': {
        const win = window.open()
        win.document.title = `view-source:${window.location.href}`
        let pre = document.createElement('pre')
        pre.innerText = document.documentElement.innerHTML
        pre.style = `tab-size:14px;word-wrap:break-word;white-space:pre-wrap`
        win.document.body.appendChild(pre)
        break
      }
      case 'search-text': {
        window.open(
          `https://google.com/search?q=${encodeURIComponent(
            this.state.selection
          )}`
        )
        break
      }
      case 'copy-text': {
        copy(this.state.selection)
        break
      }
      case 'copy-link': {
        copy(this.state.link)
        break
      }
      case 'open-link': {
        window.open(this.state.link)
        break
      }
      case 'new-window':
      case 'new-incognito-window': {
        window.open(
          this.state.link,
          '_blank',
          `height=${window.screen.height},width=${
            window.screen.width
          },resizable=yes,scrollbars=yes,toolbar=yes,menubar=yes,location=yes`
        )
        break
      }
      case 'open-image': {
        window.open(this.state.image)
        break
      }
      case 'copy-image-address': {
        copy(this.state.image)
        break
      }
      case 'search-image': {
        window.open(
          `https://www.google.com/searchbyimage?site=search&sa=X&image_url=${encodeURIComponent(
            this.state.image
          )}`
        )
        break
      }
    }
  }

  toggled = e => {
    if (e.detail && e.detail.position) {
      const { position } = e.detail
      const element = document.elementFromPoint(position.x, position.y)
      if (element.tagName === 'A') {
        const link = element.href
        this.setState({
          link,
          image: null
        })
      } else if (element.tagName === 'IMG') {
        const image = element.src
        this.setState({
          image,
          link: null
        })
      } else {
        this.setState({
          link: null,
          image: null
        })
      }
    }
    const selection = (() => {
      let text = ''
      if (window.getSelection) {
        text = window.getSelection().toString()
      } else if (document.selection && document.selection.type !== 'Control') {
        text = document.selection.createRange().text
      }
      return text
    })()

    if (this.state.selection !== selection) {
      this.setState({
        selection
      })
    }
  }
}
