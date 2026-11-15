import { getEntry, render, type CollectionEntry } from 'astro:content';

type PageData = CollectionEntry<'pages'>['data'];

export interface Cta {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface CardLink {
  label: string;
  href: string;
}

export interface PageCard {
  eyebrow?: string;
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  links: CardLink[];
}

export interface PageSection {
  id?: string;
  heading?: string;
  intro?: string;
  body?: string;
  items: string[];
  ctas: Cta[];
  linkLabel?: string;
  linkHref?: string;
}

export interface PageContact {
  label: string;
  value: string;
  href: string;
  wide: boolean;
}

function makeCta(
  label: string | undefined,
  href: string | undefined,
  variant: 'primary' | 'secondary',
): Cta | undefined {
  return label && href ? { label, href, variant } : undefined;
}

function compactCtas(ctas: (Cta | undefined)[]): Cta[] {
  return ctas.filter((cta): cta is Cta => Boolean(cta));
}

function makeLink(label: string | undefined, href: string | undefined): CardLink | undefined {
  return label && href ? { label, href } : undefined;
}

function makeCard(fields: {
  eyebrow?: string;
  title?: string;
  body?: string;
  href?: string;
  linkLabel?: string;
  link1Label?: string;
  link1Href?: string;
  link2Label?: string;
  link2Href?: string;
}): PageCard | undefined {
  if (!fields.title || !fields.body || !fields.href) {
    return undefined;
  }

  return {
    eyebrow: fields.eyebrow,
    title: fields.title,
    body: fields.body,
    href: fields.href,
    linkLabel: fields.linkLabel ?? 'Read more',
    links: [
      makeLink(fields.link1Label, fields.link1Href),
      makeLink(fields.link2Label, fields.link2Href),
    ].filter((link): link is CardLink => Boolean(link)),
  };
}

function makeSection(fields: {
  id?: string;
  heading?: string;
  intro?: string;
  body?: string;
  items: string[];
  linkLabel?: string;
  linkHref?: string;
  ctas: (Cta | undefined)[];
}): PageSection | undefined {
  const ctas = compactCtas(fields.ctas);

  if (
    !fields.id &&
    !fields.heading &&
    !fields.intro &&
    !fields.body &&
    fields.items.length === 0 &&
    ctas.length === 0 &&
    !fields.linkLabel
  ) {
    return undefined;
  }

  return {
    id: fields.id,
    heading: fields.heading,
    intro: fields.intro,
    body: fields.body,
    items: fields.items,
    ctas,
    linkLabel: fields.linkLabel,
    linkHref: fields.linkHref,
  };
}

function makeContact(fields: {
  label?: string;
  value?: string;
  href?: string;
  wide: boolean;
}): PageContact | undefined {
  if (!fields.label || !fields.value || !fields.href) {
    return undefined;
  }

  return {
    label: fields.label,
    value: fields.value,
    href: fields.href,
    wide: fields.wide,
  };
}

export function getCtas(data: PageData): Cta[] {
  return compactCtas([
    makeCta(data.cta1Label, data.cta1Href, data.cta1Variant),
    makeCta(data.cta2Label, data.cta2Href, data.cta2Variant),
    makeCta(data.cta3Label, data.cta3Href, data.cta3Variant),
  ]);
}

export function getSections(data: PageData): PageSection[] {
  return [
    makeSection({
      id: data.section1Id,
      heading: data.section1Heading,
      intro: data.section1Intro,
      body: data.section1Body,
      items: data.section1Items,
      linkLabel: data.section1LinkLabel,
      linkHref: data.section1LinkHref,
      ctas: [
        makeCta(data.section1Cta1Label, data.section1Cta1Href, data.section1Cta1Variant),
        makeCta(data.section1Cta2Label, data.section1Cta2Href, data.section1Cta2Variant),
      ],
    }),
    makeSection({
      id: data.section2Id,
      heading: data.section2Heading,
      intro: data.section2Intro,
      body: data.section2Body,
      items: data.section2Items,
      linkLabel: data.section2LinkLabel,
      linkHref: data.section2LinkHref,
      ctas: [
        makeCta(data.section2Cta1Label, data.section2Cta1Href, data.section2Cta1Variant),
        makeCta(data.section2Cta2Label, data.section2Cta2Href, data.section2Cta2Variant),
      ],
    }),
    makeSection({
      id: data.section3Id,
      heading: data.section3Heading,
      intro: data.section3Intro,
      body: data.section3Body,
      items: data.section3Items,
      linkLabel: data.section3LinkLabel,
      linkHref: data.section3LinkHref,
      ctas: [
        makeCta(data.section3Cta1Label, data.section3Cta1Href, data.section3Cta1Variant),
        makeCta(data.section3Cta2Label, data.section3Cta2Href, data.section3Cta2Variant),
      ],
    }),
  ].filter((section): section is PageSection => Boolean(section));
}

export function getCards(data: PageData): PageCard[] {
  return [
    makeCard({
      eyebrow: data.card1Eyebrow,
      title: data.card1Title,
      body: data.card1Body,
      href: data.card1Href,
      linkLabel: data.card1LinkLabel,
      link1Label: data.card1Link1Label,
      link1Href: data.card1Link1Href,
      link2Label: data.card1Link2Label,
      link2Href: data.card1Link2Href,
    }),
    makeCard({
      eyebrow: data.card2Eyebrow,
      title: data.card2Title,
      body: data.card2Body,
      href: data.card2Href,
      linkLabel: data.card2LinkLabel,
      link1Label: data.card2Link1Label,
      link1Href: data.card2Link1Href,
      link2Label: data.card2Link2Label,
      link2Href: data.card2Link2Href,
    }),
    makeCard({
      eyebrow: data.card3Eyebrow,
      title: data.card3Title,
      body: data.card3Body,
      href: data.card3Href,
      linkLabel: data.card3LinkLabel,
      link1Label: data.card3Link1Label,
      link1Href: data.card3Link1Href,
      link2Label: data.card3Link2Label,
      link2Href: data.card3Link2Href,
    }),
    makeCard({
      eyebrow: data.card4Eyebrow,
      title: data.card4Title,
      body: data.card4Body,
      href: data.card4Href,
      linkLabel: data.card4LinkLabel,
      link1Label: data.card4Link1Label,
      link1Href: data.card4Link1Href,
      link2Label: data.card4Link2Label,
      link2Href: data.card4Link2Href,
    }),
  ].filter((card): card is PageCard => Boolean(card));
}

export function getContacts(data: PageData): PageContact[] {
  return [
    makeContact({
      label: data.contact1Label,
      value: data.contact1Value,
      href: data.contact1Href,
      wide: data.contact1Wide,
    }),
    makeContact({
      label: data.contact2Label,
      value: data.contact2Value,
      href: data.contact2Href,
      wide: data.contact2Wide,
    }),
    makeContact({
      label: data.contact3Label,
      value: data.contact3Value,
      href: data.contact3Href,
      wide: data.contact3Wide,
    }),
  ].filter((contact): contact is PageContact => Boolean(contact));
}

export async function getPage(id: string) {
  const entry = await getEntry('pages', id);

  if (!entry) {
    throw new Error(`Missing page content entry for "${id}"`);
  }

  const { Content } = await render(entry);
  return { entry, Content };
}
