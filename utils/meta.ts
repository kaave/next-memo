// import dotenv from 'dotenv';

// dotenv.config();

type OGType = 'website' | 'article';
type TwitterCard = 'summary' | 'summary_large_image';
type Meta = {
  title: string;
  description: string;
  image: string;
  og: {
    url: string;
    type: OGType;
  };
  twitter: {
    card: TwitterCard;
    site: string;
  };
};
export type ReadonlyMeta = Readonly<Meta>;

export const title = process.env.TITLE || '';
export const description = process.env.DESCRIPTION || '';
export const url = process.env.URL || '';
const image = process.env.IMAGE || '';
const twitter = process.env.TWITTER || '';

const defaultMeta: ReadonlyMeta = {
  title,
  description,
  image,
  og: { url, type: 'website' },
  twitter: { card: 'summary_large_image', site: twitter },
};

export function getMeta(
  props: {
    title?: string;
    description?: string;
    url?: string;
    image?: string;
    ogType?: OGType;
    twitterCard?: TwitterCard;
    twitterSite?: string;
  } = {},
): ReadonlyMeta {
  const meta = { ...defaultMeta };

  if (props.title) {
    meta.title = props.title;
  }

  if (props.description) {
    meta.description = props.description;
  }

  if (props.image) {
    meta.image = props.image;
  }

  if (props.url) {
    meta.og.url = props.url;
  }

  if (props.ogType) {
    meta.og.type = props.ogType;
  }

  if (props.twitterCard) {
    meta.twitter.card = props.twitterCard;
  }

  if (props.twitterSite) {
    meta.twitter.site = props.twitterSite;
  }

  return meta;
}
