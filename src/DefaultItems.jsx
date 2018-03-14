export default (item, selection) => {
  switch (item) {
    case 'open-link': {
      return ['Open link in new tab']
    }
    case 'new-window': {
      return ['Open link in new window']
    }
    case 'new-incognito-window': {
      return ['Open link in new incognito window']
    }
    case 'save-link': {
      return ['Save link as']
    }
    case 'copy-link': {
      return ['Copy link address']
    }
    case 'copy-text': {
      return ['Copy', 'Ctrl+C']
    }
    case 'search-text': {
      const query =
        selection.length > 40 ? selection.substr(0, 40) + '...' : selection
      return [`Search Google for "${query}"`]
    }
    case 'print': {
      return ['Print', 'Ctrl+P']
    }
    case 'back': {
      return ['Back', 'Alt+Left Arrow', !!document.referrer]
    }
    case 'forward': {
      return ['Forward', 'Alt+Right Arrow']
    }
    case 'reload': {
      return ['Reload', 'Ctrl+R']
    }
    case 'save-as': {
      return ['Save as...', 'Ctrl+S']
    }
    case 'cast': {
      return ['Cast']
    }
    case 'translate': {
      return ['Translate to English']
    }
    case 'view-source': {
      return ['View page source', 'Ctrl+U']
    }
    case 'inspect': {
      return ['Inspect', 'Ctrl+Shift+I']
    }
    case 'open-image': {
      return ['Open image in new tab']
    }
    case 'save-image': {
      return ['Save image as...']
    }
    case 'copy-image': {
      return ['Copy image']
    }
    case 'copy-image-address': {
      return ['Copy image address']
    }
    case 'search-image': {
      return ['Search Google for image']
    }
    default: {
      return ['undefined']
    }
  }
}
