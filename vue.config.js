module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/scss/_variables.scss";`,
      },
    },
  },
  publicPath: process.env.NODE_ENV === "prd"
    ? "https://mirumi.me/apps/yourcat/"
    : "/",
};
