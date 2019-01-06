import { css } from 'glamor'

css.global('*, *:after, *:before', { boxSizing: 'border-box' })
css.global('a:hover', { color: 'inherit' })
css.global('h1, h2, h3, h4, h5, h6', { margin: 0, lineHeight: '1.3' })
css.global('strong', { fontWeight: 'bold' })
css.global('img', { maxWidth: '100%' })
css.global('ul', { listStyle: 'none' })
css.global(
    `html, body, div, article, aside, footer, header, main, nav, section, form,
  h1, h2, h3, h4, h5, h6, p, a, span, em, img, strong, ol, ul, li, label`,
    {
        border: 0,
        font: 'inherit',
        fontSize: '100%',
        margin: 0,
        padding: 0,
        verticalAlign: 'baseline'
    }
)
css.global('.ui.primary.button', { backgroundColor: '#c37e16' })
css.global(':root', {
    color: '#333',
    fontSize: 16,
    lineHeight: 1.5,
    letterSpacing: 0.5,
    overflowScrolling: 'touch',
    fontWeight: 300,
    fontFamily: `
    '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica',
    'Arial', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'
  `
})
css.global('p', { marginBottom: '1rem' })
css.global('a', {
    color: 'inherit',
    textDecoration: 'none',
    transition: 'color 0.1s linear'
})
css.global('em', { fontStyle: 'italic' })
css.global('#root', {
    overflow: 'hidden',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
})


