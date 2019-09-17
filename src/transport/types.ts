export type Segment = TcpSegment | UdpSegment

/**
 * @see https://tools.ietf.org/html/rfc793#section-3.1
 */
export interface TcpSegment {
    /**
     * 16 bits
     */
    sourcePort: number
    /**
     * 16 bits
     */
    destinationPort: number
    /**
     * 32 bits. The sequence number of the first data octet in this segment (except when SYN is present). If SYN is
     * present the sequence number is the initial sequence number (ISN) and the first data octet is ISN+1
     */
    sequenceNumber: number
    /**
     * 32 bits. If the ACK control bit is set this field contains the value of the next sequence number the sender of
     * the segment is expecting to receive. Once a connection is established this is always sent
     */
    acknowledgmentNumber: number
    /**
     * 4 bits. The number of 32 bit words in the TCP Header. This indicates where the data begins. The TCP header (even
     * one including options) is an integral number of 32 bits long
     */
    dataOffset: number
    /**
     * 6 bits. Control Bits
     * - URG: Urgent Pointer field significant
     * - ACK: Acknowledgment field significant
     * - PSH: Push Function
     * - RST: Reset the connection
     * - SYN: Synchronize sequence numbers
     * - FIN: No more data from sender
     */
    control: number
    /**
     * 16 bits. The number of data octets beginning with the one indicated in the acknowledgment field which the sender
     * of this segment is willing to accept
     */
    window: number
    /**
     * The checksum field is the 16 bit one's complement of the one's complement sum of all 16 bit words in the header
     * and text
     */
    checksum: number
    /**
     * 16 bits. This field communicates the current value of the urgent pointer as a positive offset from the sequence
     * number in this segment. The urgent pointer points to the sequence number of the octet following the urgent data.
     * This field is only be interpreted in segments with the URG control bit set
     */
    urgentPointer: number
    /**
     * Options may occupy space at the end of the TCP header and are a multiple of 8 bits in length
     */
    options: Buffer
    /**
     * Variable length
     */
    payload: Buffer
}

/**
 * @see https://tools.ietf.org/html/rfc768
 */
export interface UdpSegment {
    /**
     * 16 bits
     */
    sourcePort: number
    /**
     * 16 bits
     */
    destinationPort: number
    /**
     * 16 bits. Length is the length in octets of this user datagram including this header and the data. (This means the
     * minimum value of the length is eight)
     */
    length: number
    /**
     * 16 bits. Checksum is the 16-bit one's complement of the one's complement sum of a pseudo header of information
     * from the IP header, the UDP header, and the data, padded with zero octets at the end (if necessary) to make a
     * multiple of two octets
     */
    checksum: number
    /**
     * Variable length
     */
    payload: Buffer
}
