import { MacAddress } from "../link"
import { Ipv4Address, Ipv6Address } from "../network"

export class MacAddressUtil {

    static valueOf(str: string): MacAddress {
        if (!str.match(/^[0-9a-f]{2}(:[0-9a-f]{2}){5}$/i)) {
            throw new TypeError(`Invalid MAC address: "${str}"`)
        }
        str = str.replace(/:/g, "")
        return parseInt(str, 16)
    }

    static toString(addr: MacAddress): string {
        if (addr < 0 || addr > 0xffffffffffff) {
            throw new TypeError(`Invalid MAC address: 0x${addr.toString(16)}`)
        }
        const str = addr
            .toString(16)
            .padStart(12, "0")
            .match(/[0-9a-f]{2}/g)!
            .join(":")
        return str
    }

    private constructor() {
    }
}

export class Ipv4AddressUtil {

    static valueOf(str: string): Ipv4Address {
        if (!str.match(/^(2[0-5]{2}|[01]?[0-9]{1,2})(\.(2[0-5]{2}|[01]?[0-9]{1,2})){3}$/i)) {
            throw new TypeError(`Invalid IPv4 address: "${str}"`)
        }
        const octets = str
            .split(/\./g)
            .map(octet => parseInt(octet, 10))
        const addr = octets[0] << 24 | octets[1] << 16 | octets[2] << 8 | octets[3]
        return addr >>> 0 // convert from int32 to to uint32
    }

    static toString(addr: Ipv4Address): string {
        this.validateAddr(addr)

        const str = [24, 16, 8, 0]
            .map(shift => 0xff & addr >> shift)
            .map(octet => octet.toString(10))
            .join(".")
        return str
    }

    static networkAddress(addr: Ipv4Address, mask: Ipv4Address): Ipv4Address {
        this.validateAddr(addr)
        this.validateMask(mask)

        return (addr & mask) >>> 0
    }

    static hostAddress(addr: Ipv4Address, mask: Ipv4Address): Ipv4Address {
        this.validateAddr(addr)
        this.validateMask(mask)

        return (addr & ~mask) >>> 0
    }

    static networkMask(prefixLength: number): Ipv4Address {
        if (prefixLength < 0 || prefixLength > 32) {
            throw new TypeError(`Invallid IPv4 prefix length: ${prefixLength}`)
        }
        if (prefixLength === 0) {
            return 0
        }
        let mask = 0x80000000
        for (let i = 0; i < prefixLength - 1; i++) {
            mask >>= 1
        }
        return mask >>> 0
    }

    static prefixLength(mask: Ipv4Address): number {
        if (mask < 0 || mask > 0xffffffff) {
            throw new TypeError(`Invalid IPv4 netmask: 0x${mask.toString(16)}`)
        }
        let prefixLength = 32
        while ((mask & 1) === 0 && prefixLength > 0) {
            mask >>>= 1
            prefixLength--
        }
        return prefixLength
    }

    private static validateAddr(addr: Ipv4Address): void {
        if (addr < 0 || addr > 0xffffffff) {
            throw new TypeError(`Invallid IPv4 address: ${addr.toString(16)}`)
        }
    }

    private static validateMask(mask: Ipv4Address): void {
        if (mask < 0 || mask > 0xffffffff) {
            throw new TypeError(`Invallid IPv4 netmask: ${mask.toString(16)}`)
        }
    }

    private constructor() {
    }
}

export class Ipv6AddressUtil {

    static valueOf(str: string): Ipv6Address {
        if (!str.match(/^[0-9a-f]{1,4}(:[0-9a-f]{1,4}){7}$/i)) {
            throw new TypeError(`Invalid IPv6 address: ${str}`)
        }
        const parts = str
            .split(/:/g)
            .map(hextet => parseInt(hextet, 16))
        const addr: Ipv6Address = [
            (parts[0] << 16 | parts[1]) >>> 0,
            (parts[2] << 16 | parts[3]) >>> 0,
            (parts[4] << 16 | parts[5]) >>> 0,
            (parts[6] << 16 | parts[7]) >>> 0
        ]
        return addr
    }

    static toString(addr: Ipv6Address): string {
        for (let i = 0; i < 4; i++) {
            if (addr[i] < 0 || addr[i] > 0xffffffff) {
                throw new TypeError(`Invalid IPv6 address: ${addr.map(it => `0x${it.toString(16)}`)}`)
            }
        }
        const str = [0, 1, 2, 3]
            .map(idx =>
                (0xffff & addr[idx] >> 16).toString(16) + ":" +
                (0xffff & addr[idx]).toString(16)
            )
            .join(":")
        return str
    }

    private constructor() {
    }
}
