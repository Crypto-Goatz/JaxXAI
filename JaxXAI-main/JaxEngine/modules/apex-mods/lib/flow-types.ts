import type { NodeType } from "./some-module" // Assuming NodeType is declared in another module

export interface Node {
  id: string
  type: NodeType
  position: { x: number; y: number }
  label: string
  description?: string
}
