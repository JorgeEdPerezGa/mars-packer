const renderItems = (item) => {
  $('.card-section').append(`
    <div class="card" id="${item.id}">
      <p>${item.item}</p>
      <input type="checkbox" id="pack">packed<br>
    <button class="deleteItem">delete</button>
  </div>`)
}

const getItems = async() => {
  const url = '/api/v1/items';
  const getItems = await fetch(url);
  const items = await getItems.json();

  return items.forEach(item => {
    renderItems(item)
  })
}

const enableSubmit = () => {
  itemInput.value.length !== 0
  ? submitButton.disabled = false
  : submitButton.disabled = true;
}

const handleSubmit = async () => {
  const item = {
    'item': itemInput.value
  }

  try {
    const url = '/api/v1/items';
    const postItem = await fetch(url, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if(postItem.status > 299) {
      throw new Error('could not post item')
      } else { await postItem.json() }
  } catch (error) { throw (error) }
  history.go(0);
}

const handleDelete = (event) => {
  if(event.target.classList.contains('deleteItem')) {
    const parent = event.target.parentNode;
    const id = parent.getAttribute('id');
    const url = `/api/v1/items/${id}`;

    fetch(url, {
      method: "DELETE"
    })
    .then(response => console.log('deleted'))
    .catch(error => console.log('error'))
    parent.remove();
  }
}

window.onload = () => getItems();
itemInput.addEventListener('keyup', enableSubmit)
submitButton.addEventListener('click', handleSubmit);
$('.card-section').on('click', '.card', '.deleteItem', handleDelete)
