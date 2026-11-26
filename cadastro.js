
// ========================================
// 1. CONEXÃO COM SUPABASE
// ========================================

// URL do seu projeto
const SUPABASE_URL = "https://jehvctivofxtcwsypjgh.supabase.co";

// Chave pública do projeto
const SUPABASE_KEY = "sb_publishable_noeh4bvWsbMMkNzGcVUCZA_q4ji3Bvc";

// Cria a conexão
const banco = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ========================================
// 2. SELECIONANDO ELEMENTOS DO HTML
// ========================================

// Formulário de cadastro
const formulario = document.getElementById("formCadastro");

// Campo de mensagem
const mensagem = document.getElementById("mensagem");


// ========================================
// 3. EVENTO DE CADASTRO
// ========================================

formulario.addEventListener("submit", async function(event) {

    // Impede a atualização da página
    event.preventDefault();


    // ========================================
    // 4. CAPTURANDO OS DADOS
    // ========================================

    const email = document.getElementById("email").value.trim();

    const senha = document.getElementById("senha").value;


    // Verifica se os campos estão preenchidos
    if (!email || !senha) {
        mensagem.innerText = "Preencha todos os campos!";
        return;
    }


    // ========================================
    // 5. CADASTRANDO NO SUPABASE AUTH
    // ========================================

    mensagem.innerText = "Criando sua conta...";

    try {

        // Envia os dados para o sistema de autenticação
        const { data, error } = await banco.auth.signUp({

            email: email,

            password: senha

        });


        // ========================================
        // 6. VERIFICANDO ERROS
        // ========================================

        if (error) {

            console.error("Erro no cadastro:", error);

            mensagem.innerText = "Erro ao cadastrar: " + error.message;

            return;
        }


        // ========================================
        // 7. CADASTRO CONCLUÍDO
        // ========================================

        if (data.user && !data.session) {

            mensagem.innerText =
                "Conta criada! Verifique seu e-mail para confirmar o cadastro.";

        } else {

            mensagem.innerText =
                "Usuário cadastrado com sucesso!";

        }

        // Limpa os campos
        formulario.reset();


    } catch (erro) {

        // Captura erros inesperados
        console.error("Erro inesperado:", erro);

        mensagem.innerText =
            "Não foi possível conectar ao Supabase.";

    }

});
