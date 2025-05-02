let tasks = [];
let taskIdCounter = 1;


const TaskModel = {
  
  getAllTasks: () => {
    return tasks;
  },

  
  getTaskById: (id) => {
    return tasks.find(task => task.id === parseInt(id));
  },

 
  createTask: (name, description, dueDate) => {
    const newTask = {
      id: taskIdCounter++,
      name,
      description,
      dueDate: new Date(dueDate),
      completed: false,
      createdAt: new Date()
    };
    tasks.push(newTask);
    return newTask;
  },


  updateTask: (id, updates) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) return null;
    
   
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...updates,
      ...(updates.dueDate ? { dueDate: new Date(updates.dueDate) } : {})
    };
    
    return tasks[taskIndex];
  },

  
  completeTask: (id) => {
    return TaskModel.updateTask(id, { completed: true });
  },

 
  deleteTask: (id) => {
    const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
    if (taskIndex === -1) return false;
    
    tasks.splice(taskIndex, 1);
    return true;
  },

  
  filterTasks: (filter) => {
    const now = new Date();
    
    switch (filter) {
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'overdue':
        return tasks.filter(task => 
          !task.completed && task.dueDate < now
        );
      default:
        return tasks;
    }
  }
};

module.exports = TaskModel;