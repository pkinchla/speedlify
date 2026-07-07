// Cloudflare on paulkinchla.com challenges headless Chrome. This tags the
// browser's User-Agent with a secret token so a Cloudflare WAF custom rule
// can skip the security check for this specific requester.
const CLOUDFLARE_BYPASS_SECRET = "eb32cd721ee0eacc";

const urls = [
  "https://paulkinchla.com",
  "https://paulkinchla.com/about/",
  "https://paulkinchla.com/projects/",
  "https://paulkinchla.com/blog/",
  "https://paulkinchla.com/blog/2020/10/28/javascript-still-a-ghost/",
];

module.exports = {
  description: "My personal website.",
  options: {
    frequency: 60 * 23, // (in minutes), 23 hours
    chromeFlags: [
      "--headless",
      "--disable-dev-shm-usage",
      "--ignore-certificate-errors",
      "--no-enable-error-reporting",
      `--user-agent=${CLOUDFLARE_BYPASS_SECRET}`,
    ],
    // performance-leaderboard's built-in axe scanner launches its own
    // Puppeteer browser with no way to set a custom User-Agent, so it still
    // gets Cloudflare-challenged. Skip it here — run-tests.js runs axe
    // itself for these URLs using the tagged User-Agent above instead.
    bypassAxe: urls,
    bypassAxeUserAgent: CLOUDFLARE_BYPASS_SECRET,
  },
  urls,
};
