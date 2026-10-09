import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { SupportContactCard } from './SupportContactCard';
import { faqCategories, supportAvatars } from '@/types/faq';

export function Faq() {
  return (
    <section className="relative flex w-full justify-center py-16">
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex flex-col gap-2 text-center">
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground">FAQ</p>
          <h1 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl xl:text-4xl">
            Your Questions Answered
          </h1>
          <p className="mt-2 text-muted-foreground">
            Need help with something? Here are some of the most common questions we get.
          </p>
        </div>
        <div className="flex w-full flex-col">
          <Accordion type="single" collapsible>
            {faqCategories.flatMap((category) =>
              category.items.map((item) => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger className="md:text-base">{item.question}</AccordionTrigger>
                  <AccordionContent className="md:text-base leading-relaxed text-muted-foreground/90">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))
            )}
          </Accordion>
        </div>
        <SupportContactCard supportAvatars={supportAvatars} />
      </div>
    </section>
  );
}

export default Faq;
