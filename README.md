# Shoelace - Visual Bootstrap 3.4.1, 4.6.x, 5.3.x Grid Builder

<p align="center">
	<img src="https://raw.githubusercontent.com/bigbear2/shoelace.bootstrap.grid/main/css/img/shoelace-logo.png" alt="Shoelace logo">
</p>

## English

Shoelace is a visual builder for the Bootstrap 3 grid system. It provides:

- A live responsive preview (phone, tablet, desktop, large desktop)
- A visual workspace to add rows and columns
- Export options for HTML, Jade and EDN
- Simple options like including a container or using LESS mixins

This repository contains the static web app (HTML/CSS/JS) compiled from the original project.

## Italiano

Shoelace è un builder visuale per il sistema a griglia di Bootstrap 3. Offre:

- Anteprima responsiva in tempo reale (phone, tablet, desktop, large desktop)
- Un'area di lavoro visuale per aggiungere righe e colonne
- Opzioni di esportazione per HTML, Jade ed EDN
- Opzioni semplici come includere il container o usare mixin LESS

Questa repository contiene l'app web statica (HTML/CSS/JS) compilata dal progetto originale.

---

## Local setup / How to run

To run the app locally you only need a simple static HTTP server. From the project root run:

```powershell
# start a local server on port 8000
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Notes:
- Some external CDNs were removed for offline local use (jQuery, Prettify, Typekit, analytics).
- A small set of client-side stubs and conversion scripts were added to enable local editing and export.

## What's changed (quick changelog)

- Removed external CDN dependencies that caused 404s when running locally.
- Added a Bootstrap version selector (3/4/5) in the UI to adapt exported markup.
- Added client-side conversion rules that attempt to map common Bootstrap 3 classes to Bootstrap 4/5 equivalents.
- Added a lightweight HTML formatting step so exported code is readable without Prettify.js.
- Mocked `$.ajax` behavior to avoid failing calls to GitHub Gists when running offline.

## Notes and limitations

- The conversion rules are best-effort and do not cover all Bootstrap components or edge cases (navbars, forms, JS components).
- If you need perfect conversions, it's recommended to post-process the exported markup with a proper HTML parser and dedicated conversion library.
- Feel free to open issues or extend the `index.html` scripts to improve mappings.

---

## Italiano - Avvio locale e note

Per eseguire l'app in locale basta un semplice server statico. Dalla root del progetto esegui:

```powershell
# avvia server locale sulla porta 8000
python -m http.server 8000
# poi apri http://localhost:8000 nel browser
```

Note:
- Alcuni CDN esterni sono stati rimossi per permettere l'esecuzione offline (jQuery, Prettify, Typekit, analytics).
- Sono stati aggiunti stub client-side e script di conversione per abilitare l'editing e l'esportazione locali.

## Cambiamenti principali

- Rimosse dipendenze CDN che causavano errori 404 in locale.
- Aggiunto un selettore della versione di Bootstrap (3/4/5) nell'interfaccia per adattare il markup esportato.
- Aggiunte regole client-side per mappare classi comuni di Bootstrap 3 verso Bootstrap 4/5.
- Aggiunta una formattazione HTML minimale per rendere leggibile il codice esportato senza Prettify.js.
- Mock di `$.ajax` per evitare chiamate fallite a GitHub Gists durante l'esecuzione offline.

## Limitazioni

- Le regole di conversione sono un servizio minimo e non coprono tutti i componenti o casi particolari (navbar, form, componenti JS).
- Per conversioni accurate è consigliabile usare un parser HTML e una libreria dedicata per la migrazione.


