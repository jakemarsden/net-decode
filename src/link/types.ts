import { ETHERTYPE } from "./constants"

/**
 * 6 octets
 */
export type MacAddress = number

export type Frame = EthernetIIFrame | Ieee802Dot3Frame

/**
 * @see https://en.wikipedia.org/wiki/Ethernet_frame#Ethernet_II
 */
export interface EthernetIIFrame {
    /**
     * 6 octets
     */
    destinationAddress: MacAddress
    /**
     * 6 octets
     */
    sourceAddress: MacAddress
    /**
     * 4 octets each
     */
    dot1qTags: Dot1qTag[]
    /**
     * 2 octets, must be >=0x600
     * @see https://www.iana.org/assignments/ieee-802-numbers/ieee-802-numbers.xhtml
     */
    ethertype: number
    /**
     * 46-1500 octets, minus 4 octets for each Dot1q tag
     */
    payload: Buffer
}

/**
 * @see https://en.wikipedia.org/wiki/IEEE_802.1Q#Frame_format
 * @see https://en.wikipedia.org/wiki/IEEE_802.1Q#Double_tagging
 */
export interface Dot1qTag {
    /**
     * Tag Protocol Identifier (TPID), 2 octets
     */
    tpid: typeof ETHERTYPE.Dot1q | typeof ETHERTYPE.QinQ
    /**
     * Priority Code Point (PCP), 3 bits
     */
    pcp: number
    /**
     * Drop Eligable Indicator (DEI), aka. Canonical Format Indicator (CFI), 1 bit
     */
    dei: number
    /**
     * VLAN Identifier (VID), 12 bits
     */
    vid: number
}

/**
 * @see https://en.wikipedia.org/wiki/IEEE_802.3
 */
export interface Ieee802Dot3Frame {
    /**
     * 6 octets
     */
    destinationAddress: MacAddress
    /**
     * 6 octets
     */
    sourceAddress: MacAddress
    /**
     * 2 octets, must be <=1500
     */
    length: number
    /**
     * 46-1500 octets
     */
    payload: Buffer
}
