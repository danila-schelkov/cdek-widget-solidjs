import { Component, createSignal, onCleanup, onMount, Signal } from "solid-js";
import { iWidget, Lang, Widget } from "./cdek-widget";

type CdekWidgetProps = {
    signal?: Signal<Widget | undefined>;
    config?: Partial<iWidget>;
};

const defaultConfig: Partial<iWidget> = {
    apiKey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
    canChoose: true, //
    servicePath: "https://widget.cdek.ru/service.php",
    debug: import.meta.env.DEV,
    defaultLocation: "Санкт-Петербург",
    lang: Lang.RUS,
    popup: false,
    root: "cdek-map",
    currency: "RUB",
};

const createWidget = (
    signal: Signal<Widget | undefined> | undefined,
    config: Partial<iWidget>,
): Signal<Widget | undefined> => {
    // Create a ref to store the widget instance
    const widgetSignal = signal || createSignal<Widget>();

    // Function to log errors
    const logError = (message: string, error: any) => {
        // eslint-disable-next-line no-console
        console.error(message, error);
    };

    // Function to initialize the CDEK widget
    const intializeWidget = () => {
        // @ts-ignore
        if (window.CDEKWidget) {
            try {
                // @ts-ignore
                widgetSignal[1](new window.CDEKWidget(config));
            } catch (error) {
                logError("Error initializing CDEK Widget:", error);
            }
        } else {
            logError("CDEK Widget is not available", null);
        }
    };

    onMount(() => {
        if (typeof window === "undefined") return;

        const scriptId = "cdek-widget-script";
        if (document.getElementById(scriptId)) {
            intializeWidget();
            return;
        }

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/@cdek-it/widget@3";
        script.async = true;
        script.id = scriptId;
        document.body.appendChild(script);

        script.onload = () => {
            intializeWidget();
        };

        onCleanup(() => {
            script.remove();
        });
    });

    return widgetSignal;
};

export { createWidget };

const CdekWidget: Component<CdekWidgetProps> = (props) => {
    // Widget configuration
    const config: Partial<iWidget> = {
        ...defaultConfig,
        ...props.config,
    };

    createWidget(props.signal, config);

    return <div id="cdek-map" style="width: 100%; height: 600px;" />;
};

export { CdekWidget };

export default CdekWidget;
