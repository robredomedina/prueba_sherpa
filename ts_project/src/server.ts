import express, { Application, Request, Response, NextFunction } from 'express';
import { localizacion, PrismaClient } from '@prisma/client'

const prisma: PrismaClient = new PrismaClient()

export default function createServer() {
  const app: Application = express();

  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send("hello world");
  })
  app.get('/api/:cp/findAll', async (req: Request, res: Response) => {
    const allUsers: localizacion[] = await prisma.localizacion.findMany({
      where: {
        cp: {
          equals: req.params.cp
        }
      }
    })
    res.send({
      "error": 0,
      "description": "",
      "data": allUsers
    })
  });
  app.delete('/api/:cp/deleteAll', async (req: any, res: any) => {
    const deleteUser: any = await prisma
      .$queryRaw`DELETE FROM user WHERE user.id in (SELECT user FROM localizacion WHERE cp= ${req.params.cp})`

    const deleteLocalizaciones: any = await prisma
      .$queryRaw`DELETE FROM Localizacion WHERE cp = ${req.params.cp}`

    res.send({
      "error": 0,
      "description": "",
      "data": `Users from cp ${req.params.cp} deleted correctly`
    })
  });
  app.get('/api/usuariosporcp', async (req: any, res: any) => {
    const count_per_cp : any = await prisma.localizacion.groupBy({
      by: ['cp'],
      count: true,
    })
    res.send({
      "error" : 0,
      "description" : "",
      "data" : count_per_cp
    })
  });
  app.get('/api/estadisticos', async (req: any, res:any) => {
    const count_per_cp : any = await prisma.localizacion.groupBy({
      by: ['cp'],
      count: true,
    })
    const mas : any = count_per_cp[0]
    const menos : any = count_per_cp[count_per_cp.length-1]
    const total_usuarios : number = await prisma.localizacion.count()
    const promedio : any = total_usuarios / count_per_cp.length
    const desv_tipica : any = (arr : any[]) =>  {
      return Math.sqrt(
        arr.map((item) => (item.count-promedio)**2)
        .reduce((acc, val) => acc + val, 0) / arr.length)
    }
    const dt : number = desv_tipica(count_per_cp)
    
    res.send({
      "error" : 0,
      "description" : "",
      "data" : {
        "cp más poblado" : mas,
        "cp menos poblado" : menos,
        "promedio por cp" : promedio,
        "desviacion tipica" : dt
      }
    })
  
  
  })

  return app;
}
