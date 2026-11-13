import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type FaqItem = {
  question: string
  answer: string
}

const faqs: FaqItem[] = [
  {
    question: 'How do I start learning on DataPollex LMS?',
    answer:
      'Go to the Courses page, pick a course you like and open its details. From there you can see all lectures and start watching right away.',
  },
  {
    question: 'Do I need to register to browse courses?',
    answer:
      'You can browse the course list and see course details freely. Some features may require you to log in with your account.',
  },
  {
    question: 'How are the lectures delivered?',
    answer:
      'Every lecture is a video that plays directly on the platform, so you do not need to download anything.',
  },
  {
    question: 'Can I watch a lecture more than once?',
    answer:
      'Yes. You can pause, replay and revisit any lecture whenever you want, at your own pace.',
  },
  {
    question: 'Does it work on mobile and tablet?',
    answer:
      'Yes. The platform is fully responsive and works on mobile, tablet, laptop and desktop screens.',
  },
  {
    question: 'Who adds the courses and lectures?',
    answer:
      'Courses and lectures are created and managed by the admin team, and new content is added regularly.',
  },
]

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section
      aria-labelledby="faq-title"
      className="bg-slate-50 pb-10 md:pb-12 xl:pb-section"
    >
      <div className="container">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700">
            FAQ
          </span>

          <h2
            id="faq-title"
            className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl"
          >
            Frequently asked{' '}
            <span className="text-primary-600">questions</span>
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Quick answers to the things learners ask us the most.
          </p>
        </div>

        {/* Accordion */}
        <div className="mx-auto mt-10  space-y-3 lg:mt-12">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index
            const buttonId = `faq-button-${index}`
            const panelId = `faq-panel-${index}`

            return (
              <div
                key={item.question}
                className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-colors duration-300 ${
                  isOpen ? 'border-primary-200' : 'border-slate-200'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    onClick={() => toggle(index)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset sm:px-6 sm:py-5"
                  >
                    <span
                      className={`text-sm font-semibold sm:text-base ${
                        isOpen ? 'text-primary-700' : 'text-slate-900'
                      }`}
                    >
                      {item.question}
                    </span>

                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        isOpen
                          ? 'bg-primary-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <ChevronDown
                        className={`size-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </h3>

                {/* Smooth open/close using grid rows */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600 sm:px-6 sm:pb-5 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}