import { Component, onCleanup, onMount } from "solid-js";
import { iWidget, Lang, Widget } from "./cdek-widget";

type CdekWidgetProps = Partial<iWidget>;

const defaultConfig: iWidget = {
    apiKey: import.meta.env.VITE_YANDEX_MAPS_API_KEY,
    canChoose: true, //
    servicePath: 'https://widget.cdek.ru/service.php',
    debug: true,
    defaultLocation: 'Санкт-Петербург',
    lang: Lang.RUS,
    popup: false,
    root: "cdek-map",
    currency: "RUB",
    onReady: () => console.log('Widget is ready'),
    onChoose: (delivery, rate, address) => {
        console.log(delivery, rate, address);
    },
};

const CdekWidget: Component<CdekWidgetProps> = (props) => {
    // Create a ref to store the widget instance
    let widget: Widget;

    // Function to log errors
    const logError = (message: string, error: any) => {
        console.error(message, error);
    };

    // Widget configuration
    const config: iWidget = {
        ...defaultConfig,
        ...props,
    };

    // Function to initialize the CDEK widget
    const intializeWidget = () => {
        // @ts-ignore
        if (window.CDEKWidget) {
            try {
                // @ts-ignore
                widget = new window.CDEKWidget(config);
            } catch (error) {
                logError('Error initializing CDEK Widget:', error);
            }
        } else {
            logError('CDEK Widget is not available', null);
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

    return (
        <div id="cdek-map" style="width: 100%; height: 600px;" />
    );
};

export default CdekWidget;
