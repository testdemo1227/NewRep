class Settings {
    public production = false;
    public bookingsUrl = '';
    public hotelsUrl = '';
    public suggestionsUrl = '';
}

declare global {
    interface Window {
        settings: Settings;
    }
}

let clientSettings = new Settings();

if (window.settings) {
    clientSettings = { ...clientSettings, ...window.settings }
}

export let settings = clientSettings;
