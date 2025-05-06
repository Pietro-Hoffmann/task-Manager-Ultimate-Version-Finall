const TaskModel = require('../models/taskModel');

const TaskController = {
  
  index: (req, res) => {
    const filter = req.query.filter || 'all';
    const tasks = filter === 'all' 
      ? TaskModel.getAllTasks() 
      : TaskModel.filterTasks(filter);
    
    res.render('index', { 
      tasks, 
      activeFilter: filter,
      title: 'Gerenciador de Tarefas'
    });
  },

  
  apiGetAllTasks: (req, res) => {
    const filter = req.query.filter || 'all';
    const tasks = filter === 'all' 
      ? TaskModel.getAllTasks() 
      : TaskModel.filterTasks(filter);
    
    res.json(tasks);
  },

  
  apiGetTask: (req, res) => {
    const task = TaskModel.getTaskById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    res.json(task);
  },

  
  apiCreateTask: (req, res) => {
    const { name, description, dueDate } = req.body;
    
   
    if (!name || !dueDate) {
      return res.status(400).json({ 
        error: 'Nome e data de vencimento são obrigatórios' 
      });
    }
    
    const newTask = TaskModel.createTask(name, description, dueDate);
    res.status(201).json(newTask);
  },


  apiUpdateTask: (req, res) => {
    const { name, description, dueDate } = req.body;
    
  
    if (name === undefined && description === undefined && dueDate === undefined) {
      return res.status(400).json({ 
        error: 'Pelo menos um campo deve ser fornecido para atualização' 
      });
    }
    
    const updatedTask = TaskModel.updateTask(req.params.id, req.body);
    
    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    res.json(updatedTask);
  },

  
  apiCompleteTask: (req, res) => {
    const updatedTask = TaskModel.completeTask(req.params.id);
    
    if (!updatedTask) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    res.json(updatedTask);
  },


  apiDeleteTask: (req, res) => {
    const result = TaskModel.deleteTask(req.params.id);
    
    if (!result) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    res.status(204).send();
  }
};

module.exports = TaskController;