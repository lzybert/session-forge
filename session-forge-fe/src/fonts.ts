// app/fonts.ts
import { Afacad } from 'next/font/google'

const afacad = Afacad({
  subsets: ['latin'],
  variable: '--font-afacad',
})

export const fonts = {
  afacad,
}