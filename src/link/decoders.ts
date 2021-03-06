import { ETHERTYPE } from "./constants"
import { Dot1qTag, EthernetIIFrame, Frame, Ieee802Dot3Frame } from "./types"

export function decodeFrame(buf: Buffer): Frame | undefined {
    const typeOrLength = buf.readUInt16BE(12)

    if (typeOrLength >= 0x600) {
        // Ethernet II frame
        return decodeEthernetIIFrame(typeOrLength, buf)
    }
    if (typeOrLength <= 1500) {
        // IEEE 802.3 frame
        return decode802Dot3Frame(typeOrLength, buf)
    }
    return undefined
}

function decodeEthernetIIFrame(ethertype: number, buf: Buffer): EthernetIIFrame | undefined {
    const dot1qTags: Dot1qTag[] = []
    while (ethertype === ETHERTYPE.Dot1q || ethertype === ETHERTYPE.QinQ) {
        const tci = buf.readUInt16BE(12 + 4 * dot1qTags.length + 2)
        const tag: Dot1qTag = {
            tpid: ethertype,
            pcp: 0x7 & tci >> 13,
            dei: 0x1 & tci >> 12,
            vid: 0xfff & tci
        }
        dot1qTags.push(tag)
        ethertype = buf.readUInt16BE(12 + 4 * dot1qTags.length)
    }

    const frame: EthernetIIFrame = {
        destinationAddress: buf.readUIntBE(0, 6),
        sourceAddress: buf.readUIntBE(6, 6),
        dot1qTags,
        ethertype,
        payload: buf.subarray(12 + 4 * dot1qTags.length + 2, buf.byteLength)
    }
    return frame
}

function decode802Dot3Frame(length: number, buf: Buffer): Ieee802Dot3Frame | undefined {
    // TODO: decode the IEEE 802.2 LLC header which follows
    const frame: Ieee802Dot3Frame = {
        destinationAddress: buf.readUIntBE(0, 6),
        sourceAddress: buf.readUIntBE(6, 6),
        length,
        payload: buf.subarray(14, 14 + length)
    }
    return frame
}
