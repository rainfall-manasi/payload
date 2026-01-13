import React from 'react'

const PreviewCell = ({ doc }: any) => {
  const src =
    doc?.sizes?.thumbnail?.url ||
    doc?.url ||
    (doc?.filename
      ? `/media/${encodeURIComponent(doc.filename)}`
      : null)

  if (!src) return null

  return (
    <img
      src={src}
      alt={doc?.alt || doc?.filename}
      style={{
        maxWidth: '100%',
        maxHeight: 80,
        objectFit: 'contain',
      }}
    />
  )
}

export default PreviewCell
