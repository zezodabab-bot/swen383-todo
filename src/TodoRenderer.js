// src/TodoRenderer.js
export class TodoRenderer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  renderPendingRows(service) {
    let html = '';
    for (const task of service.tasks) {
      if (task.completed) continue;
      html += buildTaskRow(task.id, task.desc, task.completed, task.priority, task.createdAt, true);
    }
    return html;
  }

  renderCompletedRows(service) {
    let html = '';
    for (const task of service.tasks) {
      if (!task.completed) continue;
      html += buildTaskRow(task.id, task.desc, task.completed, task.priority, task.createdAt, true);
    }
    return html;
  }

  render(service, justAddedId) {
    if (!this.container) return;

    const pendingHtml = this.renderPendingRows(service);
    const completedHtml = this.renderCompletedRows(service);

    let oldestPendingLabel = 'none';
    for (const task of service.tasks) {
      if (!task.completed) {
        oldestPendingLabel = task.desc;
        break;
      }
    }

    this.container.innerHTML =
      `<p class="status">${service.getWorkloadSummary()} - oldest: ${oldestPendingLabel}</p>` +
      '<h2 class="section-title">To do</h2>' +
      `<ul>${pendingHtml || '<li>Nothing pending. Add a task above.</li>'}</ul>` +
      '<h2 class="section-title">Completed</h2>' +
      `<ul>${completedHtml || '<li>Nothing completed yet.</li>'}</ul>`;

    const toggleButtons = this.container.querySelectorAll('[data-toggle]');
    for (const btn of toggleButtons) {
      btn.addEventListener('click', () => {
        service.toggleComplete(Number(btn.dataset.toggle));
        this.render(service);
      });
    }

    const deleteButtons = this.container.querySelectorAll('[data-delete]');
    for (const btn of deleteButtons) {
      btn.addEventListener('click', () => {
        service.deleteTask(Number(btn.dataset.delete));
        this.render(service);
      });
    }

    if (justAddedId) {
      const row = this.container.querySelector(`[data-row="${justAddedId}"]`);
      if (row) {
        row.classList.add('flash');
        setTimeout(() => row.classList.remove('flash'), 1500);
      }
    }

    document.title = `Todo (${service.tasks.filter(t => !t.completed).length})`;
  }
}

function buildTaskRow(id, desc, completed, priority, createdAt, showActions) {
  // Keep the exact body from your original Week 1/2 todo.js file
}