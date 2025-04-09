module.exports = {
  plugins: [
    // A plugin that does not require configuration:
    'simple-plugin-example',
 
    // A plugin which needs a configuration object:
    [
      'plugin-with-configuration',
      {
        optionA: '...',
      },
    ],
 
    // A plugin that is toggled on or off based on environment:
    [
      'plugin-toggled',
      process.env.NODE_ENV === 'production'
        ? {
            optionA: '...',
          }
        : false,
    ],
 
    // Boolean expressions are also valid.
    // `true` enables the plugin, `false` disables the plugin:
    ['plugin-toggled-2', true /* a === b, etc */],
  ],
}