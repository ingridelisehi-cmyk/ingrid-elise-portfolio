# Ingrid Elise - Portfolio + Sanity

Nettsiden er koblet til Sanity og klar for innholdsredigering.

## Rask start

1. Start nettsiden:

```bash
npm run dev
```

2. Start Sanity Studio:

```bash
npm run studio
```

3. Aapne Studio i nettleseren:

`http://localhost:3000/studio`

## Miljovariabler

Legg disse i `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-02-19
```

## Hva som er koblet

- Forsiden (`app/page.tsx`) henter:
	- `siteSettings` (navn, tagline, sted)
	- `project` med `featured == true` (utvalgte prosjekter)
- Hvis Sanity er tom, brukes fallback-innhold automatisk.

## Sanity-innholdstyper

- `siteSettings`
- `project`
- `cvEntry`

## Neste steg

1. Opprett ett dokument av typen `siteSettings` i Studio.
2. Opprett prosjekter av typen `project` og huk av `Vis på forsiden`.
3. (Valgfritt) Legg inn `cvEntry` og koble CV-siden til Sanity ogsaa.
