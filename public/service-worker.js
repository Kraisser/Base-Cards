self.addEventListener('install', (event) => {
	console.log('👷', 'install', event);
	self.skipWaiting();
});

self.addEventListener('activate', (event) => {
	var cacheKeeplist = ['v2'];

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
	// Regular requests not related to Web Share Target.
	// if (event.request.method !== 'POST') {
	// 	event.respondWith(fetch(event.request));
	// 	return;
	// }
	// Requests related to Web Share Target.
	// event.respondWith(
	// 	(async () => {
	// 		const formData = await event.request.formData();
	// 		const link = formData.get('link') || '';
	// 		// Instead of the original URL `/save-bookmark/`, redirect
	// 		// the user to a URL returned by the `saveBookmark()`
	// 		// function, for example, `/`.
	// 		// const responseUrl = await navigateToAddCard(link);
	// 		return Response.redirect('/addCard', 303);
	// 	})()
	// );
});
