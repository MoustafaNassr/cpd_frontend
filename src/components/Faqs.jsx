import { Container } from '@/components/Container'

const faqs = [
  [
    {
      question: "How can I trust the quality of the CPD activities recommended?",
      answer:
       "Our platform's reputation relies on the quality of our CPD recommendations. It's in our best interest to ensure they're top-notch. Our users' success and feedback stand as a testament to our reliability.",
    },
   {
    "question": "Is sharing my CPD activities with others within the platform compliant with professional standards?",
    "answer": "Absolutely. Our platform is designed to facilitate the sharing of professional development activities in a way that respects privacy and adheres to professional standards. It's about community-driven growth and learning."
  },
     {
    "question": "Will my personal data be secure with your CPD log app?",
    "answer": "Yes, protecting your personal information is paramount to us. We employ state-of-the-art security measures to ensure your data is handled with the utmost care and confidentiality."
  },
  ],
  [
     {
    "question": "Are the CPD opportunities tailored to my profession?",
    "answer": "Yes, our platform takes into account your professional background and interests to tailor CPD opportunities that are most relevant and beneficial for your career development."
  },
  {
    "question": "How is the CPD log app accessible to professionals worldwide?",
    "answer": "Our platform is designed to be globally accessible, ensuring professionals around the world can track and find CPD opportunities, regardless of their location, with ease."
  },
  {
    "question": "Is there any age restriction for using the CPD log application?",
    "answer": "The app is aimed at professionals, so while there's no specific age restriction, it is designed for individuals actively engaged in their professional careers or education."
  },

  ],
  [
    {
    "question": "How did your CPD log app get approved for app stores?",
    "answer": "Our app meets all the guidelines and standards for educational and professional development applications, ensuring a smooth approval process and reliability for our users."
  },
  {
    "question": "How do I handle CPD points and evidence for professional audits?",
    "answer": "Our app simplifies this process by keeping a detailed record of your CPD activities, complete with evidence, ready to be presented during professional audits or reviews."
  },
  {
    "question": "How can I become a contributor of CPD content?",
    "answer": "Reach out to us with your credentials and the type of content you'd like to contribute. Upon approval, we'll guide you on how to create and share valuable CPD materials with our community."
  }
  ],
]

export function Faqs() {
  return (
    <section
      id="faqs"
      aria-labelledby="faqs-title"
      className="border-t border-gray-200 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faqs-title"
            className="text-3xl font-medium tracking-tight text-gray-900"
          >
            Frequently asked questions
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            If you have anything else you want to ask,{' '}
            <a
              href="mailto:info@Apexnile.com"
              className="text-gray-900 underline"
            >
              reach out to us
            </a>
            .
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="space-y-10">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="text-lg font-semibold leading-6 text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-gray-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
