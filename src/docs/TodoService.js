export class TodoService {
  constructor(storage) {
    this.storage = storage;
    this.tasks = this.storage.load();
  }

  addTask(description, type) {
    const trimmed = description.trim();

    if (trimmed.length < 3) {
      alert('Task needs at least a few characters.');
      return false;
    }

    if (this.tasks.length >= 20) {
      console.warn('This list is getting long - consider clearing completed tasks.');
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
    this.storage.save(this.tasks);

    return task;
  }

  toggleComplete(id) {
    const task = this.tasks.find(t => t.id === id);

    if (!task) return false;

    task.completed = !task.completed;
    this.storage.save(this.tasks);

    return true;
  }

  deleteTask(id) {
    const originalLength = this.tasks.length;

    this.tasks = this.tasks.filter(t => t.id !== id);

    if (this.tasks.length === originalLength) {
      return false;
    }

    this.storage.save(this.tasks);

    return true;
  }
}