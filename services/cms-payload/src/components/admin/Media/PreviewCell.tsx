import React from 'react'
import { getMediaUrl } from '../../../utilities/getMediaUrl'

const VideoCell: React.FC<any> = (props) => {
  const { rowData } = props as any

  const mimeType: string | undefined = rowData?.mimeType
  const isVideo = typeof mimeType === 'string' && mimeType.startsWith('video/')

  const url: string | undefined = rowData?.url
  const sizes = rowData?.sizes || {}
  const thumbUrl: string | undefined = sizes?.thumbnail?.url || sizes?.square?.url || url

  // Poster relationship (if set) may be populated or an ID
  const posterRel = rowData?.poster
  const posterUrl: string | undefined =
    posterRel && typeof posterRel === 'object' ? posterRel?.url : undefined

  const maxW = 140
  const maxH = 90

  if (isVideo) {
    return (
      <video
        src={url ? getMediaUrl(url) : undefined}
        poster={posterUrl ? getMediaUrl(posterUrl) : undefined}
        controls
        preload="metadata"
        style={{ maxWidth: maxW, maxHeight: maxH, borderRadius: 6 }}
      />
    )
  }

  if (thumbUrl) {
    return (
      <img
        src={getMediaUrl(thumbUrl)}
        alt={rowData?.filename || 'media'}
        style={{ maxWidth: maxW, maxHeight: maxH, borderRadius: 6, objectFit: 'cover' }}
      />
    )
  }

  return <span>No preview</span>
}

export default VideoCell