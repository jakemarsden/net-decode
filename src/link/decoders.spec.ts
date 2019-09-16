import { decodeFrame } from "./decoders"
import { EthernetIIFrame } from "./types"

describe("Link-layer decoder tests", () => {
    const rawFrame = "AB4GNi7YACQd28wtCABFAAAoQjhAAIAGAAAKCh4BCgoUHsZXAFCcY/pQA15QZFAQAPxGTQAA"
    const rawPayloadLength = 40

    const decodedFrame: EthernetIIFrame = {
        destinationAddress: 0x001e06362ed8,
        sourceAddress: 0x00241ddbcc2d,
        dot1qTags: [],
        ethertype: 0x0800,
        payload: Buffer.from("RQAAKEI4QACABgAACgoeAQoKFB7GVwBQnGP6UANeUGRQEAD8Rk0AAA==", "base64")
    }

    test("Check Ethernet II frames can be decoded", () => {
        const frameBuf = Buffer.from(rawFrame, "base64")
        const frame = decodeFrame(frameBuf)
        expect(frame).toEqual(decodedFrame)
        expect(frame!.payload.byteLength).toBe(rawPayloadLength)
    })
})
