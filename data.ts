import { EventLocation, EventInstance } from './types';

const LOCATIONS: EventLocation[] = [
  {
    id: 'flora',
    name: 'Flora & Botanischer Garten',
    address: 'Alter Stammheimer Weg, 50735 Köln',
    lat: 50.9591,
    lng: 6.9712,
    category: 'Garten',
    description: 'Historisches Gartenensemble mit über 12.000 Pflanzenarten.'
  },
  {
    id: 'finkens',
    name: 'Finkens Garten',
    address: 'Friedrich-Ebert-Straße 49, 50996 Köln',
    lat: 50.8931,
    lng: 7.0003,
    category: 'Garten',
    description: 'Naturerlebnisgarten für Kinder und Familien.'
  },
  {
    id: 'leidenhausen',
    name: 'Gut Leidenhausen',
    address: 'Gut Leidenhausen 1, 51147 Köln',
    lat: 50.8913,
    lng: 7.0864,
    category: 'Wald',
    description: 'Umweltbildungszentrum mit Greifvogelstation und Wildgehege.'
  },
  {
    id: 'forstbotanisch',
    name: 'Forstbotanischer Garten',
    address: 'Schillingsrotter Straße 100, 50996 Köln',
    lat: 50.8872,
    lng: 6.9701,
    category: 'Garten',
    description: 'Wälder der Welt und Friedenswald im Kölner Süden.'
  },
  {
    id: 'lindenthal',
    name: 'Lindenthaler Tierpark',
    address: 'Kitschburger Straße, 50935 Köln',
    lat: 50.9268,
    lng: 6.9112,
    category: 'Tierpark',
    description: 'Tierpark am Stadtwald mit Hochlandrindern und Ziegen.'
  },
  {
    id: 'rheinpark',
    name: 'Rheinpark',
    address: 'Rheinparkweg, 50679 Köln',
    lat: 50.9472,
    lng: 6.9719,
    category: 'Garten',
    description: 'Preisgekrönte Parklandschaft am Deutzer Rheinufer.'
  },
  {
    id: 'stadtgaertnerei',
    name: 'Stadtgärtnerei Köln',
    address: 'Am Grauen Stein 26, 51105 Köln',
    lat: 50.9167,
    lng: 7.0012,
    category: 'Garten',
    description: 'Das Herzstück der kommunalen Zierpflanzenproduktion.'
  },
  {
    id: 'fortX',
    name: 'Fort X',
    address: 'Neusser Wall 41, 50670 Köln',
    lat: 50.9547,
    lng: 6.9602,
    category: 'Kultur',
    description: 'Historische preußische Festungsanlage mit Rosengarten.'
  },
  {
    id: 'ulrepforte',
    name: 'Ulrepforte',
    address: 'Kartäuser Wall, 50678 Köln',
    lat: 50.9254,
    lng: 6.9535,
    category: 'Kultur',
    description: 'Mittelalterliches Stadttor und Teil der Stadtmauer.'
  },
  {
    id: 'waldlabor',
    name: 'Waldlabor',
    address: 'Bachemer Landstraße, 50858 Köln',
    lat: 50.9221,
    lng: 6.8778,
    category: 'Wald',
    description: 'Experimentierfeld für den Wald der Zukunft.'
  },
  {
    id: 'worringer',
    name: 'Worringer Bruch',
    address: 'Senfweg/Bruchstraße, 50769 Köln',
    lat: 51.0583,
    lng: 6.8742,
    category: 'Wald',
    description: 'Naturschutzgebiet und einziger „Urwald“ in Köln.'
  }
];

const EVENTS: EventInstance[] = [
  {
    id: 'e1',
    locationId: 'flora',
    title: 'Kamelien – Fernöstlicher Blütenzauber',
    date: '15. Januar – 29. März 2026',
    time: 'Täglich 10:00 – 16:00 Uhr',
    description: 'Deutschlands größte Kamelien-Sammlung in Blüte im International Camellia Garden of Excellence.',
    accessible: true,
    registrationRequired: false,
    hasWC: true,
    registrationUrl: 'https://stadt-koeln.de/service/onlinetermine'
  },
  {
    id: 'e2',
    locationId: 'flora',
    title: 'Botanische Mittagspause',
    date: '25. Februar 2026',
    time: '12:30 Uhr',
    description: '30-minütiger Rundgang zu ausgewählten botanischen Themen und Geschichten aus der Flora.',
    guide: 'Mitarbeitende der Flora',
    cost: 'Kostenlos',
    accessible: true,
    registrationRequired: true,
    hasWC: true,
    registrationUrl: 'https://stadt-koeln.de/service/onlinetermine'
  },
  {
    id: 'e3',
    locationId: 'leidenhausen',
    title: 'Wahner-Heide-Tag',
    date: '01. Mai 2026',
    time: '11:00 – 17:00 Uhr',
    description: 'Großes Fest mit Umweltgottesdienst, Ständen von NABU, Kölner Jägerschaft und vielen mehr.',
    accessible: true,
    registrationRequired: false,
    hasWC: true,
    registrationUrl: 'https://stadt-koeln.de/service/onlinetermine'
  },
  {
    id: 'e4',
    locationId: 'finkens',
    title: 'Tag der offenen Tür / 101 Jahre Freiluga',
    date: '13. Juni 2026',
    time: '11:00 – 17:00 Uhr',
    description: 'Feier des 101-jährigen Bestehens mit Einblicken in die Umweltbildung.',
    accessible: true,
    registrationRequired: false,
    hasWC: true,
    registrationUrl: 'https://stadt-koeln.de/service/onlinetermine'
  },
  {
    id: 'e5',
    locationId: 'stadtgaertnerei',
    title: 'Ein Blick hinter die Kulissen',
    date: '25. April 2026',
    time: '10:00 & 11:30 Uhr',
    description: 'Werfen Sie einen Blick in das Heiligtum der Kölner Blütenmeere.',
    guide: 'Moritz Pfister',
    accessible: true,
    registrationRequired: false,
    hasWC: true,
    registrationUrl: 'https://stadt-koeln.de/service/onlinetermine'
  },
  {
    id: 'e6',
    locationId: 'fortX',
    title: 'Kölner Festungstage: Fort X',
    date: '11. Juli 2026',
    time: '12:00 & 15:00 Uhr',
    description: 'Führung durch das historische Fort und den Rosengarten in preußischer Montur.',
    guide: 'Christoph Gilles',
    cost: 'Kostenlos',
    accessible: false,
    registrationRequired: false,
    hasWC: false,
    registrationUrl: 'https://stadt-koeln.de/service/onlinetermine'
  },
  {
    id: 'e7',
    locationId: 'worringer',
    title: 'Internationaler Tag des Waldes: Worringer Bruch',
    date: '20. März 2026',
    time: '16:00 Uhr',
    description: 'Wanderung durch den einzigen „Urwald“ in Köln zum Schutzgebietserhalt.',
    guide: 'Michael Hundt',
    accessible: false,
    registrationRequired: false,
    hasWC: false,
    registrationUrl: 'https://stadt-koeln.de/service/onlinetermine'
  },
  {
    id: 'e8',
    locationId: 'waldlabor',
    title: 'Führung durch das Waldlabor',
    date: '05. Mai 2026',
    time: '17:00 Uhr',
    description: 'Vorstellung zukunftsfähiger Baumarten angesichts des Klimawandels.',
    guide: 'Michael Hundt',
    accessible: true,
    registrationRequired: false,
    hasWC: false,
    registrationUrl: 'https://stadt-koeln.de/service/onlinetermine'
  }
];

export { LOCATIONS, EVENTS };