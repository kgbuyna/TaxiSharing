const { getDefaultConfig } = require("metro-config");
const { getDefaultConfig: getExpoDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const metroConfig = await getDefaultConfig();
  const expoConfig = getExpoDefaultConfig(__dirname);

  return {
    ...metroConfig,
    ...expoConfig,
    transformer: {
      babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
      ...metroConfig.resolver,
      assetExts: metroConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
      sourceExts: [...metroConfig.resolver.sourceExts, "svg", 'jsx', 'js', 'ts', 'tsx', 'mjs', 'cjs'],
    },
  };
})();
