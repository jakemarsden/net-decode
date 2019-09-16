import { MacAddress } from "../link"
import { Ipv4Address, Ipv6Address } from "../network"

export function macAddrFromStr(str: string): MacAddress {
    str = str.replace(/:/g, "")
    return parseInt(str, 16)
}

export function macAddrToStr(addr: MacAddress): string {
    const str = addr
        .toString(16)
        .padStart(12, "0")
        .match(/[0-9a-f]{2}/g)!
        .join(":")
    return str
}

export function ipv4AddrFromStr(str: string): Ipv4Address {
    const octets = str
        .split(/\./g)
        .map(octet => parseInt(octet, 10))
    const addr = octets[0] << 24 | octets[1] << 16 | octets[2] << 8 | octets[3]
    return addr >>> 0 // convert from int32 to to uint32
}

export function ipv4AddrToStr(addr: Ipv4Address): string {
    const str = [24, 16, 8, 0]
        .map(shift => 0xff & addr >> shift)
        .map(octet => octet.toString(10))
        .join(".")
    return str
}

export function ipv6AddrFromStr(str: string): Ipv6Address {
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

export function ipv6AddrToStr(addr: Ipv6Address): string {
    const str = [0, 1, 2, 3]
        .map(idx =>
            (0xffff & addr[idx] >> 16).toString(16) + ":" +
            (0xffff & addr[idx]).toString(16)
        )
        .join(":")
    return str
}
