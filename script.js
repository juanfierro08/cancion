document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const overlay = document.getElementById('startOverlay');
    const container = document.getElementById('karaokeContainer');
    const audioPlayer = document.getElementById('audioPlayer');

    // Datos exactos sincronizados con la canción (tiempos en segundos)
    const lyricsData = [
        { time: 0, text: "🎵 Instrumental", styles: {"Instrumental": "color-gold"} },
        { time: 12.78, text: "Que fatalidad", styles: {"fatalidad": "color-white"} },
        { time: 17.04, text: "Eres mi héroe y mi villana", styles: {"villana": "color-pink cursive"} },
        { time: 20.78, text: "Podría enloquecer", styles: {"enloquecer": "color-gold"} },
        { time: 24.25, text: "Descifrando tu conspiración", styles: {"conspiración": "color-white cursive"} },
        { time: 27.53, text: "Muero por saber", styles: {"Muero": "color-white upper"} },
        { time: 31.07, text: "El desenlace de esta trama", styles: {"trama": "color-pink cursive"} },
        { time: 34.87, text: "Comienza a anochecer", styles: {"anochecer": "color-gold"} },
        { time: 38.06, text: "Y el corazón va al descubierto", styles: {"corazón": "color-pink cursive"} },
        { time: 41.86, text: "Debo interpretar tus gritos", styles: {"interpretar": "color-white"} },
        { time: 44.86, text: "Tus llamadas tus caricias entrecortadas", styles: {"llamadas": "color-pink cursive"} },
        { time: 50.05, text: "Y tus arranques DE Pasión", styles: {"DE": "color-white upper", "Pasión": "color-pink cursive"} },
        { time: 55.46, text: "Debo buscar dentro de tanto desperfecto", styles: {"buscar": "color-gold"} },
        { time: 60.73, text: "La moraleja de este cuento", styles: {"moraleja": "color-white"} },
        { time: 64.19, text: "Debo domar tu corazón", styles: {"domar": "color-gold", "corazón": "color-pink cursive"} },
        
        { time: 68.94, text: "En la oscuridad", styles: {} },
        { time: 73.05, text: "Son los instintos los que mandan", styles: {"instintos": "color-pink"} },
        { time: 76.84, text: "Qué más quieres romper", styles: {"romper": "color-white cursive"} },
        { time: 80.29, text: "De corazones tienes colección", styles: {"corazones": "color-pink"} },
        { time: 83.63, text: "Ya va a amanecer", styles: {"amanecer": "color-gold"} },
        { time: 87.32, text: "Y sigo en esta encrucijada", styles: {"encrucijada": "color-white cursive"} },
        { time: 90.84, text: "Misterio de mujer", styles: {"Misterio": "color-gold"} },
        { time: 94.11, text: "Solo será cuestión de tiempo", styles: {"tiempo": "color-white"} },
        
        { time: 97.88, text: "Debo interpretar tus gritos", styles: {"interpretar": "color-white"} },
        { time: 101.08, text: "Tus llamadas tus caricias entrecortadas", styles: {"llamadas": "color-pink cursive"} },
        { time: 106.03, text: "Y tus arranques DE Pasión", styles: {"DE": "color-white upper", "Pasión": "color-pink cursive"} },
        { time: 111.63, text: "Debo buscar dentro de tanto desperfecto", styles: {"buscar": "color-gold"} },
        { time: 116.92, text: "La moraleja de este cuento", styles: {"moraleja": "color-white"} },
        { time: 120.01, text: "Debo domar tu corazón", styles: {"domar": "color-gold", "corazón": "color-pink cursive"} },
    
        { time: 125.01, text: "🎵 Instrumental", styles: {"Instrumental": "color-gold"} },

        { time: 153.59, text: "Y debo de enterrar el filo de tu espada", styles: {"espada": "color-white"} },
        { time: 158.81, text: "En los secretos de tu almohada", styles: {"almohada": "color-pink cursive"} },
        { time: 161.73, text: "Hasta que entiendas la lección", styles: {"lección": "color-gold"} },
        { time: 167.68, text: "Debo llegar al fondo de este desparpajo", styles: {"fondo": "color-white upper"} },
        { time: 173.05, text: "Que yo de esta no me rajo", styles: {"rajo": "color-pink cursive"} },
        { time: 175.92, text: "Hasta domar tu corazón", styles: {"domar": "color-gold", "corazón": "color-pink cursive"} },
        { time: 179.25, text: "", styles: {} } 
    ];

    // Construir DOM
    lyricsData.forEach((lineData, lineIndex) => {
        if (lineData.text === "") return;

        const lineEl = document.createElement('div');
        lineEl.className = 'karaoke-line';
        lineEl.id = `line-${lineIndex}`;

        const mainLine = document.createElement('div');
        mainLine.className = 'line-main';

        const words = lineData.text.split(' ');
        words.forEach((word) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            
            const cleanWord = word.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '');
            let classes = 'color-white'; 
            
            for (const key in lineData.styles) {
                if (cleanWord === key || word === key || cleanWord.toLowerCase() === key.toLowerCase()) {
                    classes = lineData.styles[key];
                    break;
                }
            }

            classes.split(' ').forEach(cls => wordSpan.classList.add(cls));

            wordSpan.innerHTML = `${word}<span class="fill">${word}</span>`;
            mainLine.appendChild(wordSpan);
        });

        lineEl.appendChild(mainLine);

        // Preview de la siguiente línea
        if (lineIndex < lyricsData.length - 2 && lyricsData[lineIndex + 1].text !== "🎵 Instrumental") {
            const nextLine = document.createElement('div');
            nextLine.className = 'line-next';
            nextLine.textContent = lyricsData[lineIndex + 1].text.toLowerCase();
            lineEl.appendChild(nextLine);
        }

        container.appendChild(lineEl);
    });

    startBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        audioPlayer.play().catch(e => console.log("Audio no encontrado:", e));
    });

    let currentLineIndex = -1;
    let wordTimeouts = []; // Para limpiar timeouts si el usuario salta en el audio

    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime;

        // Buscar qué línea de letra corresponde al tiempo actual
        let activeIndex = -1;
        for (let i = 0; i < lyricsData.length; i++) {
            if (currentTime >= lyricsData[i].time && (i === lyricsData.length - 1 || currentTime < lyricsData[i + 1].time)) {
                activeIndex = i;
                break;
            }
        }

        if (activeIndex !== -1 && activeIndex !== currentLineIndex && lyricsData[activeIndex].text !== "") {
            currentLineIndex = activeIndex;

            // Limpiar timeouts anteriores
            wordTimeouts.forEach(t => clearTimeout(t));
            wordTimeouts = [];

            // Actualizar UI para ocultar las demás líneas y mostrar la actual
            document.querySelectorAll('.karaoke-line').forEach(el => el.classList.remove('active'));
            const lineEl = document.getElementById(`line-${currentLineIndex}`);
            
            if (lineEl) {
                lineEl.classList.add('active');

                const words = lineEl.querySelectorAll('.word');
                
                // Calcular tiempo disponible para esta línea
                let nextTime = lyricsData[currentLineIndex + 1] ? lyricsData[currentLineIndex + 1].time : lyricsData[currentLineIndex].time + 4;
                let durationMs = (nextTime - lyricsData[currentLineIndex].time) * 1000;
                
                // Limitar la duración de animación para evitar que en espacios largos vaya súper lento
                if (durationMs > 4000 && lyricsData[currentLineIndex].text !== "🎵 Instrumental") {
                    durationMs = 4000; 
                }

                const timePerWord = durationMs / words.length;

                words.forEach((wordSpan, wIndex) => {
                    const fillSpan = wordSpan.querySelector('.fill');
                    // Reiniciar el width
                    fillSpan.style.transition = 'none';
                    fillSpan.style.clipPath = 'inset(0 100% 0 0)';
                    
                    // Disparar animación
                    const t = setTimeout(() => {
                        fillSpan.style.transition = `clip-path ${timePerWord}ms linear`;
                        fillSpan.style.clipPath = 'inset(0 -20% 0 0)';
                    }, wIndex * timePerWord);

                    wordTimeouts.push(t);
                });
            }
        }
    });
});
