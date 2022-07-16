import { ConfigItem } from "./src/core/types"

/**
 * Github user custom contributors svg here
 * ignore: {array} if you need ignore some users
 * height: svg height
 * width: svg width
 * fontSize: svg login name width
 */
const config: ConfigItem =
{
  // https://github.com/veaba/contributors
  'veaba/contributors': {
    ignore: [], // 
    size:100,
    height: 420,
    width: 800,
    fontSize: 20
  },
  // https://github.com/vuejs-translations/docs-zh-cn
  'vuejs-translations/docs-zh-cn': {
    ignore: [], // if you need ignore some users
    size:64,
    height: 300,
    width: 800,
    fontSize: 10,
  }
}

export default config