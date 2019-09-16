import { MacAddress } from "../link"
import { Ipv4Address, Ipv6Address } from "../network"
import { ipv4AddrFromStr, ipv4AddrToStr, ipv6AddrFromStr, ipv6AddrToStr, macAddrFromStr, macAddrToStr } from "./address"

describe("Utility tests", () => {
    const MAC_ADDRESSES: Array<[MacAddress, string]> = [
        [0x000000000000, "00:00:00:00:00:00"],
        [0x010101010101, "01:01:01:01:01:01"],
        [0x123456789abc, "12:34:56:78:9a:bc"],
        [0xffffffffffff, "ff:ff:ff:ff:ff:ff"]
    ]

    const IPV4_ADDRESSES: Array<[Ipv4Address, string]> = [
        [0x00000000, "0.0.0.0"],
        [0x01010101, "1.1.1.1"],
        [0xc0a80102, "192.168.1.2"],
        [0xffffffff, "255.255.255.255"]
    ]

    const IPV6_ADDRESSES: Array<[Ipv6Address, string]> = [
        [[0x00000000, 0x00000000, 0x00000000, 0x00000000], "0:0:0:0:0:0:0:0"],
        [[0x00010001, 0x00010001, 0x00010001, 0x00010001], "1:1:1:1:1:1:1:1"],
        [[0x12345678, 0x9abcdef1, 0x23456789, 0xabcdef12], "1234:5678:9abc:def1:2345:6789:abcd:ef12"],
        [[0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff], "ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff"]
    ]

    test("Check MAC addresses can be converted from strings", () => {
        for (const [addr, str] of MAC_ADDRESSES) {
            expect(macAddrFromStr(str)).toEqual(addr)
        }
    })

    test("Check MAC addresses can be converted to strings", () => {
        for (const [addr, str] of MAC_ADDRESSES) {
            expect(macAddrToStr(addr)).toEqual(str)
        }
    })

    test("Check IPv4 addresses can be converted from strings", () => {
        for (const [addr, str] of IPV4_ADDRESSES) {
            expect(ipv4AddrFromStr(str)).toEqual(addr)
        }
    })

    test("Check IPv4 addresses can be converted to strings", () => {
        for (const [addr, str] of IPV4_ADDRESSES) {
            expect(ipv4AddrToStr(addr)).toEqual(str)
        }
    })

    test("Check IPv6 addresses can be converted from strings", () => {
        for (const [addr, str] of IPV6_ADDRESSES) {
            expect(ipv6AddrFromStr(str)).toEqual(addr)
        }
    })

    test("Check IPv6 addresses can be converted to strings", () => {
        for (const [addr, str] of IPV6_ADDRESSES) {
            expect(ipv6AddrToStr(addr)).toEqual(str)
        }
    })
})
