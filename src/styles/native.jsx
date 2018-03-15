import jss from 'jss'
import preset from 'jss-preset-default'

jss.setup(preset())

const blur = false

export default config => {
  if (!config.platform) {
    config.platform = 'chrome'
    if (navigator.platform.indexOf('Mac') >= 0) config.platform = 'mac'
    if (/Edge\/\d./i.test(navigator.userAgent)) config.platform = 'edge'
    if (
      /firefox/i.test(navigator.userAgent) ||
      /MSIE 9/i.test(navigator.userAgent) ||
      /rv:11.0/i.test(navigator.userAgent) ||
      /MSIE 10/i.test(navigator.userAgent)
    )
      config.platform = 'windows'
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
      minWidth: config.platform === 'edge' ? '70px' : '270px',
      maxWidth: '100%',
      textAlign: 'left',
      maxHeight: config.platform === 'edge' ? 0 : '',
      backgroundColor:
        config.platform === 'edge' || config.platform === 'windows'
          ? config.variant === 'dark' ? '#2B2B2B' : '#F2F2F2'
          : config.platform === 'mac'
            ? config.variant === 'dark'
              ? blur ? 'rgba(80, 80, 80, 0.73)' : '#7C7C7C'
              : blur ? 'rgba(224, 228, 239, 0.73)' : '#E9E7E9'
            : config.variant === 'dark' ? '#505050' : '#ffffff',
      border:
        config.platform === 'edge'
          ? `1px solid ${config.variant === 'dark' ? '#767676' : '#CCCCCC'}`
          : config.platform === 'mac'
            ? 'none'
            : `1px solid ${config.variant === 'dark' ? '#6f6f6f' : '#bababa'}`,
      padding:
        config.platform === 'windows'
          ? '2px'
          : config.platform === 'edge'
            ? '8px 0'
            : config.platform === 'mac' ? '3px 0' : '2px 0',
      boxShadow:
        config.platform === 'edge'
          ? 'none'
          : config.platform === 'mac'
            ? '0px 7px 14px rgba(0, 0, 0, 0.25)'
            : '4px 4px 4px -3px rgba(0, 0, 0, 0.75)',
      outline: 'none',
      transition: [
        config.platform === 'mac' ? 'opacity 0.1s ease' : '',
        config.platform === 'edge'
          ? 'opacity 0.04s ease, max-height 1s ease'
          : ''
      ],
      userSelect: 'none',
      overflow: 'hidden',
      borderRadius: config.platform === 'mac' ? '6px' : 0,
      backdropFilter:
        config.platform === 'mac' && blur ? 'blur(35px)' : 'initial',
      zIndex: 999999999,
      ...config.styles.root,
      '& *': {
        boxSizing: 'border-box'
      },
      '&.react-contextmenu--visible': {
        maxHeight: config.platform === 'edge' ? '800px' : '',
        visibility: 'initial'
      },
      '& .react-contextmenu-item:not(.react-contextmenu-item--divider)': {
        display: 'flex',
        outline: '0',
        height:
          config.platform === 'windows'
            ? '22px'
            : config.platform === 'edge'
              ? '32px'
              : config.platform === 'mac' ? '20px' : '24px',
        lineHeight:
          config.platform === 'windows'
            ? '22px'
            : config.platform === 'edge'
              ? '32px'
              : config.platform === 'mac' ? '20px' : '24px',
        padding:
          config.platform === 'windows'
            ? '0 22px'
            : config.platform === 'edge' ? '0 15px' : '0 25px',
        color: fontColor,
        transition: 'transform 0.05s ease',
        fontFamily:
          config.platform === 'mac'
            ? `'San Francisco'`
            : `'Segoe UI', sans-serif`,
        fontSize:
          config.platform === 'edge'
            ? '14px'
            : config.platform === 'mac' ? '14px' : '12px',
        ...config.styles.item,
        '&:hover': {
          backgroundColor:
            config.platform === 'windows'
              ? config.variant === 'dark' ? '#414141' : '#91C9F7'
              : config.platform === 'edge'
                ? config.variant === 'dark' ? '#404040' : '#DADADA'
                : config.platform === 'mac'
                  ? '#1F7CF7'
                  : config.variant === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.07)',
          '& *': {
            color:
              config.platform === 'edge'
                ? ''
                : config.platform === 'mac' ? '#fff' : fontColor
          }
        },
        '&:active': {
          transform: config.platform === 'edge' ? 'scale(0.98)' : ''
        }
      },
      '& .react-contextmenu-item--disabled': {
        color: '#a2a2a2 !important',
        pointerEvents: 'none !important',
        ...config.styles.disabled
      },
      '& .react-contextmenu-item--divider': {
        pointerEvents: 'none',
        height: config.platform === 'mac' ? '2px' : '1px',
        background:
          config.platform === 'windows'
            ? config.variant === 'dark' ? '#404040' : '#D7D7D7'
            : config.platform === 'edge'
              ? config.variant === 'dark' ? '#808080' : '#919191'
              : config.platform === 'mac'
                ? 'rgba(0, 0, 0, 0.07)'
                : config.variant === 'dark'
                  ? 'rgba(255,255,255,0.1)'
                  : '#e9e9e9',
        margin:
          config.platform === 'windows'
            ? '2px 0'
            : config.platform === 'edge'
              ? '4px 12px'
              : config.platform === 'mac' ? '5px 0' : '5px 1px',
        ...config.styles.divider
      }
    },
    primary: {
      flexGrow: 1,
      padding: config.platform === 'edge' ? '0' : '0 10px',
      ...config.styles.primary
    },
    secondary: {
      color: config.platform === 'windows' ? fontColor : '#a2a2a2',
      marginLeft: '5px',
      ...config.styles.secondary
    }
  }

  return jss.createStyleSheet(styles).attach().classes
}
