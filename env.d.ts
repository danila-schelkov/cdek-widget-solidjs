declare global {
    interface ImportMeta {
        env: {
            NODE_ENV: 'production' | 'development';
            PROD: boolean;
            DEV: boolean;
            VITE_YANDEX_MAPS_API_KEY: string;
        };
    }
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'production' | 'development';
            PROD: boolean;
            DEV: boolean;
        }
    }
}

export { };
