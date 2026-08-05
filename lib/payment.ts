/**
 * Payment configuration.
 *
 * Donations are handed off to Paybee's hosted, PCI-compliant page — no card
 * details ever touch this application. Set `donationUrl` to your donation
 * campaign link (Campaigns → your campaign → Links & Share → copy the campaign
 * link / "donate" URL from your Paybee dashboard).
 */

export const payments = {
  /** PayBee donation campaign URL donors are redirected to at checkout. */
  donationUrl: "",
} as const;