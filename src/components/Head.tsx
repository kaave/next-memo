import React from 'react';
import Head from 'next/head';

import { ReadonlyMeta } from '@/utils/meta';

export type Props = ReadonlyMeta;

const Meta: React.FC<Props> = ({ title, description, image, og, twitter, children }) => (
  <Head>
    <title>{title}</title>
    <meta key="name" itemProp="name" content={title} />
    <meta key="ogTitle" property="og:title" content={title} />
    <meta key="twitterTitle" name="twitter:title" content={title} />
    <meta key="description" name="description" content={description} />
    <meta key="itemPropDescription" itemProp="description" content={description} />
    <meta key="ogDescription" property="og:description" content={description} />
    <meta key="twitterDescription" name="twitter:description" content={description} />
    <meta key="image" itemProp="image" content={image} />
    <meta key="ogImage" property="og:image" content={image} />
    <meta key="twitterImage" name="twitter:image" content={image} />
    <meta key="ogUrl" property="og:url" content={og.url} />
    <meta key="ogType" property="og:type" content={og.type} />
    <meta key="twitterSite" name="twitter:site" content={twitter.site} />
    <meta key="twitterCard" name="twitter:card" content={twitter.card} />
    {children}
  </Head>
);

export default Meta;
