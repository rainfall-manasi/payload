'use client'

import { useEffect } from 'react'

const StylesInjector = () => {
  useEffect(() => {
    // Add Google Fonts
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Noto+Sans"]')) {
      const fontLink = document.createElement('link')
      fontLink.rel = 'stylesheet'
      fontLink.href =
        'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&display=swap'
      document.head.appendChild(fontLink)
    }

    // Add custom styles
    if (!document.getElementById('noto-sans-admin-styles')) {
      const style = document.createElement('style')
      style.id = 'noto-sans-admin-styles'
      style.textContent = `
        .noto-sans-editor [data-lexical-editor] p {
          font-family: 'Noto Sans', sans-serif !important;
          font-weight: 400 !important;
          font-size: 18px !important;
          color: #333333 !important;
          line-height: 1.5 !important;
        }
        .noto-sans-editor [data-lexical-editor] h1 {
          font-family: 'Noto Sans', sans-serif !important;
          font-weight: 600 !important;
          font-size: 34px !important;
          color: #000000 !important;
          line-height: 1.2 !important;
        }
        .noto-sans-editor [data-lexical-editor] h2 {
          font-family: 'Noto Sans', sans-serif !important;
          font-weight: 700 !important;
          font-size: 22px !important;
          color: #000000 !important;
          line-height: 1.3 !important;
        }
        .noto-sans-editor [data-lexical-editor] h3 {
          font-family: 'Noto Sans', sans-serif !important;
          font-weight: 600 !important;
          font-size: 20px !important;
          color: #333333 !important;
          line-height: 1.3 !important;
        }
        .noto-sans-editor [data-lexical-editor] h4 {
          font-family: 'Noto Sans', sans-serif !important;
          font-weight: 600 !important;
          font-size: 14px !important;
          color: #BDBDBD !important;
          line-height: 1.4 !important;
        }
        .noto-sans-editor [data-lexical-editor] ol,
        .noto-sans-editor [data-lexical-editor] ul {
          font-family: 'Noto Sans', sans-serif !important;
          font-weight: 400 !important;
          font-size: 18px !important;
          color: #333333 !important;
          line-height: 1.5 !important;
        }
        .noto-sans-editor [data-lexical-editor] li {
          font-family: 'Noto Sans', sans-serif !important;
          font-weight: 400 !important;
          font-size: 18px !important;
          color: #333333 !important;
        }
        .noto-sans-editor [data-lexical-editor] * {
          font-family: 'Noto Sans', sans-serif !important;
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  return null
}

export default StylesInjector
