const express = require('express');
const app = express();
const porta = 3000;

app.use(express.json());

let tarefas = [];

app.post('/tasks', (req, res) => {
  const { titulo, descricao } = req.body;

  if (!titulo || !descricao) {
    return res.status(400).json({ erro: 'Título e descrição são obrigatórios.' });
  }

  const novaTarefa = {
    id: tarefas.length + 1,
    titulo,
    descricao,
    createdAt: new Date()
  };

  tarefas.push(novaTarefa);

  res.status(201).json({ mensagem: 'Tarefa criada com sucesso', tarefa: novaTarefa });
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

app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = tarefas.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada.' });
  }

  tarefas.splice(index, 1);
  res.status(200).json({ mensagem: 'Tarefa removida com sucesso.' });
})

app.listen(porta, () => {
  console.log(`Servidor rodando em http://localhost:${porta}`);
});
