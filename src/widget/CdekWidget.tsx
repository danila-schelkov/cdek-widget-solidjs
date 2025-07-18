import { Component, onCleanup, onMount } from "solid-js";
import Widget from "types/cdek-widget.es";

const CdekWidget: Component<{}> = () => {
    // Create a ref to store the widget instance
    let widget: Widget;

    // Function to log errors
    const logError = (message: string, error: any) => {
        console.error(message, error);
    };

    // Widget configuration
    const getWidgetConfig = () => ({
        apiKey: process.env.YANDEX_MAPS_API_KEY, // API key for Yandex Maps
        canChoose: true, // Ability to choose the pickup point
        servicePath: 'http://localhost:8000/service.php', // Path to the PHP file
        hideFilters: {
            have_cashless: false, // Control visibility of the "Cashless Payment" filter
            have_cash: false, // Control visibility of the "Cash Payment" filter
            is_dressing_room: true, // Control visibility of the "Dressing Room Available" filter
            type: true, // Display the "Pickup Point Type" filter
        },
        debug: true, // Enable debug information output
        defaultLocation: 'Санкт-Петербург', // Default address
        lang: 'rus', // Widget language
        hideDeliveryOptions: {
            office: false, // Ability to choose delivery to the pickup point
            door: true, // Hide delivery to the door
        },
        popup: false, // Open the widget in a modal window
        root: "cdek-map",  // id of map element

        // Function called after the widget finishes loading
        onReady: () => console.log('Widget is ready'),
        // Function called after the customer selects a pickup point
        onChoose: (delivery: string, rate: string, address: string) => {
            console.log(delivery, rate, address);
        },
    });

    // Function to initialize the CDEK widget
    const intializeWidget = () => {
        // @ts-ignore
        if (window.CDEKWidget) {
            try {
                // @ts-ignore
                widget = new window.CDEKWidget(getWidgetConfig());
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
            script?.remove();
        });
    });

    return (
        <div id="cdek-map" style="width: 100%; height: 600px;" />
    );
};

export default CdekWidget;
