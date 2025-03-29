// Lista dos Pratos
var prods = [
  { id: 1, nome: "Bife com batata", preco: 30.0 },
  { id: 2, nome: "Coxa de Frango Crocante", preco: 25.0 },
  { id: 3, nome: "Carne de Panela", preco: 22.0 },
  { id: 4, nome: "Farofa", preco: 10.0 },
  { id: 5, nome: "Salada", preco: 8.0 },
  { id: 6, nome: "Torresmo", preco: 12.0 },
];

// Formatador de moeda
const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

// Função para calcular o pedido
function calcularPedido() {
  const nomeCliente = document.querySelector("#inName").value;

  if (!nomeCliente) {
    alert("Por favor, preencha seu nome antes de finalizar o pedido.");
    return;
  }

  let temProduto = false;
  let totalPedido = 0;
  const itensPedido = [];

  // Verificar os produtos selecionados
  document.querySelectorAll(".quantity-input").forEach((input) => {
    const id = input.id;
    const quantidade = parseInt(input.value);

    if (quantidade > 0) {
      temProduto = true;
      const produto = prods.find((p) => p.id == id);
      const subtotal = produto.preco * quantidade;
      totalPedido += subtotal;

      itensPedido.push({
        nome: produto.nome,
        preco: produto.preco,
        quantidade: quantidade,
        subtotal: subtotal,
      });
    }
  });

  if (!temProduto) {
    alert("Por favor, selecione pelo menos um item para seu pedido.");
    return;
  }

  // Exibir o resumo do pedido
  const summaryGreeting = document.getElementById("summaryGreeting");
  const summaryItems = document.getElementById("summaryItems");
  const summaryTotal = document.getElementById("summaryTotal");
  const orderSummary = document.getElementById("orderSummary");

  // Limpar o conteúdo anterior
  summaryGreeting.textContent = "";
  summaryItems.innerHTML = "";

  // Adicionar a saudação
  summaryGreeting.textContent = `Olá, ${nomeCliente}!`;

  // Adicionar os itens do pedido
  itensPedido.forEach((item) => {
    const li = document.createElement("li");
    li.className = "summary-item";
    li.innerHTML = `
            <div class="summary-item-details">
              <span class="summary-item-name">${item.nome}</span>
              <span class="summary-item-price">${formatter.format(
                item.preco
              )} × ${item.quantidade}</span>
            </div>
            <span class="summary-item-total">${formatter.format(
              item.subtotal
            )}</span>
          `;
    summaryItems.appendChild(li);
  });

  // Adicionar o total
  summaryTotal.textContent = `Total: ${formatter.format(totalPedido)}`;

  // Mostrar o resumo com animação
  orderSummary.classList.add("visible");

  // Rolar até o resumo
  orderSummary.scrollIntoView({ behavior: "smooth" });
}

// Evento para os botões de quantidade
document.addEventListener("DOMContentLoaded", function () {
  // Mascarar o campo de telefone
  $("#inPhone").mask("(00) 0 0000-0000");

  // Adicionar eventos aos botões de quantidade
  document.querySelectorAll(".minus, .plus").forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const input = document.getElementById(id);
      let value = parseInt(input.value);

      if (this.classList.contains("plus")) {
        value++;
      } else if (this.classList.contains("minus") && value > 0) {
        value--;
      }

      input.value = value;
    });
  });

  // Evento para o botão de finalizar pedido
  document
    .querySelector(".btn-calculate")
    .addEventListener("click", calcularPedido);
});
