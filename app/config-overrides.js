const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = {
  webpack: override(
    // usual webpack plugin
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#25b864' },
    })
  )
};