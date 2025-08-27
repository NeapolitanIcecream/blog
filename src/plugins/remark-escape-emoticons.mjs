import { visit } from 'unist-util-visit'

// Some emoticons like ":D", ":P", ":O" are parsed by remark-directive as
// `textDirective` (name being a single letter). That drops them during mdast → hast
// if no handler exists. This plugin restores such bare single-letter directives
// back to literal text so they render as-is.
export function remarkEscapeEmoticonDirectives() {
  return (tree) => {
    // Inline case: ":D" inside a paragraph
    visit(tree, 'textDirective', (node) => {
      const name = node?.name ?? ''
      const hasNoAttrs = !node.attributes || Object.keys(node.attributes).length === 0
      const hasNoChildren = !node.children || node.children.length === 0
      const isSingleLetter = typeof name === 'string' && /^[A-Za-z]$/.test(name)

      if (isSingleLetter && hasNoAttrs && hasNoChildren) {
        node.type = 'text'
        node.value = `:${name}`
        delete node.name
        delete node.attributes
        delete node.children
      }
    })

    // Edge case: a bare emoticon placed as a block on its own line
    visit(tree, 'leafDirective', (node) => {
      const name = node?.name ?? ''
      const hasNoAttrs = !node.attributes || Object.keys(node.attributes).length === 0
      const hasNoChildren = !node.children || node.children.length === 0
      const isSingleLetter = typeof name === 'string' && /^[A-Za-z]$/.test(name)

      if (isSingleLetter && hasNoAttrs && hasNoChildren) {
        node.type = 'paragraph'
        node.children = [{ type: 'text', value: `:${name}` }]
        delete node.name
        delete node.attributes
      }
    })
  }
}


