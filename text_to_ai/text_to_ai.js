// ==UserScript==
// @name         Text To AI
// @namespace    http://tampermonkey.net/
// @description  try to take over the world!
// @version      1.0
// @author       -
// @match        https://ecfr.eu/*
// @match        https://euractiv.it/*
// @match        https://www.euractiv.com/*
// @match        https://www.ilpost.it/*
// @match        https://*.euronews.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const prontAi = "Riassumi il seguente testo in italiano, in modo chiaro, conciso e naturale. Mantieni un tono gentile e descrittivo, evidenziando tutti i punti principali senza omettere informazioni chiave, senza giudizi o enfasi aggressiva. Formatta il riassunto per renderlo leggibile: usa paragrafi brevi (2-5 frasi max), elenchi puntati per i punti chiave se utile, e spaziature adeguate. Evita muri di testo infiniti. Fornisci solo il riassunto formattato, senza introduzioni o conclusioni extra. Testo da riassumere: \" ";
    window.addEventListener("keypress", (event) => {
        if(event.key == "c"){
            let textBodyElement = document.querySelector(".text-body.tts-input") || document.querySelector(".c-article-content.js-article-content") || document.querySelector("#singleBody") || document.querySelector(".ea-article-body-content");
            if (textBodyElement != null) {
                let textOut = "";
                for (const el of textBodyElement.children) {
                    if (el.nodeName.toLocaleLowerCase() != "figure") {
                        textOut += el.textContent.trim();
                    }
                }
                //console.log(prontAi + textOut + " \"");
                navigator.clipboard.writeText(prontAi + textOut + " \"");
            } else { window.alert("ERRORE: Non è stato trovato nulla da coppiare"); }
        }
    });
})();