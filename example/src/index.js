import React from 'react'
import { render } from 'react-dom'
import NativeMenu from 'native-menu'

const myItems = [
  {
    action: 'My action',
    shortcut: 'Win+A',
    onClick: () => {
      alert('My action')
    }
  },
  {
    action: 'My disabled action',
    shortcut: 'Win+D',
    disabled: true
  },
  {
    action: (
      <React.Fragment>
        <b>Bold</b> text
      </React.Fragment>
    ),
    onClick: () => {
      alert('bold text')
    }
  }
]

class Test extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>React Native browser context menus</h1>
        <h2>
          Easily add items to the browsers context menu, without breaking
          existing functionality
        </h2>
        <NativeMenu items={myItems}>
          <div className="example">
            <h1>Basic browser-themed context menu with custom actions</h1>
            <a href="">Example link</a> <button>Example button</button>{' '}
            <img src="https://via.placeholder.com/150x36" />
          </div>
        </NativeMenu>

        <NativeMenu theme="chrome-dark" items={myItems}>
          <div className="example odd">
            <h1>Theme: chrome-dark</h1>
            <a href="">Example link</a> <button>Example button</button>{' '}
            <img src="https://via.placeholder.com/150x36" />
          </div>
        </NativeMenu>

        <NativeMenu theme="material-dark" items={myItems}>
          <div className="example">
            <h1>Theme: material-dark</h1>
            <a href="">Example link</a> <button>Example button</button>{' '}
            <img src="https://via.placeholder.com/150x36" />
          </div>
        </NativeMenu>

        <NativeMenu theme="material" items={myItems}>
          <div className="example odd">
            <h1>Theme: material</h1>
            <a href="">Example link</a> <button>Example button</button>{' '}
            <img src="https://via.placeholder.com/150x36" />
          </div>
        </NativeMenu>

        <NativeMenu
          hide={['search', 'back', 'forward', 'print']}
          items={myItems}
        >
          <div className="example">
            <h1>Hiding specific context menu items</h1>
            <a href="">Example link</a> <button>Example button</button>{' '}
            <img src="https://via.placeholder.com/150x36" />
          </div>
        </NativeMenu>

        <NativeMenu
          styles={{
            root: {
              borderRadius: '50%'
            }
          }}
          items={myItems}
        >
          <div className="example odd">
            <h1>Utilizing custom styles</h1>
            <a href="">Example link</a> <button>Example button</button>{' '}
            <img src="https://via.placeholder.com/150x36" />
          </div>
        </NativeMenu>

        <NativeMenu mimic>
          <div className="example">
            <h1>Mimic all the browsers menu items</h1>
            <a href="">Example link</a> <button>Example button</button>{' '}
            <img src="https://via.placeholder.com/150x36" />
          </div>
        </NativeMenu>

        <NativeMenu
          nativeClick={(e, action) => {
            e.preventDefault()
            alert(`${action} triggered`)
          }}
          mimic
        >
          <div className="example odd">
            <h1>Listen for native menu-item clicks</h1>
            <a href="">Example link</a> <button>Example button</button>{' '}
            <img src="https://via.placeholder.com/150x36" />
          </div>
        </NativeMenu>

        <NativeMenu minimal>
          <div className="example">
            <h1>Minimal amount of context menu items</h1>
            <a href="">Example link</a> <button>Example button</button>{' '}
            <img src="https://via.placeholder.com/150x36" />
          </div>
        </NativeMenu>
      </React.Fragment>
    )
  }
}

render(<Test />, document.getElementById('root'))
