const path = require('path')
const mainTheme = path.resolve(__dirname, "./src/assets/common/main.less");
module.exports = {
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import "${mainTheme}";`,
                },
            },
        },
    },
};