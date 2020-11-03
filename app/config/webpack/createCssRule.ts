import { RuleSetUse, RuleSetQuery, RuleSetCondition } from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const createCSSRule = (
  test: RuleSetCondition,
  loader?: string,
  options?: RuleSetQuery
) => {
  const isProd = process.env.NODE_ENV === 'production';

  const use: RuleSetUse = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: !isProd
      }
    },
    {
      loader: 'css-modules-typescript-loader',
      options: {
        mode: 'emit'
      }
    },
    {
      loader: 'css-loader',
      options: {
          modules: false,
          // modules: {
      //   mode: 'local',
      //   context: resolve(frontendDir, 'src'),
      //   localIdentName: '[path][name]__[local]',
      // },
        localsConvention: 'camelCaseOnly',
        importLoaders: 0,
        sourceMap: true,
      },
    },
    {
      loader: 'postcss-loader'
    }
  ];

  if (loader) {
    use.push({ loader, options })
  }

  return { test, use };
}
