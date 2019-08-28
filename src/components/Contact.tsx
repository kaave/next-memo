import React from 'react';
import Map from './Map';

export type Props = {
  name: string;
  email: string;
  site: string;
  center: any;
};

const Contact: React.FC<Props> = ({ name, email, site, center }) => (
  <div>
    <address>
      Contact {name} via{' '}
      <a data-testid="email" href={`mailto:${email}`}>
        email{' '}
      </a>
      or on their{' '}
      <a data-testid="site" href={site}>
        website
      </a>
      .
    </address>
    <Map center={center} />
  </div>
);

export default Contact;
