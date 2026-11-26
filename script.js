
// ========================================
// 1. CONEXÃO COM SUPABASE
// ========================================

const SUPABASE_URL = "https://jehvctivofxtcwsypjgh.supabase.co";

const SUPABASE_KEY = "sb_publishable_noeh4bvWsbMMkNzGcVUCZA_q4ji3Bvc";

// Cria a conexão
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

    // Impede a página de atualizar
    event.preventDefault();

    // Captura os dados digitados
    const email = document.getElementById("email").value.trim();

    const senha = document.getElementById("senha").value;

    // Verifica os campos
    if (!email || !senha) {
        mensagem.innerText = "Preencha todos os campos!";
        return;
    }

    mensagem.innerText = "Verificando seus dados...";


    // ========================================
    // 4. AUTENTICAÇÃO
    // ========================================

    try {

        const { data, error } = await banco.auth.signInWithPassword({

            email: email,

            password: senha

        });


        // ========================================
        // 5. TRATAMENTO DE ERRO
        // ========================================

        if (error) {

            console.error("Erro no login:", error);

            mensagem.innerText = "Erro ao entrar: " + error.message;

            return;
        }


        // ========================================
        // 6. LOGIN REALIZADO
        // ========================================

        mensagem.innerText = "Login realizado com sucesso!";

        console.log("Usuário conectado:", data.user);

        // Redireciona para outra página, se desejar
        // window.location.href = "inicio.html";


    } catch (erro) {

        console.error("Erro inesperado:", erro);

        mensagem.innerText = "Erro ao conectar ao Supabase!";

    }

});
