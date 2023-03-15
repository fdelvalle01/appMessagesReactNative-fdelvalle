// esto sirve para que el metro bundler pueda leer los archivos .cjs 
// que son los que se generan al compilar los archivos .ts

const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;
