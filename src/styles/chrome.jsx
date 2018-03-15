import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

const blur = false

export default (config) => {
  if (!config.os) {
    config.os = 'windows'
    if (navigator.platform.indexOf('Mac') >= 0) config.os = 'mac'
  }
  const fontColor = config.variant === 'dark' ? 'rgba(255,255,255,0.9)' : '#000'
  const styles = {
    '@font-face': {
      fontFamily: '"San Francisco"',
      fontWeight: 500,
      src:
        'url("https://applesocial.s3.amazonaws.com/assets/styles/fonts/sanfrancisco/sanfranciscodisplay-medium-webfont.woff2")'
    },
    root: {
      visibility: 'hidden',
      boxSizing: 'border-box',
      cursor: 'default',
      minWidth: '270px',
      maxWidth: '100%',
      backgroundColor:
        config.os === 'mac'
          ? config.variant === 'dark'
            ? blur ? 'rgba(80, 80, 80, 0.73)' : '#7C7C7C'
            : blur ? 'rgba(224, 228, 239, 0.73)' : '#E9E7E9'
          : config.variant === 'dark' ? '#505050' : '#ffffff',
      border: `1px solid ${config.variant === 'dark' ? '#6f6f6f' : '#bababa'}`,
      padding: config.os === 'mac' ? '3px 0' : '2px 0',
      boxShadow:
        config.os === 'mac'
          ? '0px 7px 14px rgba(0, 0, 0, 0.25)'
          : '4px 4px 4px -3px rgba(0, 0, 0, 0.75)',
      outline: 'none',
      transition: config.os === 'mac' ? 'opacity 0.1s ease' : '',
      userSelect: 'none',
      overflow: 'hidden',
      borderRadius: config.os === 'mac' ? '6px' : 0,
      backdropFilter: config.os === 'mac' && blur ? 'blur(35px)' : 'initial',
      zIndex: 999999999,
      ...config.styles.root,
      '& *': {
        boxSizing: 'border-box'
      },
      '&.react-contextmenu--visible': {
        visibility: 'initial'
      },
      '& .react-contextmenu-item:not(.react-contextmenu-item--divider)': {
        display: 'flex',
        outline: '0',
        height: config.os === 'mac' ? '20px' : '24px',
        lineHeight: config.os === 'mac' ? '20px' : '24px',
        padding: '0 25px',
        color: fontColor,
        fontFamily:
          config.os === 'mac' ? `'San Francisco'` : `'Segoe UI', sans-serif`,
        fontSize: config.os === 'mac' ? '14px' : '12px',
        ...config.styles.item,
        '&:hover': {
          backgroundColor:
            config.os === 'mac'
              ? '#1F7CF7'
              : config.variant === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.07)',
          '& *': {
            color: config.os === 'mac' ? '#fff' : fontColor
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
        height: config.os === 'mac' ? '2px' : '1px',
        background:
          config.os === 'mac'
            ? 'rgba(0, 0, 0, 0.07)'
            : config.variant === 'dark' ? 'rgba(255,255,255,0.1)' : '#e9e9e9',
        margin: config.os === 'mac' ? '5px 0' : '5px 1px',
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
