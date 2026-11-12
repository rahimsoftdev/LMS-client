import axios from 'axios'
import type { Lecture } from '@/types/lecture'

const LECTURES_URL = `${import.meta.env.BASE_URL}lectures.json`

export async function getLectures(): Promise<Lecture[]> {
  const { data } = await axios.get<Lecture[]>(LECTURES_URL)
  return data
}
