// _worker.js

export default {
	async fetch(request, env, ctx) {		  
		// 获取请求的 URL
		const url = new URL(request.url);

		console.log(url)
		// 生成目标 URL，去掉 Worker 的路径部分
		const targetUrl = `${url.protocol}//${url.hostname}${url.pathname}${url.search}`;

		const modifiedRequest = new Request(targetUrl, {
			method: request.method,
			headers: request.headers,
			body: request.method === 'POST' ? request.body : null,
		});
		
		console.log(url)
		// 处理跨域请求，允许 CORS
		const response = await fetch(modifiedRequest);
		const modifiedResponse = new Response(response.body, response);

		// 设置 CORS 头
		modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
		modifiedResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');

		return modifiedResponse;
	}
};


