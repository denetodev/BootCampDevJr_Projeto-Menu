// Lista dos Pratos
var prods = [
  { id: 1, nome: "Bife com batata", preco: 30.0 },
  { id: 2, nome: "Coxa de Frango Crocante", preco: 25.0 },
  { id: 3, nome: "Carne de Panela", preco: 22.0 },
  { id: 4, nome: "Farofa", preco: 10.0 },
  { id: 5, nome: "Salada", preco: 8.0 },
  { id: 6, nome: "Torresmo", preco: 12.0 },
];

function calcularPedido() {
  var quantities = document.querySelectorAll(".quantity");
  var nomeCliente = document.querySelector("#inName").value; // Obter o valor do campo de entrada
  var respNome = document.querySelector(".resp1");
  var dadosPedido = document.querySelector(".resp2");
  var respPedido = document.querySelector(".resp3");
  var precoFinal = document.querySelector(".resp4");
  var total = 0;

  // Limpar os conteúdos anteriores
  respNome.innerHTML = "";
  respPedido.innerHTML = "";

  // Adicionar o nome do cliente
  respNome.innerHTML = `Caro(a) <strong>${nomeCliente}</strong>,`;
  dadosPedido.innerHTML = `</br>
Seguem os dados do seu pedido.
</br></br>
O seu pedido é:
</br></br>`;
  quantities.forEach((form) => {
    var id = form.querySelector(".input-text").id;
    var quantidade = parseInt(form.querySelector(".input-text").value, 10) || 0;
    var prato = prods.find((p) => p.id == id);

    if (prato && quantidade > 0) {
      respPedido.innerHTML += `<li>Prato: ${
        prato.nome
      } - Preço unitário: R$ ${prato.preco.toFixed(
        2
      )} - Quantidade: ${quantidade} - Total: R$ ${(
        quantidade * prato.preco
      ).toFixed(2)}</li></br>`;
      total += prato.preco * quantidade;
    }
  });
  // Mostrar o total

  var formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  precoFinal.innerHTML = `<h2>Preço Final: R$ ${formatter.format(
    total.toFixed(2)
  )}</h2>`;
}

// Adicionar eventos após o DOM estar carregado
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".btn-calc").addEventListener("click", calcularPedido);

  // Função para atualizar a quantidade
  function updateQuantity(element, delta) {
    const input = element.parentElement.querySelector(".input-text");
    let quantidade = parseInt(input.value, 10);
    quantidade = Math.max(0, quantidade + delta); // Não permitir quantidade negativa
    input.value = quantidade;
  }

  // Adicionar eventos de clique aos botões "+" e "-"
  document.querySelectorAll(".minus").forEach((button) => {
    button.addEventListener("click", function () {
      updateQuantity(this, -1);
    });
  });

  document.querySelectorAll(".plus").forEach((button) => {
    button.addEventListener("click", function () {
      updateQuantity(this, 1);
    });
  });
});
