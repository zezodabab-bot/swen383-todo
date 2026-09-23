export class TodoService {
  constructor(storage) {
    this.tasks = [];
    this.storage = storage;
    this.loadTasks();
  }

  loadTasks() {
    this.tasks = this.storage.load();
  }

  saveTasks() {
    this.storage.save(this.tasks);
  }

  addTask(description, type) {
    const trimmed = description.trim();

    if (trimmed.length < 3) {
      alert('Task needs at least a few characters.');
      return false;
    }

    if (this.tasks.length >= 20) {
      console.warn(
        'This list is getting long - consider clearing completed tasks.'
      );
    }

    const task = {
      id: Date.now(),
      desc: trimmed,
      completed: false,
      priority: 'normal',
      createdAt: new Date().toLocaleTimeString()
    };

    if (type === 'urgent') {
      task.priority = 'high';
      task.desc = `[URGENT] ${trimmed}`;
    }

    this.tasks.push(task);
    this.saveTasks();

    return true;
  }

  toggleComplete(id) {
    const task = this.tasks.find(t => t.id === id);

    if (!task) return;

    task.completed = !task.completed;
    this.saveTasks();
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.saveTasks();
  }
}