fetch("http://localhost:3000/tokens")
  .then((response) => response.json())
  .then((data) => {
    const dataBody = document.getElementById("data-body");

    data.forEach((item) => {
      const id = item._id;
      const name = item.name;
      const price = item.price;
      const volume = item.volume;

      const row = document.createElement("tr");
      row.classList.add("row-data");
      row.innerHTML = `
      <tr>
      <td>${name}</td>
      <td>${price}</td>
      <td>${volume}</td>
      <td><button onclick="viewDetails('${id}')">view details</button></td>
      </tr>
    `;
      dataBody.appendChild(row);
    });
  })
  .catch((error) => {
    console.error({ message: error.message });
  });

const viewDetails = (id) => {
  window.location.href = `details.html?id=${id}`;
};

function submitForm() {
  const name = document.getElementById("name");
  const symbol = document.getElementById("symbol");
  const price = document.getElementById("price");
  const address = document.getElementById("address");
  const volume = document.getElementById("volume");

  const tokenData = {
    name: name.value,
    symbol: symbol.value,
    price: price.value,
    address: address.value,
    volume: volume.value,
  };

  fetch("http://localhost:3000/tokens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tokenData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Token added in the database");
      name.value = "";
      symbol.value = "";
      price.value = "";
      address.value = "";
      volume.value = "";
    })
    .catch((error) => {
      console.error({ message: error.message });
    });
}
