import { birthdayData } from "@/data/birthday";
import { cn } from "@/lib/utils";
import { HeartDivider } from "./ui/HeartDivider";
import { Reveal } from "./ui/Reveal";
import { RichText } from "./ui/RichText";
import { SectionHeading } from "./ui/SectionHeading";

export function BirthdayMessage() {
  const { message } = birthdayData;

  return (
    <div className="text-center">
      <SectionHeading kicker={message.label} title={message.title} />

      <div className="mt-5 flex flex-col items-center gap-3 sm:mt-10 sm:gap-6">
        {message.paragraphs.map((paragraph, i) => (
          <div key={paragraph} className="flex w-full flex-col items-center gap-3 sm:gap-6">
            <Reveal delay={0.1 + i * 0.12} y={12}>
              <p
                className={cn(
                  "font-display leading-[1.4] text-balance text-ink",
                  i === 0 ? "text-[1.2rem] sm:text-[1.9rem]" : "text-[1.05rem] text-ink/85 sm:text-[1.5rem]",
                )}
              >
                <RichText text={paragraph} />
              </p>
            </Reveal>
            {i < message.paragraphs.length - 1 && <HeartDivider />}
          </div>
        ))}
      </div>

      <Reveal delay={0.6} className="mt-6">
        <p className="font-script text-3xl text-wine sm:text-4xl">{message.closing}</p>
      </Reveal>
    </div>
  );
}
