const renderItems = (item) => {
  $('.card-section').append(`
    <div class="card">
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
}

const handleDelete = () => {
  console.log('delete');
}

window.onload = () => getItems();
submitButton.addEventListener('click', handleSubmit);
$('.card-section').on('click', '.card', '.deleteItem', handleDelete)
