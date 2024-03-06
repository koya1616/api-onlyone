import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Bindings = {
  R2_BUCKET: R2Bucket
}

const TheBestFrameworkIsHono = new Hono<{ Bindings: Bindings }>()

TheBestFrameworkIsHono.use('/*', cors({
  origin: ['http://localhost:7776', 'https://www.onlyone-restaurant.com'],
}))

TheBestFrameworkIsHono.get('/', (healthCheckOf) => {
  return healthCheckOf.text('なぜ君はこれを見ているのだ。Hono!')
})

TheBestFrameworkIsHono.post('/upload/:id/:key', async (c) => {
  const formData = await c.req.formData();
  const uploadedImage = await c.env.R2_BUCKET.put(`${c.req.param('id')}/${c.req.param('key')}`, formData.get('file'))
  return c.json(`${uploadedImage?.key}`)
})

TheBestFrameworkIsHono.get('/restaurants/:id/images', async (c) => {
  const list = await c.env.R2_BUCKET.list()
  const objects = list.objects.filter((o) => o.key.startsWith(`${c.req.param('id')}/`)).map((o) => o.key)
  return c.json(objects)
})

TheBestFrameworkIsHono.delete('/restaurants/:id/:key/images', async (c) => {
  await c.env.R2_BUCKET.delete(`${c.req.param('id')}/${c.req.param('key')}`)
  return c.json("OK")
})

export default TheBestFrameworkIsHono
