(function(){
  var brl=new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'});
  function $(id){return document.getElementById(id);}
  function num(id){var el=$(id);return el?(parseFloat(el.value)||0):0;}

  // menu mobile
  var btn=$('menu-btn'),nav=$('menu');
  if(btn&&nav){btn.addEventListener('click',function(){var a=nav.classList.toggle('aberto');btn.setAttribute('aria-expanded',a);});}

  // calculadora 50/30/20
  var renda=$('renda');
  if(renda){
    var f=function(){var r=num('renda');$('r50').textContent=brl.format(r*0.5);$('r30').textContent=brl.format(r*0.3);$('r20').textContent=brl.format(r*0.2);};
    renda.addEventListener('input',f);f();
  }

  // simulador de juros compostos
  if($('inv-inicial')){
    var sim=function(){
      var p=num('inv-inicial'),m=num('inv-mensal'),taxa=num('inv-taxa')/100,anos=num('inv-anos');
      var n=Math.max(0,Math.round(anos*12));
      var i=Math.pow(1+taxa,1/12)-1;
      var fv=i===0?p+m*n:p*Math.pow(1+i,n)+m*((Math.pow(1+i,n)-1)/i);
      var inv=p+m*n,juros=fv-inv;
      $('inv-total').textContent=brl.format(fv);
      $('inv-investido').textContent=brl.format(inv);
      $('inv-juros').textContent=brl.format(juros);
    };
    ['inv-inicial','inv-mensal','inv-taxa','inv-anos'].forEach(function(id){$(id).addEventListener('input',sim);});sim();
  }

  // comprometimento de renda com dividas
  if($('div-renda')){
    var d=function(){
      var r=num('div-renda'),p=num('div-parcelas'),el=$('div-resultado'),pct=r>0?(p/r)*100:0;
      $('div-pct').textContent=pct.toFixed(1).replace('.',',')+'%';
      if(r<=0){el.textContent='Informe sua renda para ver o resultado.';return;}
      if(pct<=30)el.textContent='Dentro do recomendado: até cerca de 30% da renda.';
      else if(pct<=50)el.textContent='Atenção: acima de 30%. Vale renegociar e evitar novas dívidas.';
      else el.textContent='Alerta: mais da metade da renda comprometida. Priorize negociar e cortar gastos.';
    };
    ['div-renda','div-parcelas'].forEach(function(id){$(id).addEventListener('input',d);});d();
  }

  // formulario de contato
  var form=$('form-contato');
  if(form){form.addEventListener('submit',function(e){e.preventDefault();var s=$('sucesso');s.style.display='block';s.textContent='Obrigado, '+($('nome').value||'')+'! Sua mensagem foi registrada e responderemos em até 48 horas úteis.';form.reset();});}
})();
