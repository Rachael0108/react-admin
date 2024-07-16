import type { ProxyOptions } from 'vite';

type ProxyList = [string, string][]

type ProxyTargetList = Record<string, ProxyOptions>

/**
 * 创建跨域
 * @param list - 二维数组参数
 */
export function createProxy(list: ProxyList = []) {
  const res: ProxyTargetList = {};

  for (const [prefix, target] of list) {
    // target: https://mock.mengxuegu.com/mock/63f830b1c5a76a117cab185e/v1
    res[`^${prefix}`] = {
      target,
      changeOrigin: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ''), // 如果接口是prefix才会进行转发，这里是/api
    };
  }

  return res;
}
