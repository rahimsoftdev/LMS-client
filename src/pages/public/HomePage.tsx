
// import { useCourses } from '@/hooks/useCourses'
import Banner from '@/components/public/Banner'
import Faq from '@/components/public/Faq'
import PopulserClass from '@/components/public/PopulserClass'
import WhyChooseUs from '@/components/public/WhyChooseUs'

// type Feature = {
//   icon: typeof BookOpen
//   title: string
//   description: string
// }

// const features: Feature[] = [
//   {
//     icon: BookOpen,
//     title: 'Browse courses',
//     description:
//       'Explore every course published by the admin team, with details and pricing.',
//   },
//   {
//     icon: PlayCircle,
//     title: 'Watch lectures',
//     description:
//       'Open a course, pick a lecture, and stream its embedded video lesson.',
//   },
//   {
//     icon: ShieldCheck,
//     title: 'Admin managed',
//     description:
//       'Courses and lectures are created and maintained from the admin dashboard.',
//   },
// ]


export default function HomePage() {
 

  return (
    <div className=''>
      <Banner/>

     <PopulserClass/>

    <WhyChooseUs/>
    <Faq/>
    </div>
  )
}
