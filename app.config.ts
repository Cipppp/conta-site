// Contact details shown across the site. Keep them here so the header, footer,
// contact section and structured data never drift apart again.
export default defineAppConfig({
  site: {
    url: 'https://www.accountingbusiness.ro',
    name: 'Accounting Business Expert',
    legalName: 'SC Accounting Business Expert for Everyone SRL',
    cui: '34751282'
  },
  contact: {
    phones: [
      { display: '+40 766 333 433', tel: '+40766333433' },
      { display: '+40 764 218 182', tel: '+40764218182' },
      { display: '+40 767 019 025', tel: '+40767019025' }
    ],
    whatsapp: { display: '+40 766 333 433', tel: '+40766333433' },
    emails: ['office@accountingbusiness.ro', 'loredana@accountingbusiness.ro'],
    address: {
      street: 'Str. Tudor Vladimirescu, nr. 95',
      city: 'Ploiești',
      county: 'Prahova'
    }
  }
})
