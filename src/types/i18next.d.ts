import 'react-i18next';
import common from '../../public/locales/en/common.json';
import home from '../../public/locales/en/home.json';
import booking from '../../public/locales/en/booking.json';
import contact from '../../public/locales/en/contact.json';
import policies from '../../public/locales/en/policies.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      home: typeof home;
      booking: typeof booking;
      contact: typeof contact;
      policies: typeof policies;
    };
  }
}
