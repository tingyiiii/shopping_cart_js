document.addEventListener('DOMContentLoaded', () => {
  const deleteBtn = document.querySelectorAll('.delete-btn');
  deleteBtn.forEach((deleteBtn) => {
    deleteBtn.addEventListener('click', (e) => {
      const row = e.currentTarget.parentElement.parentElement;
      row.remove();
    })
  })
})