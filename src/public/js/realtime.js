(function(){
  if (!window.socket) {
    window.socket = io();
  }
  const socket = window.socket;

  socket.on('productsUpdated', (productos) => {
    const ul = document.getElementById('productsList');
    if (!ul) return;
    ul.innerHTML = '';
    productos.forEach(p => {
      const li = document.createElement('li');
      li.dataset.id = p._id || p.id || '';
      li.textContent = `${p.title || p.name || 'No title'} - $${p.price || 0} `;
      const btn = document.createElement('button');
      btn.textContent = 'Eliminar';
      btn.className = 'delBtn';
      li.appendChild(btn);
      ul.appendChild(li);
    });
  });

  socket.on('error', (err) => {
    console.error('Server error event:', err);
  });

  const addForm = document.getElementById('addProductForm');
  if (addForm) {
    addForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const form = e.target;
      const product = {
        title: form.title.value,
        price: Number(form.price.value)
      };
      socket.emit('newProduct', product);
      form.reset();
    });
  }

  const productsContainer = document.getElementById('productsList');
  if (productsContainer) {
    productsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('delBtn')) {
        const li = e.target.closest('li');
        const id = li && li.dataset && li.dataset.id ? li.dataset.id : null;
        if (!id) return;
        socket.emit('deleteProduct', id);
      }
    });
  }

  window.addProduct = function(data) {
    socket.emit('newProduct', data);
  }

  window.deleteProduct = function(id) {
    socket.emit('deleteProduct', id);
  }
})();
