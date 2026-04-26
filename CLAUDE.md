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

**Primary user:** Prototype author (self-learning) — exploring the FMCSA API, data structure, and carrier safety concepts firsthand.

## Full Spec

See `~/Desktop/Dev/EA/projects/prototypes/fmcsa-explorer/spec.md` for full product spec including MVP scope, design direction, and API details.

## External Research Context

The following files live outside this repo but are directly relevant to feature work on this app. Read them before implementing any feature that touches fleet verification, insurance underwriting, or GenLogs product concepts.

| File | When to read |
|------|-------------|
| `/Users/james/Desktop/Dev/EA/projects/job-search/research/genlogs/prd-fleet-verification.md` | Before implementing the Fleet Verification feature — defines the problem, UX spec (free/locked/paid tiers), discrepancy color coding, pricing model, and edge cases |
| `/Users/james/Desktop/Dev/EA/projects/job-search/research/genlogs/insurance-product-knowledge-base.md` | For broader insurance domain context — loss ratios, underwriting workflow, how FMCSA data is used in practice |

### Fleet Verification — PRD summary

The next major feature planned for this app is **Fleet Verification**: surfacing a GenLogs-observed truck count alongside the FMCSA self-reported fleet size, with a color-coded discrepancy indicator.

Key points from the PRD:
- **Problem:** Fleet size is self-reported to FMCSA and almost never independently verified. 42% of carriers in GenLogs' analysis operate more trucks than disclosed.
- **Free tier:** Shows FMCSA-reported fleet size + a blurred/locked GenLogs count with an upgrade prompt
- **Paid tier:** Shows GenLogs-observed distinct truck count, discrepancy amount, and estimated annual premium leakage
- **Color coding:** Green (within 5% of reported), Yellow (5–20% above), Red (>20% above), Gray (insufficient sightings)
- **"Insufficient sightings" state:** When GenLogs hasn't seen enough of a carrier's fleet to make a confident claim — not a fraud signal, just a coverage gap
- **Pricing:** ~$13/power unit/year across the insurer's active book (~$3M ARR from Progressive alone)
- **Primary customer:** Commercial trucking insurance underwriters, with Progressive as the anchor account

Full spec, rollout plan, success metrics, and edge cases are in the PRD linked above.

## Tech Stack

- Vite + React + Tailwind
- FMCSA SAFER Web API (free, register at ai.fmcsa.dot.gov)
- Vercel for deployment

## FMCSA API Notes

- Base URL: `https://mobile.fmcsa.dot.gov/qc/services/`
- Key endpoints: `/carriers/{dotNumber}`, `/carriers/{dotNumber}/basics`
- Has CORS restrictions — may need a Vercel serverless function proxy
- Free API key from ai.fmcsa.dot.gov

## UX Requirements

- **Top-10 carrier sidebar:** Fixed left sidebar listing the 10 largest US carriers (name + USDOT #). Clicking a row auto-fetches and displays that carrier's data. Serves double duty: reference info + instant sample data.
- **Inline definitions:** Every field label (BASIC categories, OOS rate, fleet size, safety rating, etc.) must show a `ⓘ` tooltip icon. Hovering reveals a plain-English definition. The app is a learning tool — no assumed domain knowledge.
- **Pre-populated search:** USDOT input defaults to a placeholder from the carrier list so the app is immediately usable without knowing any carrier numbers.

## Style

Clean, professional, data-dense. Bloomberg terminal card aesthetic — not a consumer app. Color-code BASIC scores by risk level (green/yellow/red). Clear empty states for carriers with no inspection history.
