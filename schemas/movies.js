const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required.'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']),
    {
      required_error: 'Movie genre is required.',
      invalid_type_error: 'Movie genre must be an array of enum Genre'
    }
  )
})

function validateMovie (input) {
  return movieSchema.safeParse(input) // método para validar, devuelve un objeto result que va a indicar si hay un error o si hay datos
}

function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input) 
  //el partial hace que todas las propiedades del schema las va a hacer opcionales
  //de forma que si no esta no pasa nada, y si está la valida como la tiene que validar 
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
