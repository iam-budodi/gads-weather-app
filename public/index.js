import { onSuccess, onFailure } from './scripts/scripts.js'
     
if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
    try {
        
            const registration = await navigator.serviceWorker.register('index-sw.js', {scope: '/'})
            console.log('Service worker registration sucessful');
            console.log(`Registered with scope: ${registration.scope}`)
            navigator.geolocation.getCurrentPosition(onSuccess, onFailure)
    } catch (error) {
        console.log('Service worker registration failed');
        console.log(error.message);
    }
})
}
