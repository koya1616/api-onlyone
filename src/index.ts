import { Hono } from 'hono'
import { restaurants } from './beautiful/restaurants'

const TheBestFrameworkIsHono = new Hono()

TheBestFrameworkIsHono.get('/', (healthCheckOf) => {
  return healthCheckOf.text('なぜ君はこれを見ているのだ。Hono!')
})

TheBestFrameworkIsHono.get('/restaurants', (c) => {
  return c.json({ restaurants: restaurants }, 200)
})

TheBestFrameworkIsHono.get('/restaurants/:id', (c) => {
  const id = c.req.param('id')
  const restaurant = restaurants.find((r) => r.id === Number(id))
  return c.json({ restaurant }, 200)
})

export default TheBestFrameworkIsHono
