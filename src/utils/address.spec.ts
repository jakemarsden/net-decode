import { Ipv4AddressUtil, Ipv6AddressUtil, MacAddressUtil } from "./address"

describe("MAC address utility tests", () => {

    test("Check addresses can be parsed from strings", () => {
        expect(MacAddressUtil.valueOf("00:00:00:00:00:00")).toEqual(0x000000000000)
        expect(MacAddressUtil.valueOf("01:01:01:01:01:01")).toEqual(0x010101010101)
        expect(MacAddressUtil.valueOf("12:34:56:78:9a:bc")).toEqual(0x123456789abc)
        expect(MacAddressUtil.valueOf("12:34:56:78:9A:BC")).toEqual(0x123456789abc)
        expect(MacAddressUtil.valueOf("ff:ff:ff:ff:ff:ff")).toEqual(0xffffffffffff)

        expect(() => MacAddressUtil.valueOf("")).toThrow(TypeError)
        expect(() => MacAddressUtil.valueOf(":::::")).toThrow(TypeError)
        expect(() => MacAddressUtil.valueOf("01:01:01:01:01")).toThrow(TypeError)
        expect(() => MacAddressUtil.valueOf("01:01:01:1:01:01")).toThrow(TypeError)
        expect(() => MacAddressUtil.valueOf("01:0g:01:01:01:01")).toThrow(TypeError)
        expect(() => MacAddressUtil.valueOf("01:0g:01:01:001:01")).toThrow(TypeError)
        expect(() => MacAddressUtil.valueOf("01:01:01:01:01:01:01")).toThrow(TypeError)
    })

    test("Check addresses can be formatted as strings", () => {
        expect(MacAddressUtil.toString(0x000000000000)).toEqual("00:00:00:00:00:00")
        expect(MacAddressUtil.toString(0x010101010101)).toEqual("01:01:01:01:01:01")
        expect(MacAddressUtil.toString(0x123456789abc)).toEqual("12:34:56:78:9a:bc")
        expect(MacAddressUtil.toString(0xffffffffffff)).toEqual("ff:ff:ff:ff:ff:ff")

        expect(() => MacAddressUtil.toString(-1)).toThrow(TypeError)
        expect(() => MacAddressUtil.toString(0x1000000000000)).toThrow(TypeError)
    })
})

describe("IPv4 address utility tests", () => {

    test("Check addresses can be parsed from strings", () => {
        expect(Ipv4AddressUtil.valueOf("0.0.0.0")).toEqual(0x00000000)
        expect(Ipv4AddressUtil.valueOf("1.1.1.1")).toEqual(0x01010101)
        expect(Ipv4AddressUtil.valueOf("192.168.1.2")).toEqual(0xc0a80102)
        expect(Ipv4AddressUtil.valueOf("255.255.255.255")).toEqual(0xffffffff)

        expect(() => Ipv4AddressUtil.valueOf("")).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.valueOf("...")).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.valueOf("192.168.1")).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.valueOf("192.168.a.2")).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.valueOf("256.168.1.2")).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.valueOf("192.256.1.2")).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.valueOf("192.168.256.2")).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.valueOf("192.168.1.256")).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.valueOf("192.168.1.2.3")).toThrow(TypeError)
    })

    test("Check addresses can be formatted as strings", () => {
        expect(Ipv4AddressUtil.toString(0x00000000)).toEqual("0.0.0.0")
        expect(Ipv4AddressUtil.toString(0x01010101)).toEqual("1.1.1.1")
        expect(Ipv4AddressUtil.toString(0xc0a80102)).toEqual("192.168.1.2")
        expect(Ipv4AddressUtil.toString(0xffffffff)).toEqual("255.255.255.255")

        expect(() => Ipv4AddressUtil.toString(-1)).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.toString(0x100000000)).toThrow(TypeError)
    })

    test("Check network addresses can be determined", () => {
        expect(Ipv4AddressUtil.networkAddress(0x0a131707, 0x00000000)).toEqual(0x00000000) // 10.19.23.7/0
        expect(Ipv4AddressUtil.networkAddress(0x0a131707, 0xff000000)).toEqual(0x0a000000) // 10.19.23.7/8
        expect(Ipv4AddressUtil.networkAddress(0xac100c03, 0xffff0000)).toEqual(0xac100000) // 172.16.12.3/16
        expect(Ipv4AddressUtil.networkAddress(0xc0a80107, 0xffffff00)).toEqual(0xc0a80100) // 192.168.1.7/24
        expect(Ipv4AddressUtil.networkAddress(0xac100c06, 0xfffffffc)).toEqual(0xac100c04) // 172.16.12.6/30
        expect(Ipv4AddressUtil.networkAddress(0xc0a8345e, 0xffffffff)).toEqual(0xc0a8345e) // 172.16.52.94/32

        expect(() => Ipv4AddressUtil.networkAddress(-1, 1)).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.networkAddress(0x100000000, 1)).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.networkAddress(1, -1)).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.networkAddress(1, 0x100000000)).toThrow(TypeError)
    })

    test("Check host addresses can be determined", () => {
        expect(Ipv4AddressUtil.hostAddress(0x0a131707, 0x00000000)).toEqual(0x0a131707) // 10.19.23.7/0
        expect(Ipv4AddressUtil.hostAddress(0x0a131707, 0xff000000)).toEqual(0x00131707) // 10.19.23.7/8
        expect(Ipv4AddressUtil.hostAddress(0xac100c03, 0xffff0000)).toEqual(0x00000c03) // 172.16.12.3/16
        expect(Ipv4AddressUtil.hostAddress(0xc0a80107, 0xffffff00)).toEqual(0x00000007) // 192.168.1.7/24
        expect(Ipv4AddressUtil.hostAddress(0xac100c06, 0xfffffffc)).toEqual(0x00000002) // 172.16.12.6/30
        expect(Ipv4AddressUtil.hostAddress(0xc0a8345e, 0xffffffff)).toEqual(0x00000000) // 172.16.52.94/32

        expect(() => Ipv4AddressUtil.hostAddress(-1, 1)).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.hostAddress(0x100000000, 1)).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.hostAddress(1, -1)).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.hostAddress(1, 0x100000000)).toThrow(TypeError)
    })

    test("Check netmasks can be determined from prefix lengths", () => {
        expect(Ipv4AddressUtil.networkMask(0)).toEqual(0x00000000)
        expect(Ipv4AddressUtil.networkMask(1)).toEqual(0x80000000)
        expect(Ipv4AddressUtil.networkMask(2)).toEqual(0xc0000000)
        expect(Ipv4AddressUtil.networkMask(3)).toEqual(0xe0000000)
        expect(Ipv4AddressUtil.networkMask(4)).toEqual(0xf0000000)
        expect(Ipv4AddressUtil.networkMask(5)).toEqual(0xf8000000)
        expect(Ipv4AddressUtil.networkMask(6)).toEqual(0xfc000000)
        expect(Ipv4AddressUtil.networkMask(7)).toEqual(0xfe000000)
        expect(Ipv4AddressUtil.networkMask(8)).toEqual(0xff000000)
        expect(Ipv4AddressUtil.networkMask(9)).toEqual(0xff800000)
        expect(Ipv4AddressUtil.networkMask(10)).toEqual(0xffc00000)
        expect(Ipv4AddressUtil.networkMask(11)).toEqual(0xffe00000)
        expect(Ipv4AddressUtil.networkMask(12)).toEqual(0xfff00000)
        expect(Ipv4AddressUtil.networkMask(13)).toEqual(0xfff80000)
        expect(Ipv4AddressUtil.networkMask(14)).toEqual(0xfffc0000)
        expect(Ipv4AddressUtil.networkMask(15)).toEqual(0xfffe0000)
        expect(Ipv4AddressUtil.networkMask(16)).toEqual(0xffff0000)
        expect(Ipv4AddressUtil.networkMask(17)).toEqual(0xffff8000)
        expect(Ipv4AddressUtil.networkMask(18)).toEqual(0xffffc000)
        expect(Ipv4AddressUtil.networkMask(19)).toEqual(0xffffe000)
        expect(Ipv4AddressUtil.networkMask(20)).toEqual(0xfffff000)
        expect(Ipv4AddressUtil.networkMask(21)).toEqual(0xfffff800)
        expect(Ipv4AddressUtil.networkMask(22)).toEqual(0xfffffc00)
        expect(Ipv4AddressUtil.networkMask(23)).toEqual(0xfffffe00)
        expect(Ipv4AddressUtil.networkMask(24)).toEqual(0xffffff00)
        expect(Ipv4AddressUtil.networkMask(25)).toEqual(0xffffff80)
        expect(Ipv4AddressUtil.networkMask(26)).toEqual(0xffffffc0)
        expect(Ipv4AddressUtil.networkMask(27)).toEqual(0xffffffe0)
        expect(Ipv4AddressUtil.networkMask(28)).toEqual(0xfffffff0)
        expect(Ipv4AddressUtil.networkMask(29)).toEqual(0xfffffff8)
        expect(Ipv4AddressUtil.networkMask(30)).toEqual(0xfffffffc)
        expect(Ipv4AddressUtil.networkMask(31)).toEqual(0xfffffffe)
        expect(Ipv4AddressUtil.networkMask(32)).toEqual(0xffffffff)

        expect(() => Ipv4AddressUtil.networkMask(-1)).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.networkMask(33)).toThrow(TypeError)
    })

    test("Check prefix lengths can be determined from netmasks", () => {
        expect(Ipv4AddressUtil.prefixLength(0x00000000)).toEqual(0)
        expect(Ipv4AddressUtil.prefixLength(0x80000000)).toEqual(1)
        expect(Ipv4AddressUtil.prefixLength(0xc0000000)).toEqual(2)
        expect(Ipv4AddressUtil.prefixLength(0xe0000000)).toEqual(3)
        expect(Ipv4AddressUtil.prefixLength(0xf0000000)).toEqual(4)
        expect(Ipv4AddressUtil.prefixLength(0xf8000000)).toEqual(5)
        expect(Ipv4AddressUtil.prefixLength(0xfc000000)).toEqual(6)
        expect(Ipv4AddressUtil.prefixLength(0xfe000000)).toEqual(7)
        expect(Ipv4AddressUtil.prefixLength(0xff000000)).toEqual(8)
        expect(Ipv4AddressUtil.prefixLength(0xff800000)).toEqual(9)
        expect(Ipv4AddressUtil.prefixLength(0xffc00000)).toEqual(10)
        expect(Ipv4AddressUtil.prefixLength(0xffe00000)).toEqual(11)
        expect(Ipv4AddressUtil.prefixLength(0xfff00000)).toEqual(12)
        expect(Ipv4AddressUtil.prefixLength(0xfff80000)).toEqual(13)
        expect(Ipv4AddressUtil.prefixLength(0xfffc0000)).toEqual(14)
        expect(Ipv4AddressUtil.prefixLength(0xfffe0000)).toEqual(15)
        expect(Ipv4AddressUtil.prefixLength(0xffff0000)).toEqual(16)
        expect(Ipv4AddressUtil.prefixLength(0xffff8000)).toEqual(17)
        expect(Ipv4AddressUtil.prefixLength(0xffffc000)).toEqual(18)
        expect(Ipv4AddressUtil.prefixLength(0xffffe000)).toEqual(19)
        expect(Ipv4AddressUtil.prefixLength(0xfffff000)).toEqual(20)
        expect(Ipv4AddressUtil.prefixLength(0xfffff800)).toEqual(21)
        expect(Ipv4AddressUtil.prefixLength(0xfffffc00)).toEqual(22)
        expect(Ipv4AddressUtil.prefixLength(0xfffffe00)).toEqual(23)
        expect(Ipv4AddressUtil.prefixLength(0xffffff00)).toEqual(24)
        expect(Ipv4AddressUtil.prefixLength(0xffffff80)).toEqual(25)
        expect(Ipv4AddressUtil.prefixLength(0xffffffc0)).toEqual(26)
        expect(Ipv4AddressUtil.prefixLength(0xffffffe0)).toEqual(27)
        expect(Ipv4AddressUtil.prefixLength(0xfffffff0)).toEqual(28)
        expect(Ipv4AddressUtil.prefixLength(0xfffffff8)).toEqual(29)
        expect(Ipv4AddressUtil.prefixLength(0xfffffffc)).toEqual(30)
        expect(Ipv4AddressUtil.prefixLength(0xfffffffe)).toEqual(31)
        expect(Ipv4AddressUtil.prefixLength(0xffffffff)).toEqual(32)

        expect(() => Ipv4AddressUtil.prefixLength(-1)).toThrow(TypeError)
        expect(() => Ipv4AddressUtil.prefixLength(0x100000000)).toThrow(TypeError)
    })
})

describe("IPv6 address utility tests", () => {

    test("Check addresses can be parsed from strings", () => {
        expect(Ipv6AddressUtil.valueOf("0:0:0:0:0:0:0:0")).toEqual([0x00000000, 0x00000000, 0x00000000, 0x00000000])
        expect(Ipv6AddressUtil.valueOf("1:1:1:1:1:1:1:1")).toEqual([0x00010001, 0x00010001, 0x00010001, 0x00010001])
        expect(Ipv6AddressUtil.valueOf("1234:5678:9abc:def1:2345:6789:abcd:ef12"))
            .toEqual([0x12345678, 0x9abcdef1, 0x23456789, 0xabcdef12])
        expect(Ipv6AddressUtil.valueOf("1234:5678:9ABC:DEF1:2345:6789:ABCD:EF12"))
            .toEqual([0x12345678, 0x9abcdef1, 0x23456789, 0xabcdef12])
        expect(Ipv6AddressUtil.valueOf("ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff"))
            .toEqual([0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff])

        expect(() => Ipv6AddressUtil.valueOf("")).toThrow(TypeError)
        expect(() => Ipv6AddressUtil.valueOf(":::::::")).toThrow(TypeError)
        expect(() => Ipv6AddressUtil.valueOf("1:1:1:1:1:1:1")).toThrow(TypeError)
        expect(() => Ipv6AddressUtil.valueOf("1:1:g:1:1:1:1:1")).toThrow(TypeError)
        expect(() => Ipv6AddressUtil.valueOf("1:1:g:1:11111:1:1:1")).toThrow(TypeError)
        expect(() => Ipv6AddressUtil.valueOf("1:1:1:1:1:1:1:1:1")).toThrow(TypeError)
    })

    test("Check addresses can be formatted as strings", () => {
        expect(Ipv6AddressUtil.toString([0x00000000, 0x00000000, 0x00000000, 0x00000000])).toEqual("0:0:0:0:0:0:0:0")
        expect(Ipv6AddressUtil.toString([0x00010001, 0x00010001, 0x00010001, 0x00010001])).toEqual("1:1:1:1:1:1:1:1")
        expect(Ipv6AddressUtil.toString([0x12345678, 0x9abcdef1, 0x23456789, 0xabcdef12]))
            .toEqual("1234:5678:9abc:def1:2345:6789:abcd:ef12")
        expect(Ipv6AddressUtil.toString([0xffffffff, 0xffffffff, 0xffffffff, 0xffffffff]))
            .toEqual("ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff")

        expect(() => Ipv6AddressUtil.toString([-1, 1, 1, 1])).toThrow(TypeError)
        expect(() => Ipv6AddressUtil.toString([1, -1, 1, 1])).toThrow(TypeError)
        expect(() => Ipv6AddressUtil.toString([1, 1, -1, 1])).toThrow(TypeError)
        expect(() => Ipv6AddressUtil.toString([1, 1, 1, -1])).toThrow(TypeError)
        expect(() => Ipv6AddressUtil.toString([0x100000000, 1, 1, 1])).toThrow(TypeError)
        expect(() => Ipv6AddressUtil.toString([1, 0x100000000, 1, 1])).toThrow(TypeError)
        expect(() => Ipv6AddressUtil.toString([1, 1, 0x100000000, 1])).toThrow(TypeError)
        expect(() => Ipv6AddressUtil.toString([1, 1, 1, 0x100000000])).toThrow(TypeError)
    })
})
