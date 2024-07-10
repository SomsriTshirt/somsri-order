export default defineNuxtPlugin(() => {
  return {
    provide: {
      imageUrl: (path: string = '', width: number = 2000): string => {
        const { $api } = useNuxtApp();

        // IF USE SERVER IMAGE
        if (path.includes('/uploads/images')) return $api(path);

        // IF USE DRIVE IMAGE
        let url = `${path}`;
        if (width) {
          url += `&sz=w${width}`;
        }
        return $api(url);
      },
    },
  };
});
