
// ========================================
// 1. CONEXÃO COM SUPABASE
// ========================================

const SUPABASE_URL = "https://jehvctivofxtcwsypjgh.supabase.co";

const SUPABASE_KEY = "sb_publishable_noeh4bvWsbMMkNzGcVUCZA_q4ji3Bvc";

const banco = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ========================================
// 2. ELEMENTOS DO HTML
// ========================================

const formulario = document.getElementById("formLogin");
const mensagem = document.getElementById("mensagem");


// ========================================
// 3. EVENTO DE LOGIN
// ========================================

formulario.addEventListener("submit", async function(event) {

    event.preventDefault();

    // Captura os dados digitados
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;

    // Verifica se os campos estão preenchidos
    if (!email || !senha) {
        mensagem.innerText = "Preencha todos os campos!";
        return;
    }

    mensagem.innerText = "Verificando seus dados...";

    try {

        // ========================================
        // 4. AUTENTICAÇÃO NO SUPABASE
        // ========================================

        const { data, error } = await banco.auth.signInWithPassword({
            email: email,
            password: senha
        });

        // Se houver erro, interrompe o processo
        if (error) {
            console.error("Erro no login:", error);
            mensagem.innerText = "Erro ao entrar: " + error.message;
            return;
        }

        // ========================================
        // 5. LOGIN CONFIRMADO
        // ========================================

        mensagem.innerText = "Login realizado! Redirecionando...";

        // Aguarda 1 segundo e abre a página inicial
        setTimeout(function() {
            window.location.href = "inicio.html";
        }, 1000);

    } catch (erro) {

        console.error("Erro inesperado:", erro);
        mensagem.innerText = "Erro ao conectar ao Supabase!";

    }

});
