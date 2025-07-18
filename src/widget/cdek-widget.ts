import { AnyObject } from "yup";
import { InferType } from "yup";
import { LngLat } from "@yandex/ymaps3-types/common/types";
import { Maybe } from "yup";
import { ObjectSchema } from "yup";

export const enum CdekDeliveryType {
    DOOR_DOOR = 1,
    DOOR_OFFICE = 2,
    OFFICE_DOOR = 3,
    OFFICE_OFFICE = 4,
    DOOR_PICKUP = 6,
    OFFICE_PICKUP = 7,
    PICKUP_DOOR = 8,
    PICKUP_OFFICE = 9,
    PICKUP_PICKUP = 10,
}

export const enum DeliveryMode {
    DOOR = "door",
    OFFICE = "office",
}

export type iGeocoderComponent = {
    name: string;
    kind: YandexGeocoderKind;
};

export type iGeocoderMember = {
    name: string;
    position: number[];
    kind: YandexGeocoderKind;
    precision: YandexGeocoderPrecision;
    formatted: string;
    country_code: string;
    postal_code: string | null;
    components: iGeocoderComponent[];
    bounds: {
        lower: number[];
        upper: number[];
    };
};

export type iOffice = {
    city_code: number;
    city: string;
    region: string;
    type: OfficeType;
    country_code: string;
    postal_code: string;
    have_cashless: boolean;
    have_cash: boolean;
    allowed_cod: boolean;
    is_dressing_room: boolean;
    code: string;
    name: string;
    address: string;
    work_time: string;
    location: LngLat;
    dimensions: Array<{
        depth: number;
        width: number;
        height: number;
    }> | null;
    weight_min: number;
    weight_max: number;
};

export type iParcel = {
    length: number;
    width: number;
    height: number;
    weight: number;
};

export type iTariff = {
    tariff_code: number;
    tariff_name: string;
    tariff_description: string;
    delivery_mode: CdekDeliveryType;
    period_min: number;
    period_max: number;
    delivery_sum: number;
};

export type iWidget = InferType<typeof widgetSchema> & {
    goods: iParcel[];
    offices: iOffice[] | null;
    defaultLocation: string | LngLat;
    lang: Lang;
    onCalculate?: tCalculateFunction;
    onReady?: tReadyFunction;
    onChoose?: tChooseFunction;
};

export enum Lang {
    RUS = "rus",
    ENG = "eng",
}

export enum OfficeType {
    ALL = "ALL",
    OFFICE = "PVZ",
    PICKUP = "POSTAMAT",
}

export type tCalculateFunction = (
    prices: {
        office: iTariff[];
        door: iTariff[];
        pickup: iTariff[];
    },
    address: {
        code?: number;
        address?: string;
    },
) => void;

export type tChooseFunction = (
    type: DeliveryMode,
    tariff: iTariff | null,
    target: iOffice | iGeocoderMember,
) => void;

export type tReadyFunction = () => void;

export declare class Widget {
    private readonly params;
    private readonly yandexApi;
    private readonly cdekApi;
    private readonly app;
    private readonly div;
    private readonly customDiv;
    constructor(input: iWidget);
    updateOffices(offices: iOffice[]): Promise<void>;
    updateOfficesRaw(officesRaw: any): Promise<void>;
    updateLocation(location: any, zoom?: YandexMapZoomVariants): Promise<void>;
    updateTariff(tariff: iTariff): Promise<void>;
    clearSelection(): void;
    destroy(): void;
    open(): void;
    close(): void;
    addParcel(parcel: iParcel | iParcel[]): void;
    getParcels(): {
        length: number;
        width: number;
        height: number;
        weight: number;
    }[];
    resetParcels(): void;
    selectOffice(code: string): void;
    private fixBounds;
    private init;
}

export declare const widgetSchema: ObjectSchema<
    {
        /** API key for Yandex Maps */
        apiKey: string;
        /** Id of widget element */
        root?: string;
        sender?: boolean;
        /** Ability to choose the pickup point */
        canChoose?: boolean;
        /** Open the widget in a modal window */
        popup?: boolean;
        /** Path to the PHP file */
        servicePath: string;
        hideFilters?: {
            /** Control visibility of the "Cashless Payment" filter */
            have_cashless?: boolean;
            /** Control visibility of the "Cash Payment" filter */
            have_cash?: boolean;
            /** Control visibility of the "Dressing Room Available" filter */
            is_dressing_room?: boolean;
            /** Display the "Pickup Point Type" filter */
            type?: boolean;
        };
        forceFilters?: {
            have_cashless: boolean | null;
            have_cash: boolean | null;
            is_dressing_room: boolean | null;
            type: OfficeType | null;
            allowed_cod: boolean | null;
        };
        hideDeliveryOptions?: {
            /** Hide delivery to the door */
            door: boolean;
            /** Ability to choose delivery to the pickup point */
            office: boolean;
        };
        /** Enable debug information output */
        debug?: boolean;
        requirePostcode?: boolean;
        fixBounds?:
            | YandexGeocoderKind.COUNTRY
            | YandexGeocoderKind.PROVINCE
            | YandexGeocoderKind.LOCALITY
            | null;
        offices?: any[] | null;
        officesRaw?: any[] | null;
        tariff?: {
            tariff_code?: number | undefined;
            tariff_name?: string | undefined;
            tariff_description?: string | undefined;
            delivery_mode?: number | undefined;
            period_min?: number | undefined;
            period_max?: number | undefined;
            delivery_sum?: number | undefined;
        } | null;
        goods?: {
            width: number;
            length: number;
            height: number;
            weight: number;
        }[];
        from?:
            | string
            | {
                  code?: number | null;
                  postal_code?: string | null;
                  country_code?: string | null;
                  city?: string | null;
                  address?: string | null;
              }
            | null;
        /** Default address */
        defaultLocation: NonNullable<string | LngLat | undefined>;
        /** Widget language */
        lang?: Lang;
        currency?: string;
        tariffs?: {
            door?: any[];
            office?: any[];
            pickup?: any[];
        };
        // Function called after the widget finishes loading
        onReady?: tReadyFunction | undefined;
        onCalculate?: tCalculateFunction | undefined;
        // Function called after the customer selects a pickup point
        onChoose?: tChooseFunction | undefined;
        selected?: {
            door?: string | null;
            office?: string | null;
        };
    },
    AnyObject,
    {
        apiKey: any;
        root: "cdek-map";
        sender: false;
        canChoose: true;
        popup: false;
        servicePath: "/service.php";
        hideFilters: {
            have_cashless: false;
            have_cash: false;
            is_dressing_room: false;
            type: false;
        };
        forceFilters: {
            have_cashless: null;
            have_cash: null;
            is_dressing_room: null;
            type: null;
            allowed_cod: null;
        };
        hideDeliveryOptions: {
            office: false;
            door: false;
        };
        debug: false;
        requirePostcode: false;
        fixBounds: null;
        offices: null;
        officesRaw: null;
        tariff: null;
        goods: "d";
        from: undefined;
        defaultLocation: undefined;
        lang: Lang.RUS;
        currency: "RUB";
        tariffs: {
            door: number[];
            office: number[];
            pickup: number[];
        };
        onReady: Maybe<tReadyFunction | undefined>;
        onCalculate: Maybe<tCalculateFunction | undefined>;
        onChoose: Maybe<tChooseFunction | undefined>;
        selected: {
            door: null;
            office: null;
        };
    },
    ""
>;

export const enum YandexGeocoderKind {
    OTHER = "other",
    ENTRANCE = "entrance",
    AIRPORT = "airport",
    VEGETATION = "vegetation",
    ROUTE = "route",
    STATION = "station",
    RAILWAY = "railway_station",
    HYDRO = "hydro",
    REGION = "region",
    COUNTRY = "country",
    PROVINCE = "province",
    AREA = "area",
    LOCALITY = "locality",
    DISTRICT = "district",
    METRO = "metro",
    STREET = "street",
    HOUSE = "house",
}

export const enum YandexGeocoderPrecision {
    OTHER = "other",
    STREET = "street",
    RANGE = "range",
    NEAR = "near",
    NUMBER = "number",
    EXACT = "exact",
}

export const enum YandexMapZoomVariants {
    GENERAL = 10,
    STREET = 15,
    HOME = 17,
}
