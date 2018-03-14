<p align="center">
  <img src="https://user-images.githubusercontent.com/13242392/37434914-2a7587de-27d9-11e8-9192-d329f50f379a.png" width="500">
  <h2 align="center">native-menu</h2>
  <p align="center">
    A lightweight React context menu component, that doesn't break existing browser functionality.
  </p>
</p>
<p align="center">
  <b>
    <a href="https://samdenty99.github.io/r?https://oxx9rp415q.codesandbox.io/">
      Demo
    </a>&nbsp;|
    <a href="https://samdenty99.github.io/r?https://codesandbox.io/s/github/samdenty99/native-menu-demo/tree/master/">
      CodeSandbox
    </a>&nbsp;|
    <a href="https://samdenty99.github.io/r?https://www.npmjs.com/package/native-menu">
      NPM
    </a>
  </b>
  <br><br>
  <a href="https://samdenty99.github.io/r?https://samdenty99.github.io/r?https://codesandbox.io/s/github/samdenty99/native-menu-demo/tree/master/">
    <img src="https://codesandbox.io/static/img/play-codesandbox.svg" height="20">
  </a>
  <a href="https://samdenty99.github.io/r?https://github.com/samdenty99/injectify/blob/master/package.json">
    <img src="https://img.shields.io/github/package-json/v/samdenty99/injectify.svg?style=flat">
  </a>
</p>
<h2></h2>

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Props](#props)


## Install

### NPM

```sh
npm i -S native-menu
```

### Yarn

```sh
yarn add native-menu
```


## Usage

### Basic example

[CodeSandbox](https://codesandbox.io/s/8x9yzv0xp0)

``` javascript
import NativeMenu from 'native-menu'

<NativeMenu items={[
  {
    action: 'Test 1',
    shortcut: 'Ctrl+B',
    onClick: () => alert('Test 1')
  },
  {
    action: 'Test 2',
    disabled: true
  },
]}>
  <span>
    Right click me
  </span>
</NativeMenu>
```

## Props

### `items?: [{ action: Component, shortcut?: Component, onClick?: Function, disabled?: boolean }]`

An array containing custom menu items.

- `action` - The name of the menu item. React components can be passed
- `shortcut` - The keyboard shortcut associated with the item. React components can be passed
- `onClick` - The callback for when the item is clicked
- `disabled` - Grey out and disable the menu item

### `theme?: ('chrome' | 'chrome-dark' | 'material' | 'material-dark') `

Specifies the visual theme to use. Defaults to  `chrome`

### `styles?: JSS`

Overrides the styles for the context menu using the [JSS](http://cssinjs.org) format. [JSS source code](https://github.com/samdenty99/native-menu/blob/7703f28bc6cb06ab8427a4808e0785374ea5e268/src/styles/chrome.jsx#L9)

### `hide?: NativeItems[]`

Hides specific native menu items.

<details><summary>Native item names</summary><p>

```
'open-link'
'new-window'
'new-incognito-window'
'save-link'
'copy-link'
'copy-text'
'search-text'
'print'
'back'
'forward'
'reload'
'save-as'
'cast'
'translate'
'view-source'
'inspect'
'open-image'
'save-image'
'copy-image'
'copy-image-address'
'search-image'
```

</p></details>

### `mimic?: boolean`

Adds all of the missing context menu items present in Chrome, but without any functionality when clicked.

### `minimal?: boolean`

Hides non-essential menu items such as `print`, `save-as`, `view-source` etc.
