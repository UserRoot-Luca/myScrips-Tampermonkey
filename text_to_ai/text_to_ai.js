// ==UserScript==
// @name         Text To AI
// @namespace    http://tampermonkey.net/
// @description  -
// @version      2.0
// @author       -
// @match        https://ecfr.eu/*
// @match        https://euractiv.it/*
// @match        https://www.euractiv.com/*
// @match        https://www.ilpost.it/*
// @match        https://*.euronews.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

(function() {
    'use strict';
    const prontAiSummary = "Riassumi il seguente testo in italiano, in modo chiaro, conciso e naturale. Mantieni un tono gentile e descrittivo, evidenziando tutti i punti principali senza omettere informazioni chiave, senza giudizi o enfasi aggressiva. Formatta il riassunto per renderlo leggibile: usa paragrafi brevi (2-5 frasi max), elenchi puntati per i punti chiave se utile, e spaziature adeguate. Evita muri di testo infiniti. Fornisci solo il riassunto formattato, senza introduzioni o conclusioni extra. Testo da riassumere: \" ";
    const prontAiTranslate = "Sei un traduttore esperto. Traduci il seguente testo IN ITALIANO mantenendo ESATTAMENTE lo stesso contenuto e significato originale. REGOLE OBBLIGATORIE: 1. NON modificare, aggiungere, eliminare o parafrasare NESSUN elemento del testo originale. 2. Includi TUTTE le informazioni presenti: non deve mancare NESSUN dettaglio, frase o concetto. 3. Usa una formattazione SENSATA e chiara (paragrafi logici, elenchi se presenti, grassetto per titoli/importante, ecc.), non casuale. Rispondi SOLO con: 1. Il testo tradotto in italiano con formattazione chiara. TESTO DA TRADURRE: \" ";
    
    GM_setValue('prontAi_typeSelector_value', 1);
    [
        'Select Copy Without Pront',
        'Select Pront Summary',
        'Select Pront Translate'
    ].forEach((e, i) => {
        GM_registerMenuCommand(e, () => {
            GM_setValue('prontAi_typeSelector_value', i);
        }, undefined, undefined, false);
    });
    window.addEventListener("keypress", (event) => {
        if(event.key == "c"){
            let textBodyElement = document.querySelector(".text-body.tts-input") || document.querySelector(".c-article-content.js-article-content") || document.querySelector("#singleBody") || document.querySelector(".ea-article-body-content") || document.querySelector("#flip-pay");
            if (textBodyElement != null) {
                let textOut = "";
                let textOut_prontAi = "";
                let prontAi_typeSelector_value = parseInt(GM_getValue('prontAi_typeSelector_value'));
                for (const el of textBodyElement.children) {
                    if (el.nodeName.toLocaleLowerCase() != "figure") {
                        textOut += el.textContent.trim();
                    }
                }
                textOut = textOut.trim().replace(/\t+/g, ' ').replace(/\s+/g, ' ');
                if (prontAi_typeSelector_value == 0) {
                    textOut_prontAi = textOut;
                } else if (prontAi_typeSelector_value == 1) {
                    textOut_prontAi = prontAiSummary + textOut + " \"";
                } else if (prontAi_typeSelector_value == 2) {
                    textOut_prontAi = prontAiTranslate + textOut + " \"";
                }
                //console.log(textOut_prontAi);
                navigator.clipboard.writeText(textOut_prontAi);
            } else { window.alert("ERROR: Nothing found to copy"); }
        }
    });
})();