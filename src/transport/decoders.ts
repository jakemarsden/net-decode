import { PROTOCOL } from "../network"
import { Segment, TcpSegment, UdpSegment } from "./types"

export function decodeSegment(protocol: number, buf: Buffer): Segment | undefined {
    switch (protocol) {
        case PROTOCOL.TCP:
            return decodeTcpSegment(buf)
        case PROTOCOL.UDP:
            return decodeUdpSegment(buf)
        default:
            return undefined
    }
}

export function decodeTcpSegment(buf: Buffer): TcpSegment | undefined {
    const word4 = buf.readUInt32BE(12)
    const dataOffset = 0xf & word4 >> 28
    const control = 0x3f & word4 >> 16
    const window = 0xffff & word4

    const segment: TcpSegment = {
        sourcePort: buf.readUInt16BE(0),
        destinationPort: buf.readUInt16BE(2),
        sequenceNumber: buf.readUInt32BE(4),
        acknowledgmentNumber: buf.readUInt32BE(8),
        dataOffset,
        control,
        window,
        checksum: buf.readUInt16BE(16),
        urgentPointer: buf.readUInt16BE(18),
        options: buf.subarray(20, dataOffset * 4),
        payload: buf.subarray(dataOffset * 4)
    }
    return segment
}

export function decodeUdpSegment(buf: Buffer): UdpSegment | undefined {
    const length = buf.readUInt16BE(4)

    const segment: UdpSegment = {
        sourcePort: buf.readUInt16BE(0),
        destinationPort: buf.readUInt16BE(2),
        length,
        checksum: buf.readUInt16BE(6),
        payload: buf.subarray(8, length)
    }
    return segment
}
