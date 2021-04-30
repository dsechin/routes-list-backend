/* eslint no-bitwise: 0 */

export const ZERO_IP = '0.0.0.0';

export const PRIVATE_NETS = [
  '10.0.0.0/8',
  '172.16.0.0/12',
  '192.168.0.0/16',
];

export const CGNAT_NET = '100.64.0.0/10'; // @see https://en.wikipedia.org/wiki/Carrier-grade_NAT

export interface SubnetObject {
  address: string;
  mask: string;
}

export class Ipv4Helper {
  private static readonly IPV4_REGEX = /^(?:(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

  public static num2ip(num: number): string {
    return [
      ((num >> 24) & 255),
      ((num >> 16) & 255),
      ((num >> 8) & 255),
      ((num) & 255),
    ].join('.');
  }

  public static ip2num(ipStr: string): number {
    const b = ipStr.split('.').map(Number);

    // 244 << 24 will overflow, but 244 * 1.0 * (1 << 24) will not
    return (b[0] * 1.0 * (1 << 24))
      + (b[1] << 16)
      + (b[2] << 8)
      + (b[3]);
  }

  public static getMasksArray(): string[] {
    const masks: string[] = [];

    for (let mask = ~0; mask & ~(~0 << 29); mask <<= 1) {
      masks.push(Ipv4Helper.num2ip(mask));
    }

    return masks;
  }

  public static isIpV4(s: string): boolean {
    return Boolean(Ipv4Helper.IPV4_REGEX.test(s));
  }

  public static isIpInNet(ipStr: string, netIpStr: string, netMaskStr: string): boolean {
    const ip = Ipv4Helper.ip2num(ipStr);
    const netIp = Ipv4Helper.ip2num(netIpStr);
    const netMask = Ipv4Helper.ip2num(netMaskStr);

    return (ip & netMask) === (netIp & netMask);
  }

  public static isNet(ipStr: string, maskStr: string): boolean {
    return (Ipv4Helper.ip2num(ipStr) & ~Ipv4Helper.ip2num(maskStr)) === 0;
  }

  public static getLastSubnetAddress(ip: string, mask: string): string {
    const ipNum = Ipv4Helper.ip2num(ip);
    const maskNum = Ipv4Helper.ip2num(mask);

    return Ipv4Helper.num2ip((ipNum & maskNum) | (~maskNum));
  }

  public static getSubnetSize(ip: string, mask: string): number {
    const lastAddress = Ipv4Helper.getLastSubnetAddress(ip, mask);

    return Ipv4Helper.ip2num(lastAddress) - Ipv4Helper.ip2num(ip) - 2;
  }

  public static cidrToMask(cidrNum: number): string {
    const mask: number[] = [];

    for (let i = 0; i < 4; i++) {
      const n = Math.min(cidrNum, 8);

      mask.push(256 - Math.pow(2, 8 - n));
      cidrNum -= n;
    }

    return mask.join('.');
  }

  public static maskToCidr(maskStr: string): number {
    return maskStr
      .split('.')
      .map(Number)
      .map(x => (x >>> 0).toString(2))
      .join('')
      .split('1').length - 1;
  }
}
