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
      borderRadius: '3px',
      padding: '4px 0',
      boxShadow: '0 14px 28px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.22)',
      outline: 'none',
      userSelect: 'none',
      overflow: 'hidden',
      zIndex: 999999999,
      transition: 'opacity 0.15s ease',
      ...config.styles.root,
      '& *': {
        boxSizing: 'border-box'
      },
      '& .react-contextmenu-item:not(.react-contextmenu-item--divider)': {
        display: 'flex',
        outline: '0',
        height: '28px',
        lineHeight: '28px',
        padding: '0 25px',
        color: fontColor,
        fontFamily: `'Segoe UI'`,
        fontSize: '12px',
        transition: 'background-color 0.03s ease',
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
    primary: {
      flexGrow: 1,
      padding: '0 10px',
      ...config.styles.primary
    },
    secondary: {
      color: '#a2a2a2',
      ...config.styles.secondary
    }
  }

  return jss.createStyleSheet(styles).attach().classes
}
