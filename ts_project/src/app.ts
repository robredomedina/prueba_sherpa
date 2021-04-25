import express from 'express';

const app = express();

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


app.get('/', async (req, res) => {
  const allUsers = await prisma.localizacion.findMany()
  console.log(allUsers)
  res.send(allUsers)
})

app.get('/api/:cp/findAll', async (req, res) => {
  const allUsers = await prisma.localizacion.findMany({
    where: {
      cp: {
        equals: req.params.cp
      }
    }
  })
  res.send(allUsers)
});

app.delete('/api/:cp/deleteAll', async (req, res) => {
  const result = await prisma.localizacion.findMany({
    where: {
      cp: {
        equals: req.params.cp
      }
    }
  })
  let users = []
  for (let user of result){
    users.push(user.user)
  }
  res.send(users)
  const deleteUser = await prisma
  .$queryRaw`DELETE FROM user WHERE user.id in (SELECT user FROM localizacion WHERE cp= ${req.params.cp})`

  const deleteLocalizaciones = await prisma
  .$queryRaw`DELETE FROM Localizacion WHERE cp = ${req.params.cp}`

});

app.listen(5001, () => { console.log(`Listening on port 5001`) })

