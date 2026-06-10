// Virtual modules for TanStack Start - required by @tanstack/start-server-core
// These are virtual module placeholders that satisfy the import requirements

const virtualModules = {
  '#tanstack-router-entry': {
    name: '#tanstack-router-entry',
    content: 'export const routerEntry = null;',
  },
  '#tanstack-start-entry': {
    name: '#tanstack-start-entry',
    content: 'export const startEntry = null;',
  },
  '#tanstack-start-plugin-adapters': {
    name: '#tanstack-start-plugin-adapters',
    content: 'export const pluginAdapters = null;',
  },
  'tanstack-start-manifest:v': {
    name: 'tanstack-start-manifest:v',
    content: 'export const tsrStartManifest = () => ({ routes: {} });',
  },
  'tanstack-start-injected-head-scripts:v': {
    name: 'tanstack-start-injected-head-scripts:v',
    content: 'export const tsrInject = null;',
  },
}

export function virtualModulePlugin() {
  const resolvedIds = {}
  for (const [key, module] of Object.entries(virtualModules)) {
    resolvedIds[`\0${key}`] = key
  }

  return {
    name: 'virtual-tanstack-modules',
    resolveId(id) {
      if (id in virtualModules) {
        return `\0${id}`
      }
    },
    load(id) {
      if (id.startsWith('\0')) {
        const moduleKey = id.slice(1)
        if (moduleKey in virtualModules) {
          return virtualModules[moduleKey].content
        }
      }
    },
  }
}
