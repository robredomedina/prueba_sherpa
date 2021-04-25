import express from 'express';

const app = express();

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


app.get('/api/:cp/findAll', async (req, res) => {
  const allUsers = await prisma.localizacion.findMany({
    where: {
      cp: {
        equals: req.params.cp
      }
    }
  })
  res.send({
    "error" : 0,
    "description" : "",
    "data" : allUsers
  })
});

app.delete('/api/:cp/deleteAll', async (req, res) => {
  const deleteUser = await prisma
  .$queryRaw`DELETE FROM user WHERE user.id in (SELECT user FROM localizacion WHERE cp= ${req.params.cp})`

  const deleteLocalizaciones = await prisma
  .$queryRaw`DELETE FROM Localizacion WHERE cp = ${req.params.cp}`

  res.send({
    "error" : 0,
    "description" : "",
    "data" : `Users from cp ${req.params.cp} deleted correctly` 
  })
});

app.listen(5001, () => { console.log(`Listening on port 5001`) })

