import Hotjar from '@hotjar/browser';
export default defineNuxtPlugin(() => {
  const siteId = 3754498;
  const hotjarVersion = 6;

  return {
    provide: {
      hotjar: () => {
        Hotjar.init(siteId, hotjarVersion);
      },
    },
  };
});
