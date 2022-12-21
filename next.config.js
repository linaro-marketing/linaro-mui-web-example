const removeImports = require('next-remove-imports')();
const fs = require('fs');
const path = require('path');

// Load in the correct variables for the specified environment.
require('dotenv').config({
	path: `environments/${process.env.BUILD_ENV || 'localhost'}`,
});
// Load in the variables to configure Sentry. This file is dynamically
// built when deploy_serverless.sh is run.
require('dotenv').config({
	path: '.sentry.env',
});

console.log(`Current Environment: ${process.env.BUILD_ENV}`);
console.log(`Current Site URL: ${process.env.NEXT_PUBLIC_SITE_URL}`);
// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = removeImports({
	webpack: function (config) {
		config.resolve.alias = {
			...config.resolve.alias,
			react: path.resolve('./node_modules/react'),
			'react-dom': path.resolve('./node_modules/react-dom'),
			'next-seo': path.resolve('./node_modules/next-seo'),
			next: path.resolve('./node_modules/next'),
			'@emotion/styled': path.resolve('./node_modules/@emotion/styled'),
			'@emotion/react': path.resolve('./node_modules/@emotion/react'),
		};
		return config;
	},
	reactStrictMode: true,
	// Domains to allow remote image retrieval from.
	// When uploading images to s3, set this to the public s3 bucket url#
	images: {
		domains: [
			process.env.NEXT_PUBLIC_SITE_URL,
			'static.linaro.org',
			'gravatar.com',
			'via.placeholder.com',
		],
	},
	// The following line MUST BE LEFT HERE so that the source maps can
	// be uploaded to Sentry. The script "deploy_serverless.sh" takes care
	// of deleting the source maps from the S3 bucket after serverless
	// has uploaded them.
	productionBrowserSourceMaps: true,
});

module.exports = nextConfig;
