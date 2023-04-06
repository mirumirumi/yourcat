module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/scss/_variables.scss";`,
      },
    },
  },
  publicPath: process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development"
    ? "/apps/yourcat/"
    : "/",
};
