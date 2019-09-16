/**
 * @see https://www.iana.org/assignments/protocol-numbers/protocol-numbers.xhtml
 */
export const PROTOCOL = {
    /**
     * Internet Control Message Protocol (ICMP)
     * @see http://www.iana.org/go/rfc792
     */
    ICMP: 1 as 1,
    /**
     * Internet Group Management Protocol (IGMP)
     * @see http://www.iana.org/go/rfc1112
     */
    IGMP: 2 as 2,
    /**
     * IPv4 encapsulation
     * @see http://www.iana.org/go/rfc2003
     */
    IPv4: 4 as 4,
    /**
     * IPv6 encapsulation
     * @see http://www.iana.org/go/rfc2473
     */
    IPv6: 41 as 41,
    /**
     * Transmission Control Protocol (TCP)
     * @see http://www.iana.org/go/rfc793
     */
    TCP: 6 as 6,
    /**
     * User Datagram Protocol (UDP)
     * @see http://www.iana.org/go/rfc768
     */
    UDP: 17 as 17
}
