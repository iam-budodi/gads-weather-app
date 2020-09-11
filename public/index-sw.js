const CACHE_NAME = "OFFLINE_PWA";

const resourcesToCache = [
    '/',
    'index.html'
]

self.addEventListener('install', installerEvent => {
    console.log('installing............');
    const doneCatching = async () => {
        const cache = await caches.open(CACHE_NAME)
        return cache.addAll(resourcesToCache)
    }

    installerEvent.waitUntil(doneCatching())
})


self.addEventListener('fetch', fetchEvent => {
    const url = fetchEvent.request.url
    console.log(`Fetching: ${ url }`)

    const getResponse = async (request) => {

        let response;
        
        response = await caches.match(request)
            if(response && response.status === 200) {
                console.log('file in cache');
                return response
            }

        try {
            response = await fetch(request)
            if(response && response.status === 404) {
                return caches.match('/myWeatherApp/404.html')
            }
            
        } catch(error) {
            return caches.match('/myWeatherApp/index.html')
        }

        const clone = response.clone()
    const cache = await caches.open(CACHE_NAME)
    cache.put(url, clone)
    return response
    }

    fetchEvent.respondWith(getResponse(fetchEvent.request))
})


self.addEventListener('activate', activator => {
    console.log('Activating...........');

    const currentCaches = [CACHE_NAME];
    const done = async () => {
        const names = await caches.keys();
        return Promise.all(names.map(name => {
            if(!currentCaches.includes(name)) {
                return caches.delete(name);
            }
        }));
    };

    // @ts-ignore
    activator.waitUntil(done());
});