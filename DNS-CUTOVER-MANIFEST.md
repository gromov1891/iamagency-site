# DNS cutover manifest for iamagency.su

Snapshot date: 2026-07-14 (Europe/Moscow)

## Current authoritative DNS

| Name | Type | Value |
|---|---|---|
| `iamagency.su` | NS | `ns1.tildadns.com` |
| `iamagency.su` | NS | `ns2.tildadns.com` |
| `iamagency.su` | A | `176.57.65.208` |
| `www.iamagency.su` | CNAME | `iamagency.su` |

The current A record belongs to the old Tilda site. Do not copy it as the final Timeweb application record.

## Records that must survive the move

| Name | Type | Value |
|---|---|---|
| `iamagency.su` | TXT | `yandex-verification: 31fa21f341a0c0e2` |
| `iamagency.su` | TXT | `google-site-verification=97u9hZnl24cruPGP5DolVy2qZF-br4hC5U7U60krvmY` |

No MX record was published at snapshot time. Before switching nameservers, check the Tilda zone once more in case mail records are added later.

## Records supplied at cutover

Timeweb App Platform will provide the final apex and `www` values after the custom domains are connected. Add those values to the new Timeweb zone together with both verification TXT records above. Wait for SSL issuance before changing the authoritative nameservers.

## Verification commands

```powershell
Resolve-DnsName iamagency.su -Type A
Resolve-DnsName iamagency.su -Type TXT
Resolve-DnsName iamagency.su -Type NS
Resolve-DnsName www.iamagency.su -Type CNAME
```
