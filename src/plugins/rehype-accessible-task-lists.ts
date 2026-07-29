interface HastNode {
  type: string
  tagName?: string
  value?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

function getText(node: HastNode): string {
  if (node.type === 'text') return node.value ?? ''
  return node.children?.map(getText).join('') ?? ''
}

export function rehypeAccessibleTaskLists() {
  return (tree: HastNode) => {
    function walk(node: HastNode, parent?: HastNode) {
      if (
        node.type === 'element' &&
        node.tagName === 'input' &&
        node.properties?.type === 'checkbox'
      ) {
        const checked = Boolean(node.properties.checked)
        const itemText = parent ? getText(parent).trim() : ''
        node.properties.ariaLabel = `${checked ? '已完成' : '未完成'}${itemText ? `：${itemText}` : ''}`
      }

      for (const child of node.children ?? []) walk(child, node)
    }

    walk(tree)
  }
}
