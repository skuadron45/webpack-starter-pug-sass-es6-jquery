function isDevMode() {
  const MODE = process.env.MODE || 'production';
  return MODE === 'development';
}

exports.pages = function (folder = '') {
  const rootPagesFolderName = 'pages'
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const fs = require('fs')
  const path = require('path')
  const viewsFolder = path.join(__dirname, `../src/views/${rootPagesFolderName}/${folder}`)

  var pages = []

  fs.readdirSync(viewsFolder).forEach(view => {
    if (view.split('.')[1] === undefined)
      return false;

    const viewName = view.split('.')[0];
    const fileName = folder === '' ? `${viewName}/index.html` : `${folder}/${viewName}/index.html`;
    const options = {
      minify: !isDevMode(),
      filename: fileName,
      template: `views/${rootPagesFolderName}/${folder}/${view}`,
      inject: true
    };

    if (isDevMode()) {
      options.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      };
    }

    pages.push(new HtmlWebpackPlugin(options));
  })

  return pages;
}

exports.isDevMode = isDevMode;

exports.getMode = function () {
  const MODE = process.env.MODE || 'production';
  return MODE;
}
