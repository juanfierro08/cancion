document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const overlay = document.getElementById('startOverlay');
    const container = document.getElementById('karaokeContainer');
    const audioPlayer = document.getElementById('audioPlayer');

    // Datos de la letra con duraciones aproximadas (ms) y estilos específicos
    const lyricsData = [
        {
            text: "Que fatalidad eres mi héroe y mi villana",
            duration: 4000,
            styles: { "fatalidad": "color-white", "villana": "color-pink cursive" }
        },
        {
            text: "podría enloquecer descifrando tu conspiración",
            duration: 4500,
            styles: { "enloquecer": "color-gold", "conspiración": "color-white cursive" }
        },
        {
            text: "Muero por saber el desenlace de esta trama",
            duration: 4000,
            styles: { "Muero": "color-white upper", "trama": "color-pink cursive" }
        },
        {
            text: "comienza a anochecer y el corazón va al descubierto",
            duration: 5000,
            styles: { "anochecer": "color-gold", "corazón": "color-pink cursive" }
        },
        {
            text: "Debo interpretar tus gritos tus llamadas",
            duration: 4000,
            styles: { "interpretar": "color-white", "llamadas": "color-pink cursive" }
        },
        {
            text: "tus caricias entrecortadas y tus ataques DE Pasión",
            duration: 5500,
            styles: { "DE": "color-white upper", "Pasión": "color-pink cursive" }
        },
        {
            text: "Debo buscar dentro de tanto desperfecto",
            duration: 4000,
            styles: { "buscar": "color-gold" }
        },
        {
            text: "la moraleja de este cuento",
            duration: 3500,
            styles: { "moraleja": "color-white" }
        },
        {
            text: "debo domar tu corazón",
            duration: 5000,
            styles: { "domar": "color-gold", "corazón": "color-pink cursive" }
        }
    ];

    // Construir DOM
    lyricsData.forEach((lineData, lineIndex) => {
        const lineEl = document.createElement('div');
        lineEl.className = 'karaoke-line';
        lineEl.id = `line-${lineIndex}`;

        const mainLine = document.createElement('div');
        mainLine.className = 'line-main';

        const words = lineData.text.split(' ');
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            
            // Limpiar la palabra para machear las clases
            const cleanWord = word.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '');
            let classes = 'color-white'; // Estilo por defecto
            
            for (const key in lineData.styles) {
                if (cleanWord === key || word === key) {
                    classes = lineData.styles[key];
                    break;
                }
            }

            // Aplicar las clases
            classes.split(' ').forEach(cls => wordSpan.classList.add(cls));

            // Setear el contenido con el layer superior (fill)
            wordSpan.innerHTML = `${word}<span class="fill">${word}</span>`;
            mainLine.appendChild(wordSpan);
        });

        lineEl.appendChild(mainLine);

        // Preview de la siguiente línea (faded, abajo)
        if (lineIndex < lyricsData.length - 1) {
            const nextLine = document.createElement('div');
            nextLine.className = 'line-next';
            nextLine.textContent = lyricsData[lineIndex + 1].text.toLowerCase();
            lineEl.appendChild(nextLine);
        }

        container.appendChild(lineEl);
    });

    startBtn.addEventListener('click', () => {
        overlay.classList.add('hidden');
        audioPlayer.play().catch(e => console.log("Audio no encontrado o bloqueado:", e));
        
        // Empezar el karaoke ligeramente después
        setTimeout(() => {
            playKaraoke();
        }, 800);
    });

    function playKaraoke() {
        let currentLine = 0;

        function playNextLine() {
            if (currentLine >= lyricsData.length) return;

            // Ocultar líneas anteriores
            document.querySelectorAll('.karaoke-line').forEach(el => el.classList.remove('active'));

            // Activar la línea actual
            const lineEl = document.getElementById(`line-${currentLine}`);
            lineEl.classList.add('active');

            const lineData = lyricsData[currentLine];
            const words = lineEl.querySelectorAll('.word');
            
            // Distribuir el tiempo total de la línea (simplificado) entre las palabras
            const timePerWord = lineData.duration / words.length;

            let wordIndex = 0;
            const wordInterval = setInterval(() => {
                if (wordIndex >= words.length) {
                    clearInterval(wordInterval);
                    currentLine++;
                    setTimeout(playNextLine, 600); // Pausa entre líneas
                    return;
                }

                const fillSpan = words[wordIndex].querySelector('.fill');
                
                // Animar el clip-path para simular cómo se canta (efecto "karaoke word wiping")
                // Esto hará que veamos una palabra encenderse letra por letra.
                fillSpan.style.transition = `clip-path ${timePerWord}ms linear`;
                fillSpan.style.clipPath = 'inset(0 -20% 0 0)'; // -20% asegura que letras cursivas anchas no se corten

                wordIndex++;
            }, timePerWord);
        }

        playNextLine();
    }
});
