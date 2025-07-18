import { createEffect, createSignal, type Component } from 'solid-js';
import CdekWidget from "src/widget";
import { iWidget, Widget, WidgetSchema } from 'src/widget/cdek-widget';

const widgetConfig: WidgetSchema = {
    debug: false,
    onReady: () => console.log('Widget is ready'),
    onChoose: (delivery, rate, address) => {
        console.log(delivery, rate, address);
    },
};

const App: Component = () => {
    const signal = createSignal<Widget>();

    createEffect(() => {
        console.log(signal[0]());
    });

    return (
        <>
            <CdekWidget signal={signal} config={widgetConfig} />
        </>
    )
}

export default App
