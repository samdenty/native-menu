import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

export default config => {
  const fontColor = config.variant === 'dark' ? 'rgba(255,255,255,0.9)' : '#000'
  const styles = {
    root: {
      boxSizing: 'border-box',
      cursor: 'default',
      minWidth: '270px',
      maxWidth: '100%',
      backgroundColor: config.variant === 'dark' ? '#505050' : '#ffffff',
      border: `1px solid ${config.variant === 'dark' ? '#6f6f6f' : '#bababa'}`,
      padding: '2px 0',
      boxShadow: '4px 4px 4px -3px rgba(0, 0, 0, 0.75)',
      outline: 'none',
      userSelect: 'none',
      overflow: 'hidden',
      zIndex: 999999999,
      ...config.styles.root,
      '& *': {
        boxSizing: 'border-box'
      },
      '& .react-contextmenu-item:not(.react-contextmenu-item--divider)': {
        display: 'flex',
        outline: '0',
        height: '24px',
        lineHeight: '24px',
        padding: '0 25px',
        color: fontColor,
        fontFamily: `'Segoe UI'`,
        fontSize: '12px',
        ...config.styles.item,
        '&:hover': {
          backgroundColor:
            config.variant === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.07)',
          '& *': {
            color: fontColor
          }
        }
      },
      '& .react-contextmenu-item--disabled': {
        color: '#a2a2a2 !important',
        pointerEvents: 'none !important',
        ...config.styles.disabled
      },
      '& .react-contextmenu-item--divider': {
        pointerEvents: 'none',
        height: '1px',
        background:
          config.variant === 'dark' ? 'rgba(255,255,255,0.1)' : '#e9e9e9',
        margin: '5px 1px',
        ...config.styles.divider
      }
    },
    action: {
      flexGrow: 1,
      padding: '0 10px',
      ...config.styles.action
    },
    shortcut: {
      color: '#a2a2a2',
      ...config.styles.shortcut
    }
  }

  return jss.createStyleSheet(styles).attach().classes
}
