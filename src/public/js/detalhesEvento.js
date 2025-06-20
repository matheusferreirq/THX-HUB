const notification = document.getElementById("notification");

function showNotification(message) {
  notification.textContent = message;
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

async function confirmarPresenca() {
  try {
    const res = await fetch(`/eventos/${eventoId}/convidados/${usuarioLogadoId}/confirmar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      showNotification("Presença confirmada!");
      window.location.reload();
    } else {
      const error = await res.json();
      showNotification(`Erro: ${error.message || 'Não foi possível confirmar'}`);
    }
  } catch (err) {
    console.error(err);
    showNotification("Erro na conexão.");
  }
}

// Mostra o modal de confirmação
function deletarEvento() {
  document.getElementById('modal-confirm-delete').classList.add('active');
}

// Esconde o modal
function fecharModalDelete() {
  document.getElementById('modal-confirm-delete').classList.remove('active');
}

// Confirma a deleção
async function confirmarDeleteEvento() {
  try {
    const res = await fetch(`/eventos/${eventoId}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      showNotification("Evento deletado com sucesso!");
      setTimeout(() => {
        window.location.href = '/eventos';
      }, 1500);
    } else {
      showNotification("Erro ao deletar evento.");
    }
  } catch (err) {
    console.error(err);
    showNotification("Erro na conexão.");
  }
  fecharModalDelete();
}

async function adicionarOrganizador(event) {
  event.preventDefault();
  const username = document.getElementById('usernameOrganizador').value;
  const papel = document.getElementById('papelOrganizador').value;

  try {
    const res = await fetch(`/organizadores/${eventoId}/adicionar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, papel })
    });

    if (res.ok) {
      showNotification("Organizador adicionado com sucesso!");
      window.location.reload();
    } else {
      const error = await res.json();
      showNotification(`Erro: ${error.message || 'Tente novamente'}`);
    }
  } catch (err) {
    console.error(err);
    showNotification("Erro na conexão com o servidor.");
  }
}

async function convidarUsuario(usuarioId) {
  try {
    const res = await fetch(`/eventos/${eventoId}/convidados`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_convidado: usuarioId })
    });

    if (res.ok) {
      showNotification("Usuário convidado com sucesso!");
      window.location.reload();
    } else {
      const error = await res.json();
      showNotification(`Erro: ${error.message || 'Tente novamente'}`);
    }
  } catch (err) {
    console.error(err);
    showNotification("Erro na conexão com o servidor.");
  }
}

// Eventos dos botões do modal
document.addEventListener('DOMContentLoaded', function() {
  const btnCancel = document.getElementById('btn-cancel-delete');
  const btnConfirm = document.getElementById('btn-confirm-delete');
  if (btnCancel && btnConfirm) {
    btnCancel.onclick = fecharModalDelete;
    btnConfirm.onclick = confirmarDeleteEvento;
  }
});