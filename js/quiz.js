document.addEventListener('DOMContentLoaded', function () {
    const questions = [
        {
            q: "Una matriz A de orden n×n es diagonalizable si y solo si:",
            opts: ["Su determinante es distinto de cero","Tiene exactamente n vectores propios linealmente independientes","Es una matriz cuadrada","Todos sus elementos son positivos"],
            ans: 1
        },
        {
            q: "En la factorización A = P·D·P⁻¹, las columnas de P son:",
            opts: ["Los valores propios de A","Los vectores propios de A","Las filas de la matriz identidad","Los elementos de la diagonal de A"],
            ans: 1
        },
        {
            q: "Si A tiene n valores propios distintos, entonces:",
            opts: ["A nunca es diagonalizable","A siempre es diagonalizable","A es simétrica","A no tiene vectores propios"],
            ans: 1
        },
        {
            q: "Una matriz A puede NO ser diagonalizable cuando:",
            opts: ["Es simétrica","Tiene determinante positivo","Un valor propio tiene multiplicidad algebraica mayor que su multiplicidad geométrica","Todos sus valores propios son distintos"],
            ans: 2
        },
        {
            q: "¿Cuál es la definición de una matriz simétrica?",
            opts: ["A · A = I","A = A⁻¹","Aᵀ = A","det(A) = 0"],
            ans: 2
        },
        {
            q: "Según el Teorema Espectral, toda matriz simétrica real:",
            opts: ["No tiene valores propios","Siempre es diagonalizable mediante una base ortonormal","Solo es diagonalizable si es invertible","Tiene valores propios complejos"],
            ans: 1
        },
        {
            q: "En la diagonalización ortogonal A = Q·D·Qᵀ, ¿por qué es ventajoso usar Q?",
            opts: ["Porque hace que Q sea siempre la matriz identidad","Porque Q⁻¹ = Qᵀ, así que no hay que calcular la inversa","Porque D siempre es la matriz identidad","Porque Q tiene determinante igual a 1"],
            ans: 1
        },
        {
            q: "Si A = P·D·P⁻¹, entonces A⁵ es igual a:",
            opts: ["P·5D·P⁻¹","P·D⁵·P⁻¹","5·P·D·P⁻¹","P⁵·D·P⁻¹"],
            ans: 1
        },
        {
            q: "En una matriz simétrica, los vectores propios asociados a valores propios distintos son:",
            opts: ["Paralelos","Iguales","Ortogonales","Complejos"],
            ans: 2
        },
        {
            q: "La matriz de covarianza C = XᵀX en machine learning es siempre:",
            opts: ["Antisimétrica","Triangular","Simétrica y semidefinida positiva","No diagonalizable"],
            ans: 2
        }
    ];

    function buildQuiz() {
        const container = document.getElementById('quiz-container');
        container.innerHTML = '';
        questions.forEach((q, i) => {
            const div = document.createElement('div');
            div.className = 'mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200';
            div.innerHTML = `<p class="font-semibold text-slate-800 mb-3">${i + 1}. ${q.q}</p>
            <div class="space-y-2">${q.opts.map((o, j) =>
                `<label class="quiz-option flex items-center p-3 rounded-lg border-2 border-gray-200 cursor-pointer hover:bg-green-50 transition-colors">
                    <input type="radio" name="q${i}" value="${j}" class="mr-3 accent-green-600">
                    <span class="text-slate-700">${o}</span></label>`).join('')}</div>
            <div id="feedback-${i}" class="mt-2 text-sm font-medium hidden"></div>`;
            container.appendChild(div);
        });
        if (window.MathJax) window.MathJax.typesetPromise();
    }

    buildQuiz();

    document.getElementById('submit-quiz-btn').addEventListener('click', function () {
        let score = 0;
        let sinResponder = false;

        questions.forEach((q, i) => {
            const sel = document.querySelector(`input[name="q${i}"]:checked`);
            const fb = document.getElementById(`feedback-${i}`);
            const labels = document.querySelectorAll(`input[name="q${i}"]`);

            // Deshabilitar opciones después de verificar
            labels.forEach(input => input.disabled = true);

            if (sel) {
                const val = parseInt(sel.value);
                if (val === q.ans) {
                    score++;
                    fb.textContent = '✅ ¡Correcto!';
                    fb.className = 'mt-2 text-sm font-medium text-green-700';
                    // Marcar la opción correcta en verde
                    sel.closest('label').classList.add('bg-green-100', 'border-green-400');
                } else {
                    fb.textContent = `❌ Incorrecto. La respuesta correcta es: "${q.opts[q.ans]}"`;
                    fb.className = 'mt-2 text-sm font-medium text-red-700';
                    // Marcar la opción incorrecta en rojo y la correcta en verde
                    sel.closest('label').classList.add('bg-red-100', 'border-red-400');
                    document.querySelector(`input[name="q${i}"][value="${q.ans}"]`)
                        ?.closest('label')?.classList.add('bg-green-100', 'border-green-400');
                }
                fb.classList.remove('hidden');
            } else {
                sinResponder = true;
                fb.textContent = '⚠️ No respondiste esta pregunta.';
                fb.className = 'mt-2 text-sm font-medium text-yellow-700';
                fb.classList.remove('hidden');
                // Marcar la correcta en verde de todas formas
                document.querySelector(`input[name="q${i}"][value="${q.ans}"]`)
                    ?.closest('label')?.classList.add('bg-green-100', 'border-green-400');
            }
        });

        const pct = Math.round((score / questions.length) * 100);
        document.getElementById('quiz-result').innerHTML =
            `<div class="p-4 rounded-lg ${pct >= 70 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                Obtuviste <strong>${score} de ${questions.length}</strong> correctas (${pct}%).
                ${pct >= 70 ? '🎉 ¡Excelente dominio del tema!' : '📚 Revisa el contenido e inténtalo de nuevo.'}
                ${sinResponder ? '<br><span class="text-yellow-700 text-sm">⚠️ Algunas preguntas quedaron sin responder.</span>' : ''}
            </div>`;

        document.getElementById('submit-quiz-btn').classList.add('hidden');
        document.getElementById('reset-quiz-btn').classList.remove('hidden');
    });

    document.getElementById('reset-quiz-btn').addEventListener('click', function () {
        document.getElementById('quiz-result').innerHTML = '';
        document.getElementById('submit-quiz-btn').classList.remove('hidden');
        document.getElementById('reset-quiz-btn').classList.add('hidden');
        buildQuiz();
        window.scrollTo({ top: document.getElementById('evaluacion').offsetTop, behavior: 'smooth' });
    });
});