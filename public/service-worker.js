/* eslint-disable no-restricted-globals */
self.addEventListener('install', (event) => {
	console.log('👷', 'install', event);
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	var cacheKeeplist = ['v3'];

	event.waitUntil(
		caches.keys().then((keyList) => {
			return Promise.all(
				keyList.map((key) => {
					if (cacheKeeplist.indexOf(key) === -1) {
						return caches.delete(key);
					}
				})
			);
		})
	);
	return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
	console.log('fetch');
	const url = new URL(event.request.url);
	if (event.request.method === 'POST' && url.pathname === '/addCard') {
		event.waitUntil(
			(async () => {
				try {
					const formData = await event.request.formData();
					console.log('event.request: ', event.request);

					console.log('formData: ', formData);
					const title = formData.get('title') || '';
					const text = formData.get('text') || '';
					const link = formData.get('url') || '';

					const dataArr = [link, text, title];

					const urlRegExp = /https?:\/\/?[a-z0-9-]+\.+[a-z]{2,}\S+/im;

					const validLinkString = dataArr.find((item) => {
						const urlMatched = item ? item.match(urlRegExp) : false;

						if (urlMatched) {
							return item;
						} else {
							return false;
						}
					});

					const validLink = validLinkString ? validLinkString.match(urlRegExp)[0] : '';

					const sharedData = {link: validLink || ''};

					const client = await self.clients.get(event.resultingClientId || event.clientId);
					client.postMessage(sharedData);
				} catch (e) {
					console.log('e: ', e);
					const client = await self.clients.get(event.resultingClientId || event.clientId);
					client.postMessage({link: e.message});
				}
			})()
		);
		event.respondWith(Response.redirect('/addCard'));
		console.log('ok');
		return true;
	}
});

self.addEventListener('error', function (event) {
	console.log('error from sw.js:', event);
});
