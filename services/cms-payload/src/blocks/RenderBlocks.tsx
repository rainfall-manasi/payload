import React from 'react'

import { MediaBlockReact } from '@/blocks/MediaBlock/Component'

const blockComponents = {
  mediaBlock: MediaBlockReact,
}

export type BlocksFeature = {
  blockType: keyof typeof blockComponents
  id: string
}

export const RenderBlocks: React.FC<{
  blocks: BlocksFeature[]
}> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null
  }

  return (
    <div>
      {blocks.map((block) => {
        const Component = blockComponents[block.blockType]
        if (!Component) return null

        return (
          <Component
            key={block.id}
            {...block}
          />
        )
      })}
    </div>
  )
}
