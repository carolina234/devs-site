let quizFinalizado = false;

function copiarPrompt(id) {

    const texto = document.getElementById(id).innerText;

    navigator.clipboard.writeText(texto)
        .then(() => {
            alert("✅ Prompt copiado com sucesso!");
        })
        .catch(() => {
            alert("Não foi possível copiar o texto.");
        });

}



// ==========================
// QUIZ
// ==========================

const perguntas = [

{
pergunta:"1. O que significa IA?",
opcoes:[
"Internet Avançada",
"Inteligência Artificial",
"Interface Analógica",
"Informação Automatizada"
],
correta:1
},

{
pergunta:"2. Qual IA é da OpenAI?",
opcoes:[
"Gemini",
"Claude",
"ChatGPT",
"Copilot"
],
correta:2
},

{
pergunta:"3. Qual IA auxilia na programação dentro do VS Code?",
opcoes:[
"Claude",
"Gemini",
"GitHub Copilot",
"Canva"
],
correta:2
},

{
pergunta:"4. A IA substitui totalmente o programador?",
opcoes:[
"Sim",
"Não"
],
correta:1
},

{
pergunta:"5. Qual linguagem é muito usada em IA?",
opcoes:[
"Python",
"HTML",
"CSS",
"SQL"
],
correta:0
},

{
pergunta:"6. A IA pode ajudar a encontrar bugs?",
opcoes:[
"Sim",
"Não"
],
correta:0
},

{
pergunta:"7. O ChatGPT pode gerar documentação?",
opcoes:[
"Sim",
"Não"
],
correta:0
},

{
pergunta:"8. IA pode explicar códigos?",
opcoes:[
"Sim",
"Não"
],
correta:0
},

{
pergunta:"9. Qual ferramenta pertence ao Google?",
opcoes:[
"Gemini",
"Claude",
"Copilot",
"ChatGPT"
],
correta:0
},

{
pergunta:"10. IA aumenta a produtividade?",
opcoes:[
"Sim",
"Não"
],
correta:0
}

];

let indice=0;

let acertos=0;

let notaQuiz=0;

function carregarPergunta(){

const p=perguntas[indice];

document.getElementById("pergunta").innerHTML=p.pergunta;

document.getElementById("progresso").innerHTML=
"Pergunta "+(indice+1)+" de "+perguntas.length;

const respostas=document.getElementById("respostas");

respostas.innerHTML="";

p.opcoes.forEach((opcao,i)=>{

respostas.innerHTML+=`

<label>

<input type="radio"

name="quiz"

value="${i}">

${opcao}

</label>

`;

});

}

carregarPergunta();
document
    .getElementById("btnProxima")
    .addEventListener("click", proximaPergunta);

function proximaPergunta(){

const marcada=document.querySelector('input[name="quiz"]:checked');

if(!marcada){

alert("Selecione uma resposta.");

return;

}

if(Number(marcada.value)==perguntas[indice].correta){

acertos++;

}

indice++;

if(indice<perguntas.length){

carregarPergunta();

}else{

notaQuiz = (acertos / perguntas.length) * 10;

quizFinalizado = true;

document.getElementById("quiz-container").style.display="none";

document.getElementById("resultado").style.display="block";

document.getElementById("notaFinal").innerHTML=

"Você acertou "+acertos+" de "+perguntas.length+

"<br><br>Nota: "+notaQuiz.toFixed(1);

let mensagem="";

if(notaQuiz>=9){

mensagem="🏆 Excelente!";

}else if(notaQuiz>=7){

mensagem="👏 Muito bom!";

}else{

mensagem="📚 Continue estudando!";

}

document.getElementById("mensagemFinal").innerHTML=mensagem;


}
}

// ==========================
// FORMULÁRIO
// ==========================

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    if (!quizFinalizado) {
        alert("⚠️ Você precisa concluir o quiz antes de enviar a avaliação.");
        return;
    }

    const dados = {
        nome: document.getElementById("nome").value,
        email: document.getElementById("email").value,
        curso: document.getElementById("curso").value,
        ia: document.getElementById("ia").value,
        quiz: acertos,
        nota: notaQuiz.toFixed(1),
        avaliacao: document.getElementById("nota").value,
        comentario: document.getElementById("comentario").value
    };

    try {

        const resposta = await fetch(
            "https://script.google.com/macros/s/AKfycbwiEnyiaVckYM5-_EMPnRWnZr7t_XpIOMwZzugK0G9mSWMYve5bvlcawaq6_8GcNFoG/exec",
            {
                method: "POST",
                headers: {
             "Content-Type": "application/json"
                  },
                body: JSON.stringify(dados)
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro HTTP: " + resposta.status);
        }

        alert("✅ Avaliação enviada com sucesso!");

        formulario.reset();

        indice = 0;
        acertos = 0;
        notaQuiz = 0;
        quizFinalizado = false;

        document.getElementById("resultado").style.display = "none";
        document.getElementById("quiz-container").style.display = "block";

        carregarPergunta();

    } catch (erro) {

        console.error(erro);

        alert("Erro ao enviar: " + erro.message);

    }

});
// ==========================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ==========================

const elementos = document.querySelectorAll(
".card, .beneficio, .prompt, .codigo-box, .sobre p"
);

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

},{threshold:0.2});

elementos.forEach(el=>{

    el.style.opacity="0";
    el.style.transform="translateY(50px)";
    el.style.transition="all .7s ease";

    observer.observe(el);

});

// ==========================
// BOTÃO VOLTAR AO TOPO
// ==========================

const botaoTopo = document.createElement("button");

botaoTopo.innerHTML = "⬆";

botaoTopo.style.position = "fixed";
botaoTopo.style.bottom = "30px";
botaoTopo.style.right = "30px";
botaoTopo.style.width = "55px";
botaoTopo.style.height = "55px";
botaoTopo.style.border = "none";
botaoTopo.style.borderRadius = "50%";
botaoTopo.style.background = "#2563eb";
botaoTopo.style.color = "white";
botaoTopo.style.fontSize = "22px";
botaoTopo.style.cursor = "pointer";
botaoTopo.style.display = "none";
botaoTopo.style.boxShadow = "0 5px 15px rgba(0,0,0,.3)";
botaoTopo.style.zIndex = "1000";

document.body.appendChild(botaoTopo);

window.addEventListener("scroll", ()=>{

    if(window.scrollY > 400){

        botaoTopo.style.display = "block";

    }else{

        botaoTopo.style.display = "none";

    }

});

botaoTopo.addEventListener("click", ()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ==========================
// MENSAGEM DE BOAS-VINDAS
// ==========================

window.addEventListener("load", ()=>{

    setTimeout(()=>{

        alert("👋 Bem-vindo ao projeto 'Inteligência Artificial para Devs'!\n\nExplore as ferramentas, copie os prompts e teste seus conhecimentos no quiz.");

    },800);

});