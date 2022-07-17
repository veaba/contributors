import { ConfigItem } from "./src/core/types"

/**
 * Github user custom contributors svg here
 * ignore: {array} if you need ignore some users
 * height: svg height
 * width: svg width
 * fontSize: svg login name width
 * isRadius: need radius for avatar, default：true // TODO
 */
const config: ConfigItem =
{
  // https://github.com/veaba/contributors
  // 'veaba/contributors': {
  //   ignore: [], // 
  //   size: 64,
  //   height: 200,
  //   width: 800,
  //   fontSize: 20
  // },
  // https://github.com/vuejs-translations/docs-zh-cn
  'vuejs-translations/docs-zh-cn': {
    ignore: [
      'yy990803', 'NataliaTepluhina', 'skirtle-code', 'bencodezen', 'dependabot[bot]',
      'LinusBorg', 'KiritaniAyaka', 'Alex-Sokolov', 'sdras', 'marina-mosti', 'CyberAP',
      'danielkellyio', 'tylermercer',
    ], // if you need ignore some users
    // users: [],?? maybe we need this field.
    ignoreTotal: 2, // 过滤低于这个 total 的用户
    size: 64,
    height: 200,
    width: 800,
    fontSize: 20,
    isRadius: false,
  }
}

export default config