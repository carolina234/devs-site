const URL =
"https://carolina234.github.io/devs-site/";

fetch(URL)

.then(r=>r.json())

.then(dados=>{

document.getElementById("participantes").innerHTML=dados.length;

const mediaNota =
dados.reduce((s,d)=>s+d.nota,0)/dados.length;

document.getElementById("mediaNota").innerHTML=
mediaNota.toFixed(1);

const mediaAval =
dados.reduce((s,d)=>s+d.avaliacao,0)/dados.length;

document.getElementById("mediaAvaliacao").innerHTML=
mediaAval.toFixed(1);

const usamIA=
dados.filter(d=>d.ia=="Sim").length;

document.getElementById("porcentagemIA").innerHTML=
((usamIA/dados.length)*100).toFixed(0)+"%";

const cursos={};

dados.forEach(d=>{

cursos[d.curso]=(cursos[d.curso]||0)+1;

});

new Chart(

document.getElementById("graficoCursos"),

{

type:"bar",

data:{

labels:Object.keys(cursos),

datasets:[{

label:"Participantes",

data:Object.values(cursos)

}]

}

}

);

const notas={1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0};

dados.forEach(d=>{

const n=Math.round(d.nota);

notas[n]++;

});

new Chart(

document.getElementById("graficoNotas"),

{

type:"pie",

data:{

labels:Object.keys(notas),

datasets:[{

data:Object.values(notas)

}]

}

}

);

});