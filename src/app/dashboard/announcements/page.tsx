import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { announcements } from '@/lib/data';
import { format } from 'date-fns';

export default function AnnouncementsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
        <p className="text-muted-foreground">Important updates and notifications from your institution.</p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {announcements.map((ann) => (
          <AccordionItem key={ann.id} value={`item-${ann.id}`}>
            <AccordionTrigger className="text-left hover:no-underline">
              <div className="flex flex-col">
                <span className="font-semibold text-lg">{ann.title}</span>
                <span className="text-sm text-muted-foreground">
                  {ann.author} &middot; {format(new Date(ann.date), 'MMMM d, yyyy')}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose prose-sm max-w-none text-foreground/80">
                {ann.content}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
