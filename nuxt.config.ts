// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "SOMSRI DESIGNER",
      link: [
        {
          rel: "stylesheet",
          href: "/css/bootstrap.css",
        },
        {
          rel: "stylesheet",
          href: "https://cdn.jsdelivr.net/npm/remixicon@2.2.0/fonts/remixicon.css",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
        },
      ],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
        },
        {
          src: "https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js",
        },
        {
          src: "https://code.jquery.com/jquery-3.7.0.js",
        },
        {
          src: "https://unpkg.com/axios@1.1.2/dist/axios.min.js"
        },
        {
          src: "https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js",
        },
        {
          src: "https://cdn.jsdelivr.net/npm/sweetalert2@11",
        },
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js",
          integrity: "sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT",
          crossorigin: "anonymous"
        }
      ],
    },
  },
})
