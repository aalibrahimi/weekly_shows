import { Timeline } from "@/components/Aceternity/timeline";

export function TimelineDemo() {
  // Rich data with more content for each item
  const data = [
    {
      title: "2023",
      content: (
        <div className="space-y-4 ">
          <p className="text-neutral-800 dark:text-neutral-200">
           Ramada Started
          </p>
          <p className="text-neutral-800 dark:text-neutral-200">
            A special bondo was born
          </p>
          {/* Add images or other rich content */}
          <div className="h-40"></div> {/* Extra space to extend section */}
        </div>
      ),
    },
    {
        title: "2024",
        content: (
          <div className="space-y-4">
            <p className="text-neutral-800 dark:text-neutral-200">
              Blaze ate eggs and bread with ketchup
            </p>
            <p className="text-neutral-800 dark:text-neutral-200">
              Incoming freak level status
            </p>
            {/* Add images or other rich content */}
            <div className="h-40"></div> {/* Extra space to extend section */}
          </div>
        ),
      },
      {
        title: "2025",
        content: (
          <div className="space-y-4">
            <p className="text-neutral-800 dark:text-neutral-200">
              He started to learn how to code
            </p>
            <p className="text-neutral-800 dark:text-neutral-200">
              Created an egyption notes app
            </p>
            {/* Add images or other rich content */}
            <div className="h-40"></div> {/* Extra space to extend section */}
          </div>
        ),
      },
      {
        title: "2026",
        content: (
          <div className="space-y-4">
            <p className="text-neutral-800 dark:text-neutral-200">
             Created the idea of an invoice app
            </p>
            <p className="text-neutral-800 dark:text-neutral-200">
              Need to change this later but the idea is there
            </p>
            {/* Add images or other rich content */}
            <div className="h-40"></div> {/* Extra space to extend section */}
          </div>
        ),
      },

    // Add more entries with rich content
  ];
  
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}