import { PageHero } from "@/components/sections/blocks";
import { ButtonLink } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="This page doesn't exist." description="The link may be outdated, or the page may have moved.">
      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/" variant="accent" arrow>
          Back to home
        </ButtonLink>
        <ButtonLink href="/services" variant="ghost-dark">
          Explore capabilities
        </ButtonLink>
      </div>
    </PageHero>
  );
}
