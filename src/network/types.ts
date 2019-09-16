/**
 * 4 octets
 */
export type Ipv4Address = number

/**
 * @see https://tools.ietf.org/html/rfc791#section-3.1
 */
export interface Ipv4Packet {
    /**
     * 4 bits
     */
    version: 4
    /**
     * 4 bits. Internet Header Length (IHL) is the length of the internet header in 32 bit words, and thus points to the
     * beginning of the data. Note that the minimum value for a correct header is 5
     */
    ihl: number
    /**
     * 8 bits. The Type of Service provides an indication of the abstract parameters of the quality of service desired
     * - Bits 0-2: Precedence
     * - Bit 3: 0 = Normal Delay, 1 = Low Delay.
     * - Bit 4: 0 = Normal Throughput, 1 = High Throughput
     * - Bit 5: 0 = Normal Relibility, 1 = High Relibility
     * - Bits 6-7: Reserved for Future Use
     */
    typeOfService: number
    /**
     * 16 bits. Total Length is the length of the datagram, measured in octets, including internet header and data
     */
    totalLength: number
    /**
     * 16 bits. An identifying value assigned by the sender to aid in assembling the fragments of a datagram
     */
    identification: number
    /**
     * 3 bits. Various Control Flags
     * - Bit 0: reserved, must be zero
     * - Bit 1: (DF) 0 = May Fragment, 1 = Don't Fragment
     * - Bit 2: (MF) 0 = Last Fragment, 1 = More Fragments
     */
    flags: number
    /**
     * 13 bits. This field indicates where in the datagram this fragment belongs. The fragment offset is measured in
     * units of 8 octets (64 bits). The first fragment has offset zero
     */
    fragmentOffset: number
    /**
     * 8 bits
     */
    timeToLive: number
    /**
     * 8 bits. This field indicates the next level protocol used in the data portion of the internet datagram
     * @see https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml
     */
    protocol: number
    /**
     * 16 bits. A checksum on the header only
     */
    headerChecksum: number
    /**
     * 32 bits
     */
    sourceAddress: Ipv4Address
    /**
     * 32 bits
     */
    destinationAddress: Ipv4Address
    /**
     * Variable length
     */
    options: Buffer

    payload: Buffer
}
