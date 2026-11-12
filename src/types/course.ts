
export interface Course {
  _id: string
  title: string
  description: string
  price: number
  thumbnailUrl: string
  createdAt?: string
  updatedAt?: string
}

export type CourseWithLectureCount = Course & {
  lectureCount: number
}
