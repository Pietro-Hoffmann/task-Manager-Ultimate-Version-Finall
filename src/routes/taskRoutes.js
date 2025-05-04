const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - name
 *         - dueDate
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único da tarefa
 *         name:
 *           type: string
 *           description: Nome da tarefa
 *         description:
 *           type: string
 *           description: Descrição detalhada da tarefa
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Data de prazo da tarefa
 *         completed:
 *           type: boolean
 *           description: Status de conclusão da tarefa
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação da tarefa
 *       example:
 *         id: 1
 *         name: Comprar mantimentos
 *         description: Comprar leite, ovos e pão
 *         dueDate: 2025-05-10
 *         completed: false
 *         createdAt: 2025-05-01T14:30:00Z
 */

// Rotas de visualização
router.get('/', TaskController.index);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Retorna todas as tarefas
 *     description: Retorna uma lista de todas as tarefas. Pode ser filtrada por status.
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *           enum: [all, pending, completed, overdue]
 *         description: Filtro para as tarefas
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get('/api/tasks', TaskController.apiGetAllTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtém uma tarefa específica
 *     description: Retorna os detalhes de uma tarefa específica com base no ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Detalhes da tarefa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada
 */
router.get('/api/tasks/:id', TaskController.apiGetTask);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     description: Adiciona uma nova tarefa ao sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - dueDate
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da tarefa
 *               description:
 *                 type: string
 *                 description: Descrição detalhada da tarefa
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Data de prazo da tarefa
 *     responses:
 *       201:
 *         description: Tarefa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Dados inválidos fornecidos
 */
router.post('/api/tasks', TaskController.apiCreateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Atualiza uma tarefa existente
 *     description: Atualiza os dados de uma tarefa existente com base no ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome da tarefa
 *               description:
 *                 type: string
 *                 description: Descrição detalhada da tarefa
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 description: Data de prazo da tarefa
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Dados inválidos fornecidos
 *       404:
 *         description: Tarefa não encontrada
 */
router.put('/api/tasks/:id', TaskController.apiUpdateTask);

/**
 * @swagger
 * /api/tasks/{id}/complete:
 *   patch:
 *     summary: Marca uma tarefa como concluída
 *     description: Atualiza o status de uma tarefa para concluída
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       200:
 *         description: Tarefa marcada como concluída
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Tarefa não encontrada
 */
router.patch('/api/tasks/:id/complete', TaskController.apiCompleteTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Remove uma tarefa
 *     description: Exclui uma tarefa do sistema com base no ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da tarefa
 *     responses:
 *       204:
 *         description: Tarefa excluída com sucesso
 *       404:
 *         description: Tarefa não encontrada
 */
router.delete('/api/tasks/:id', TaskController.apiDeleteTask);

module.exports = router;