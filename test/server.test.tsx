import { describe, expect, it } from 'vitest'
import { isServer, renderToString } from 'solid-js/web'
import { CdekWidget, createWidget } from '../src/widget'

describe('environment', () => {
    it('runs on server', () => {
        expect(typeof window).toBe('undefined')
        expect(isServer).toBe(true)
    })
})

describe('createWidget', () => {
    it('Returns a signal', () => {
        const [widget] = createWidget(undefined, {})
        expect(widget()).toBeUndefined()
    })
})

describe('CdekWidget', () => {
    it('renders a Widget component', () => {
        const string = renderToString(() => <CdekWidget />)
        expect(string).toBe('<div id="cdek-map" style="width:100%;height:600px;"></div>')
    })
})
