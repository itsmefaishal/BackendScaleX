const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

fetch(`http://localhost:3000/tokens/${id}`)
  .then((response) => response.json())
  .then((data) => {
    const detailsContainer = document.getElementById("token-details-container");
    document.querySelector("title").textContent = data.name + " Details";
    document.querySelector("h1").textContent = data.name + " Details";

    detailsContainer.innerHTML = `
        <p>ID: <span id="token-id">${data._id}</span></p>
        <p>Name: <span id="token-name">${data.name}</span> <button onclick="editField('name')">Edit</button></p>
        <p>Symbol: <span id="token-symbol">${data.symbol}</span> <button onclick="editField('symbol')">Edit</button></p>
        <p>Price: <span id="token-price">${data.price}</span> <button onclick="editField('price')">Edit</button></p>
        <p>Volume: <span id="token-volume">${data.volume}</span> <button onclick="editField('volume')">Edit</button></p>
        <p>Address: <span id="token-address">${data.address}</span></p>
        `;
  })
  .catch((error) => {
    console.error({ message: error.message });
  });

function editField(fieldName) {
  document.getElementById("edit-form").style.display = "block";

  const currentValue = document.getElementById(
    `token-${fieldName}`
  ).textContent;
  document.getElementById("edit-value").value = currentValue;

  document.getElementById("edit-form").dataset.fieldName = fieldName;
}

function submitEditedData() {
  // Put method function

  const newValue = document.getElementById("edit-value").value;
  const fieldName = document.getElementById("edit-form").dataset.fieldName;

  document.getElementById(`token-${fieldName}`).textContent = newValue;

  document.getElementById("edit-form").style.display = "none";

  const updatedData = {};
  updatedData[fieldName] = newValue;

  fetch(`http://localhost:3000/tokens/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Some error occured");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Updated successfully:", data);
    })
    .catch((error) => {
      console.error("Error updating data:", error);
    });
}

async function deleteToken() {
  //delete method

  await fetch(`http://localhost:3000/tokens/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Some Error occured");
      }

      return res.json();
    })
    .then((data) => {
      alert(data.message);
      window.history.back();
    })
    .catch((error) => {
      console.error({ message: error.message });
    });
}
