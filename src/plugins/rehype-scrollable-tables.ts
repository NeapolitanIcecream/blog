interface HastNode {
  type: string
  tagName?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

export function rehypeScrollableTables() {
  return (tree: HastNode) => {
    function walk(node: HastNode) {
      for (const [index, child] of (node.children ?? []).entries()) {
        if (child.type === 'element' && child.tagName === 'table') {
          node.children![index] = {
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['table-scroll'],
              role: 'region',
              tabIndex: 0,
              ariaLabel: '可横向滚动的数据表',
            },
            children: [child],
          }
          continue
        }

        walk(child)
      }
    }

    walk(tree)
  }
}
