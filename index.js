const express = require('express')
const app = express()
const porta = 3000;

app.use(express.json())

let tarefas = []
let tipoStatus = ['Aberto', 'Pendente', 'Finalizado']

app.post('/tasks', (req, res) => {
  const { titulo, descricao, status } = req.body

  if (!titulo || !descricao || !status) {
    return res.status(400).json({ erro: 'Título, descrição e status são obrigatórios.' })
  }
  
  if (!tipoStatus.includes(status)) {
    return res.status(400).json({erro: 'Status preenchido não existe.'})
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo,
    descricao,
    status,
    createdAt: new Date()
  };

  tarefas.push(novaTarefa)

  res.status(201).json({ mensagem: 'Tarefa criada com sucesso', tarefa: novaTarefa })
});

app.get('/tasks', (req, res) => {
    res.send(tarefas)
    console.log(tarefas)
})

app.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)

    const tarefa = tarefas.find((t) => t.id === id)

    if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa não encontrada.' })
    }

    res.json(tarefa)
})

app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const { titulo, descricao, status } = req.body

  const tarefa = tarefas.find((t) => t.id === id)

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada.' })
  }

  if (!titulo || !descricao || !status) {
    return res.status(400).json({ erro: 'Título e descrição são obrigatórios.' })
  }

  if (!tipoStatus.includes(status)) {
    return res.status(400).json({erro: 'Status preenchido não existe.'})
  }

  tarefa.titulo = titulo
  tarefa.descricao = descricao
  tarefa.status = status

  res.json({ mensagem: 'Tarefa atualizada com sucesso.', tarefa })
});

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  const index = tarefas.findIndex((t) => t.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada.' })
  }

  tarefas.splice(index, 1);
  res.status(200).json({ mensagem: 'Tarefa removida com sucesso.' })
})

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`)
});
