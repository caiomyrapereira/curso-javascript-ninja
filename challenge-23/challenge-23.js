/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:

- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;

- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/
( function( wind , doc){
 'use strict';

 var $input = doc.querySelector('input'); 
 var $buttonNumber = doc.querySelectorAll('[data-js="number"]');
 var $buttonOperacoes =  doc.querySelectorAll('[data-js="operador"]');
 var $buttonCe  = doc.querySelector('[data-js="ce"]');
 var $buttonResultado = doc.querySelector('[data-js="="]');

 function initialize(){
  initEvent()
 }

 function initEvent(){
  Array.prototype.forEach.call( $buttonNumber , atribuirNumber    )
  Array.prototype.forEach.call( $buttonOperacoes , atribuirOperador  )
  $buttonCe.addEventListener( 'click' , atribuirClear , false )
  $buttonResultado.addEventListener('click', atribuirResultado , false)
 }

 function  atribuirNumber( elem ){
  elem.onclick = function(){
    var regex = /(^0\d)+/gm;
    $input.value +=   elem.innerHTML;
    $input.value  = $input.value.replace(regex , elem.innerHTML );
  }
 }

 function atribuirOperador( elem ){
  elem.onclick = function(){
    removeUltimoItem( RegExp('['+ operadores() +']$','g') , elem  ) 
  }
 }  

 function operadores(){ 
  return Array.prototype.map.call( $buttonOperacoes , function( operador ){
    return  '\\'+ operador.innerHTML;
  } ).join('')
 }

 function  removeUltimoItem(regex , elem){
  if( regex.test( $input.value ) )
    $input.value  = $input.value.replace(regex , elem.innerHTML );
  else
    $input.value+= elem.innerHTML;
 }
 
 function atribuirClear(){
     $input.value = 0;
 }

 function atribuirResultado(){
  var value   = $input.value;
  if( !!ordemAritmetica( $input.value ) )
     $input.value = value.replace( ordemAritmetica( value ) , doOperations )
  else
     return 'Trabalho finalizado.';
  atribuirResultado();
 }

 function  ordemAritmetica(value){
 var primeiraOrdem = RegExp( '([-]?\\d+)([x÷])(\\d+)','g');
 var segundaOrdem  = RegExp( '([-]?\\d+)([+-])(\\d+)','g');
 if(primeiraOrdem.test( value )) 
    return  primeiraOrdem
 else if(segundaOrdem.test( value ))
    return segundaOrdem;
  return false; 
 }
 
 function doOperations( regex , firstValue , operator ,lastValue ){
     switch(operator) {
      case '+':
        return Number(firstValue) + Number(lastValue);
      case '-':
        return Number(firstValue) - Number(lastValue);
      case 'x':
        return Number(firstValue) * Number(lastValue);
      case '÷':
        return Number(firstValue) / Number(lastValue);
    }
 }
  
 initialize();
 
} )( window ,  document )