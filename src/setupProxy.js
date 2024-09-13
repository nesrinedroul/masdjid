const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth', // This will match any requests that start with /auth
    createProxyMiddleware({
      target: 'https://mohannednes.pythonanywhere.com', // Replace with your backend URL
      changeOrigin: true,
    })
  );
};
