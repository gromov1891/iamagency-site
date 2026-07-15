# DNS cutover manifest for iamagency.su

Snapshot date: 2026-07-15 (Europe/Moscow)

## Previous authoritative DNS (rollback)

| Name | Type | Value |
|---|---|---|
| `iamagency.su` | NS | `ns1.tildadns.com` |
| `iamagency.su` | NS | `ns2.tildadns.com` |
| `iamagency.su` | A | `176.57.65.208` |
| `www.iamagency.su` | CNAME | `iamagency.su` |

The A record above belongs to the old Tilda site. These values are retained only as the rollback reference.

## Records that must survive the move

| Name | Type | Value |
|---|---|---|
| `iamagency.su` | TXT | `yandex-verification: 31fa21f341a0c0e2` |
| `iamagency.su` | TXT | `google-site-verification=97u9hZnl24cruPGP5DolVy2qZF-br4hC5U7U60krvmY` |

No MX record was published at snapshot time. Before switching nameservers, check the Tilda zone once more in case mail records are added later.

## Timeweb zone prepared at cutover

| Name | Type | Value | TTL |
|---|---|---|---|
| `iamagency.su` | A | `186.246.6.14` (`iamagency-prod`) | 600 |
| `www.iamagency.su` | CNAME | `iamagency.su` | 600 |
| `iamagency.su` | TXT | `yandex-verification: 31fa21f341a0c0e2` | 600 |
| `iamagency.su` | TXT | `google-site-verification=97u9hZnl24cruPGP5DolVy2qZF-br4hC5U7U60krvmY` | 600 |

Timeweb also created its default MX, SPF and DMARC records. The Tilda registrar accepted the following authoritative nameservers on 15 July 2026:

- `ns1.timeweb.ru`
- `ns2.timeweb.ru`
- `ns3.timeweb.org`
- `ns4.timeweb.org`

Propagation can take up to 24 hours. The previous NS cache TTL observed immediately after the change was 7200 seconds.

## Verification commands

```powershell
Resolve-DnsName iamagency.su -Type A
Resolve-DnsName iamagency.su -Type TXT
Resolve-DnsName iamagency.su -Type NS
Resolve-DnsName www.iamagency.su -Type CNAME
```
