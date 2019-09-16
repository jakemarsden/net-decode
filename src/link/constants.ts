/**
 * @see https://www.iana.org/assignments/ieee-802-numbers/ieee-802-numbers.xhtml
 */
export const ETHERTYPE = {
    /**
     * Address Resolution Protocol (ARP)
     * @see http://www.iana.org/go/rfc7042
     */
    ARP: 0x0806 as 0x0806,
    /**
     * Customer VLAN Tag Type (C-Tag, formerly called the Q-Tag) (initially Wellfleet)
     * @see http://www.iana.org/go/rfc7042
     */
    Dot1q: 0x8100 as 0x8100,
    /**
     * Internet Protocol version 4 (IPv4)
     * @see http://www.iana.org/go/rfc7042
     */
    IPv4: 0x0800 as 0x0800,
    /**
     * Internet Protocol version 6 (IPv6)
     * @see http://www.iana.org/go/rfc7042
     */
    IPv6: 0x86dd as 0x86dd,
    /**
     * IEEE Std 802.1Q - Service VLAN tag identifier (S-Tag)
     */
    QinQ: 0x88a8 as 0x88a8,
    /**
     * Reverse Address Resolution Protocol (RARP)
     * @see http://www.iana.org/go/rfc903
     */
    RARP: 0x8035 as 0x8035
}
