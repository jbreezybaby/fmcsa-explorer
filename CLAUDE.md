# FMCSA Explorer

A rapid prototype — carrier safety lookup tool using FMCSA public data.

## What This Is

A single-page React app that lets users look up any commercial trucking carrier by USDOT number and see their safety profile: BASIC scores, inspection history, crash data, operating status.

## Domain Context

**Why this exists:** Commercial trucking insurance underwriters rely on FMCSA BASIC scores as their primary third-party safety signal. ~50–60% of active carriers have no scores at all (too few inspections to generate a measure). The FMCSA API is free and public but has no good consumer-grade UI. This prototype makes that data accessible.

**Key domain concepts:**

| Term | Meaning |
|------|---------|
| USDOT number | DOT-assigned carrier identifier — legally required on every commercial truck cab |
| BASIC scores | 7 safety categories scored as percentile rankings vs. peers (Unsafe Driving, Crash Indicator, HOS Compliance, Vehicle Maintenance, Controlled Substances, Driver Fitness, Hazardous Materials) |
| OOS rate | Out-of-Service rate — % of inspections where violations were severe enough to pull the vehicle/driver off the road |
| Loss ratio | Claims paid ÷ Premiums — underwriters target <60% |
| Chameleon carrier | A carrier that shuts down and reopens under a new USDOT number to escape a bad safety record |

**Primary users:** Insurance underwriters, freight brokers, shippers, logistics professionals.

## Full Spec

See `~/Desktop/Dev/EA/projects/prototypes/fmcsa-explorer/spec.md` for full product spec including MVP scope, design direction, and API details.

## Tech Stack

- Vite + React + Tailwind
- FMCSA SAFER Web API (free, register at ai.fmcsa.dot.gov)
- Vercel for deployment

## FMCSA API Notes

- Base URL: `https://mobile.fmcsa.dot.gov/qc/services/`
- Key endpoints: `/carriers/{dotNumber}`, `/carriers/{dotNumber}/basics`
- Has CORS restrictions — may need a Vercel serverless function proxy
- Free API key from ai.fmcsa.dot.gov

## Style

Clean, professional, data-dense. Bloomberg terminal card aesthetic — not a consumer app. Color-code BASIC scores by risk level (green/yellow/red). Clear empty states for carriers with no inspection history.
