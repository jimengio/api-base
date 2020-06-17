export enum EBackendErrorMessageId {
  /** {0} must contain at least one of the following characters '{1}' */
  containsany = "containsany",
  /** {0} cannot contain the text '{1}' */
  excludes = "excludes",
  /** {0} is a invalid field */
  username = "username",
  /** {0} must be greater than the current Date & Time */
  gt_datetime = "gt.datetime",
  /** {0} must be a valid numeric value */
  numeric = "numeric",
  /** {0} must be a valid HSL color */
  hsl = "hsl",
  /** {0} must be less than the current Date & Time */
  lt_datetime = "lt.datetime",
  /** {0} must be greater than {1} */
  gtcsfield = "gtcsfield",
  /** {0} must be a valid RGBA color */
  rgba = "rgba",
  /** {0} must contain multibyte characters */
  multibyte = "multibyte",
  /** {0} must contain at least {1} items */
  min_itemsItem_other = "min.items-item.other",
  /** {0} must contain at least {1} item */
  min_itemsItem_one = "min.items-item.one",
  /** {0} must be a maximum of {1} in length character */
  max_stringCharacter_one = "max.string-character.one",
  /** {0} must be a maximum of {1} in length characters */
  max_stringCharacter_other = "max.string-character.other",
  /** {0} must contain less than {1} item */
  lt_itemsItem_one = "lt.items-item.one",
  /** {0} must contain less than {1} items */
  lt_itemsItem_other = "lt.items-item.other",
  /** {0} must contain a valid CIDR notation for an IPv6 address */
  cidrv6 = "cidrv6",
  /** {0} must be a valid IPv6 TCP address */
  tcp6_addr = "tcp6_addr",
  /** {0} must be less than {1} in length characters */
  lt_stringCharacter_other = "lt.string-character.other",
  /** {0} must be less than {1} in length character */
  lt_stringCharacter_one = "lt.string-character.one",
  /** {0} must be less than or equal to {1} */
  ltecsfield = "ltecsfield",
  /** {0} must be a valid UUID */
  uuid = "uuid",
  /** {0} must be {1} or greater */
  min_number = "min.number",
  /** {0} must be greater than {1} in length character */
  gt_stringCharacter_one = "gt.string-character.one",
  /** {0} must be greater than {1} in length characters */
  gt_stringCharacter_other = "gt.string-character.other",
  /** {0} must be a valid URL */
  url = "url",
  /** {0} must be a valid HSLA color */
  hsla = "hsla",
  /** {0} must be a valid IPv4 address */
  ipv4 = "ipv4",
  /** {0} must be a resolvable UNIX address */
  unix_addr = "unix_addr",
  /** {0} is not equal to {1} */
  eq = "eq",
  /** {0} cannot be equal to {1} */
  necsfield = "necsfield",
  /** {0} must be greater than or equal to {1} */
  gtefield = "gtefield",
  /** {0} must be greater than or equal to {1} */
  gtecsfield = "gtecsfield",
  /** {0} must be a valid HEX color */
  hexcolor = "hexcolor",
  /** {0} must be a valid URI */
  uri = "uri",
  /** {0} must be a valid IPv6 address */
  ipv6 = "ipv6",
  /** {0} must be a valid TCP address */
  tcp_addr = "tcp_addr",
  /** {0} must be {1} or less */
  lte_number = "lte.number",
  /** {0} must contain more than {1} item */
  gt_itemsItem_one = "gt.items-item.one",
  /** {0} must contain more than {1} items */
  gt_itemsItem_other = "gt.items-item.other",
  /** {0} must be equal to {1} */
  eqcsfield = "eqcsfield",
  /** {0} must contain a valid MAC address */
  mac = "mac",
  /** {0} must be greater than {1} */
  gt_number = "gt.number",
  /** {0} must be less than {1} */
  ltcsfield = "ltcsfield",
  /** {0} must be a valid version 5 UUID */
  uuid5 = "uuid5",
  /** {0} must be a valid ISBN-10 number */
  isbn10 = "isbn10",
  /** {0} must be a valid IP address */
  ip = "ip",
  /** {0} must be a resolvable IP address */
  ip_addr = "ip_addr",
  /** {0} must contain at maximum {1} items */
  lte_itemsItem_other = "lte.items-item.other",
  /** {0} must contain at maximum {1} item */
  lte_itemsItem_one = "lte.items-item.one",
  /** {0} must be less than {1} */
  ltfield = "ltfield",
  /** {0} can only contain alphabetic characters */
  alpha = "alpha",
  /** {0} must be a valid UDP address */
  udp_addr = "udp_addr",
  /** {0} should not be equal to {1} */
  ne = "ne",
  /** {0} must be less than or equal to {1} */
  ltefield = "ltefield",
  /** {0} cannot contain the following '{1}' */
  excludesrune = "excludesrune",
  /** {0} must be a valid RGB color */
  rgb = "rgb",
  /** {0} must be a valid email address */
  email = "email",
  /** {0} must contain only ascii characters */
  ascii = "ascii",
  /** {0} must be at least {1} in length characters */
  min_stringCharacter_other = "min.string-character.other",
  /** {0} must be at least {1} in length character */
  min_stringCharacter_one = "min.string-character.one",
  /** {0} must be at maximum {1} in length character */
  lte_stringCharacter_one = "lte.string-character.one",
  /** {0} must be at maximum {1} in length characters */
  lte_stringCharacter_other = "lte.string-character.other",
  /** {0} must be a valid hexadecimal */
  hexadecimal = "hexadecimal",
  /** {0} must be a valid version 4 UUID */
  uuid4 = "uuid4",
  /** {0} must contain a valid CIDR notation for an IPv4 address */
  cidrv4 = "cidrv4",
  /** {0} must be {1} or greater */
  gte_number = "gte.number",
  /** {0} must be equal to {1} */
  eqfield = "eqfield",
  /** {0} must be a valid ISBN-13 number */
  isbn13 = "isbn13",
  /** {0} cannot contain any of the following characters '{1}' */
  excludesall = "excludesall",
  /** {0} must be a valid version 3 UUID */
  uuid3 = "uuid3",
  /** {0} must be a valid SSN number */
  ssn = "ssn",
  /** {0} must contain a valid CIDR notation */
  cidr = "cidr",
  /** {0} must be a valid color */
  iscolor = "iscolor",
  /** {0} must be {1} in length characters */
  len_stringCharacter_other = "len.string-character.other",
  /** {0} must be {1} in length character */
  len_stringCharacter_one = "len.string-character.one",
  /** {0} cannot be equal to {1} */
  nefield = "nefield",
  /** {0} can only contain alphanumeric characters */
  alphanum = "alphanum",
  /** {0} must be a valid IPv4 TCP address */
  tcp4_addr = "tcp4_addr",
  /** {0} must be a resolvable IPv6 address */
  ip6_addr = "ip6_addr",
  /** {0} must be equal to {1} */
  len_number = "len.number",
  /** {0} must be less than {1} */
  lt_number = "lt.number",
  /** {0} must contain a valid longitude coordinates */
  longitude = "longitude",
  /** {0} must contain a valid Data URI */
  datauri = "datauri",
  /** {0} must contain {1} items */
  len_itemsItem_other = "len.items-item.other",
  /** {0} must contain {1} item */
  len_itemsItem_one = "len.items-item.one",
  /** {0} must contain at maximum {1} item */
  max_itemsItem_one = "max.items-item.one",
  /** {0} must contain at maximum {1} items */
  max_itemsItem_other = "max.items-item.other",
  /** {0} must contain the text '{1}' */
  contains = "contains",
  /** {0} must contain valid latitude coordinates */
  latitude = "latitude",
  /** {0} is a required field */
  required = "required",
  /** {0} must be at least {1} in length characters */
  gte_stringCharacter_other = "gte.string-character.other",
  /** {0} must be at least {1} in length character */
  gte_stringCharacter_one = "gte.string-character.one",
  /** {0} must contain only printable ascii characters */
  printascii = "printascii",
  /** {0} must be greater than or equal to the current Date & Time */
  gte_datetime = "gte.datetime",
  /** {0} must be greater than {1} */
  gtfield = "gtfield",
  /** {0} must be a valid number */
  number = "number",
  /** {0} must be a valid ISBN number */
  isbn = "isbn",
  /** {0} must be a valid IPv4 UDP address */
  udp4_addr = "udp4_addr",
  /** {0} must be {1} or less */
  max_number = "max.number",
  /** {0} must be less than or equal to the current Date & Time */
  lte_datetime = "lte.datetime",
  /** {0} must contain at least {1} item */
  gte_itemsItem_one = "gte.items-item.one",
  /** {0} must contain at least {1} items */
  gte_itemsItem_other = "gte.items-item.other",
  /** {0} must be a valid IPv6 UDP address */
  udp6_addr = "udp6_addr",
  /** {0} must be a resolvable IPv4 address */
  ip4_addr = "ip4_addr",
}
