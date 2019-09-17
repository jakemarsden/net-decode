import { ETHERTYPE } from "../link"
import { Ipv4Packet, Packet } from "./types"

export function decodePacket(ethertype: number, buf: Buffer): Packet | undefined {
    switch (ethertype) {
        case ETHERTYPE.IPv4:
            return decodeIpv4Packet(buf)
        default:
            return undefined
    }
}

export function decodeIpv4Packet(buf: Buffer): Ipv4Packet | undefined {
    const versionAndIhl = buf.readUInt8(0)
    const version = 0xf & versionAndIhl >> 4
    const ihl = 0xf & versionAndIhl
    if (version !== 4) {
        return undefined
    }

    const totalLength = buf.readUInt16BE(2)

    const flagsAndFragOffset = buf.readUInt16BE(6)
    const flags = 0x7 & flagsAndFragOffset >> 13
    const fragmentOffset = 0x1fff & flagsAndFragOffset

    const packet: Ipv4Packet = {
        version,
        ihl,
        typeOfService: buf.readUInt8(1),
        totalLength,
        identification: buf.readUInt16BE(4),
        flags,
        fragmentOffset,
        timeToLive: buf.readUInt8(8),
        protocol: buf.readUInt8(9),
        headerChecksum: buf.readUInt16BE(10),
        sourceAddress: buf.readUInt32BE(12),
        destinationAddress: buf.readUInt32BE(16),
        options: buf.subarray(20, ihl * 4),
        payload: buf.subarray(ihl * 4, totalLength)
    }
    return packet
}
