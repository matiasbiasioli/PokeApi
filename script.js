let pokeCardsContainer = document.querySelector(".pokeCardsContainer")
let buttonsHeader = document.querySelectorAll(".btn")
let pokeId = document.querySelector('.pokeId')

for (let pokemon = 1; pokemon <= 251; pokemon++) {
  fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
    .then(response => response.json())
    .then(data => {
      mostrarTodo(data)
    })
}

function mostrarTodo(poke) {
  let pokeCard = document.createElement('div')
  pokeCard.classList.add('pokeCard')
  let types = poke.types
  let tipos = types.map(type =>
    `<p class= " ${type.type.name} type">${type.type.name}</p>`)
  tipos = tipos.join('')

  let pokemonId = poke.id.toString()
  if (pokemonId.length == 1) {
    pokemonId = "00" + pokemonId
  } else if (pokemonId.length == 2) {
    pokemonId = "0" + pokemonId
  }
  pokeCard.innerHTML = `
  <div>
    <h2 class="pokeName">${poke.name}</h2>
  </div>
  <div>
    <img
      class="pokeImage"
      src="${poke.sprites.other["official-artwork"].front_default}"
      alt=""
    />
  </div>
  <div class="pokeTypeContainer">
    ${tipos}
  </div>
  <div class="pokeId">#${pokemonId}</div>`
  pokeCardsContainer.appendChild(pokeCard)
}

buttonsHeader.forEach(btn => btn.addEventListener('click', (Event) => {
  const categorias = Event.currentTarget.id
  pokeCardsContainer.innerHTML = ""
  for (let pokemon = 1; pokemon <= 251; pokemon++) {
    fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon)
      .then(response => response.json())
      .then(data => {
        const busquedaPorCategoria = data.types.map(type => type.type.name);
        if (categorias === "verTodos") {
          mostrarTodo(data)
        }
        else if ((busquedaPorCategoria.some(tipo => tipo.includes(categorias)))) {
          mostrarTodo(data)
        }
      })
  }
}))


