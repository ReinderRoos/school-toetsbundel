# Welke skills patchen

Type: grilling  
Status: resolved  
Blocked by: 01

## Question

Gegeven de diagnose én de voorkeur “`teach` spaarzaam / niet structureel wijzigen”: waar landen de nieuwe leskwaliteitsregels?

Opties om te wegen: (A) alleen `.cursor/skills/maaktoets`; (B) minimale 1-regel pointer in `teach` + details in `maaktoets`; (C) **integratie** — één School-skill die teach-pipeline + maaktoets-routing/toetsdiepte samenvoegt voor lesbouw, `teach` upstream onaangeroerd. Waarom die keuze?

## Answer

AFK: **C in `maaktoets`** — `.cursor/skills/maaktoets` wordt de **enige School-entrypoint** voor lesbouw: kind/boek/toetsdiepte + leerformaat-overrides + (waar nodig) teach-workspace conventies in één skill. Upstream `~/.claude/skills/teach` blijft onaangeroerd. School-regels **winnen** bij conflict met teach (Tufte-proza vs dreunlijst, “kort”, book-deferral). Geen B (geen teach-edit).
