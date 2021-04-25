import express from 'express';

const app = express();

import { localizacion, Prisma, PrismaClient } from '@prisma/client'

const prisma : PrismaClient = new PrismaClient()


app.get('/api/:cp/findAll', async (req: any, res: any) => {
  const allUsers : localizacion[] = await prisma.localizacion.findMany({
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
  const deleteUser : any = await prisma
  .$queryRaw`DELETE FROM user WHERE user.id in (SELECT user FROM localizacion WHERE cp= ${req.params.cp})`

  const deleteLocalizaciones : any = await prisma
  .$queryRaw`DELETE FROM Localizacion WHERE cp = ${req.params.cp}`

  res.send({
    "error" : 0,
    "description" : "",
    "data" : `Users from cp ${req.params.cp} deleted correctly` 
  })
});

app.get('/api/usuariosporcp', async (req: any, res: any) => {
  const count_per_cp = await prisma.localizacion.groupBy({
    by: ['cp'],
    count: true,
    
  })
  res.send({
    "error" : 0,
    "description" : "",
    "data" : count_per_cp
  })
});

app.listen(5001, () => { console.log(`Listening on port 5001`) })

