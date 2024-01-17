import * as Sentry from '@sentry/vue';
export default defineNuxtPlugin((nuxtApp: any) => {
  const { vueApp } = nuxtApp;

  Sentry.init({
    app: [vueApp],
    dsn: 'https://4540788bbc00e2efaceeb652887e13aa@o4506269816324096.ingest.sentry.io/4506287648997376',
    environment: process.dev ? 'production' : 'development',
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: ['https://order.somsritshirt.com'],
        routingInstrumentation: Sentry.vueRouterInstrumentation(nuxtApp.$router),
      }),
      new Sentry.Replay(),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0,
  });
});
