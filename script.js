// Verifica se estamos na página feedback.html
if (window.location.pathname.endsWith("feedback.html")) {
    // -------------------- FEEDBACK (comentários) --------------------
    const feedbackForm = document.getElementById("feedbackForm");
    const lista = document.getElementById("listaComentarios");

    function carregarComentarios() {
        const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        lista.innerHTML = "";

        comentarios.forEach((c, index) => {
            const li = document.createElement("li");
            li.classList.add("comentario-item");

            li.innerHTML = `
                <div class="comentario-texto">
                    <strong>${c.nome}:</strong> ${c.texto}
                </div>
                <div class="comentario-botoes">
                    <button class="like-btn">👍 <span>${c.likes || 0}</span></button>
                    <button class="remover-btn">❌</button>
                </div>
            `;

            // Botão de like
            li.querySelector(".like-btn").addEventListener("click", () => {
                c.likes = (c.likes || 0) + 1;
                localStorage.setItem("comentarios", JSON.stringify(comentarios));
                carregarComentarios();
            });

            // Botão remover
            li.querySelector(".remover-btn").addEventListener("click", () => {
                comentarios.splice(index, 1);
                localStorage.setItem("comentarios", JSON.stringify(comentarios));
                carregarComentarios();
            });

            lista.appendChild(li);
        });
    }

    // Inicializa a lista de comentários
    carregarComentarios();

    // Envio do formulário de feedback
    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const nome = document.getElementById("nomeFeedback").value;
        const comentario = document.getElementById("comentarioFeedback").value;

        const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentarios.push({ nome, texto: comentario, likes: 0 });

        localStorage.setItem("comentarios", JSON.stringify(comentarios));
        carregarComentarios();
        feedbackForm.reset();
    });
}


// -------------------- CONTATO (mensagens) --------------------
function salvarMensagem(nome, email, telefone, mensagem) {
    const mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
    mensagens.push({ nome, email, telefone, mensagem });
    localStorage.setItem("mensagens", JSON.stringify(mensagens));
}

function enviarContato(event) {
    event.preventDefault(); // impede reload da página

    const nome = document.getElementById("nomeContato").value;
    const email = document.getElementById("emailContato").value;
    const telefone = document.getElementById("telefoneContato").value;
    const mensagem = document.getElementById("mensagemContato").value;

    salvarMensagem(nome, email, telefone, mensagem);

    alert("Mensagem enviada com sucesso!");

    // limpa os campos do formulário
    document.getElementById("contatoForm").reset();
}

// ------------------- Barra de Navegação Mobile ------------------------

let btnMenu = document.getElementById('btn-menu')
let menu = document.getElementById('menu-mobile')
let overlay = document.getElementById('overlay-menu')

btnMenu.addEventListener('click', ()=> {
    menu.classList.add('abrir-menu')
})

menu.addEventListener('click', ()=> {
    menu.classList.remove('abrir-menu')
})
overlay.addEventListener('click', ()=> {
    menu.classList.remove('abrir-menu')
})