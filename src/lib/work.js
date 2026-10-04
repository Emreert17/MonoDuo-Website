// Add further case studies to this array; the Work section renders each one.
export const caseStudies = [
  {
    slug: "calm-influence-method",
    client: "Mike",
    category: "Parenting",
    status: "Early pilot",
    title: "A calmer answer to an everyday parenting struggle.",
    summary:
      "Mike's audience is made up largely of parents worn down by repeated arguments, reminders and everyday resistance from their children. Together we turned that recurring struggle into a focused digital product.",
    product: {
      name: "Less Asking, More Connection",
      subtitle: "The Calm Influence Method",
      format: "A 21-day digital programme",
      audience: "For parents of strong-willed children, ages 4–9",
      // width / height are the file's own pixel size, so the cover keeps its aspect ratio.
      image: {
        src: "/ProductImg.png",
        width: 555,
        height: 736,
        alt: "Less Asking, More Connection — The Calm Influence Method",
      },
    },
    phases: [
      {
        title: "Audience Research",
        body: "We studied what parents around Mike's content kept describing: the same arguments, the same reminders, the same daily resistance.",
      },
      {
        title: "Product Development",
        body: "With Mike, we shaped that pattern into a 21-day ebook programme for parents of strong-willed children aged 4–9.",
      },
      {
        title: "Launch",
        body: "We prepared the positioning and launch structure, and the product was introduced to Mike's audience as a small pilot.",
      },
      {
        title: "Initial Validation",
        body: "The pilot brought in its first customers: an early signal that the problem is real, and a base to learn from.",
      },
    ],
    result: {
      value: "3",
      label: "customers from the first pilot",
      note: "A small first test, not a revenue story. It shows the process working end to end, and gives us real feedback for the next iteration.",
    },
  },
];
