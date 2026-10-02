// Project data for the portfolio. Add or replace images and copy here as projects evolve.
// Gallery images are used on the dedicated case-study pages.

const PROJECTS = [
  {
    id: 'woodland-house',
    num: '01',
    title: 'Woodland House',
    type: 'Modern Residence',
    location: 'Private residence',
    year: '2026',
    category: 'exterior',
    services: ['Exterior visualization', 'Interior visualization', 'Aerial visualization'],
    scope: '8 stills',
    software: ['Blender', '3D Modeling', 'Photoshop'],
    image: 'images/projects/woodland-house/woodland-exterior.jpg',
    gallery: [
      'images/projects/woodland-house/woodland-exterior.jpg',
      'images/projects/woodland-house/woodland-evening.jpg'
    ],
    text: 'A low, light-filled residence shaped by forest views, clean horizontal lines, and the calm of its setting.',
    concept: 'The visual direction studies the house as a quiet object within a dense landscape. Long horizontal planes, deep glazing, and soft evening light create a measured rhythm between architecture and garden.',
    objective: 'The image set was created to communicate the project’s atmosphere, material clarity, and relationship to the surrounding trees before construction begins.'
  },
  {
    id: 'villa-interior',
    num: '02',
    title: 'Villa Interior',
    type: 'Contemporary Interior',
    location: 'Private residence',
    year: '2026',
    category: 'interior',
    services: ['Interior visualization', 'Material studies', 'Lighting design'],
    scope: 'Interior stills',
    software: ['Blender', '3D Modeling', 'Photoshop'],
    image: 'images/projects/villa-interior/interior-living.jpg',
    gallery: [
      'images/projects/villa-interior/interior-living.jpg'
    ],
    text: 'A warm contemporary interior shaped by soft lighting, tactile materials, and a clear connection to the garden.',
    concept: 'The interior is presented as a calm sequence of connected spaces. Warm indirect light, dark stair details, natural stone, and textured upholstery create a comfortable atmosphere without competing with the architecture.',
    objective: 'The image was created to communicate the interior design direction, material palette, and spatial experience of the villa.'
  },
  {
    id: 'villa-solstice',
    num: '03',
    title: 'Villa Solstice',
    type: 'Modern Residence',
    location: 'Canggu, Bali, Indonesia',
    year: '2026',
    category: 'exterior',
    services: ['Exterior visualization', 'Architectural animation', 'Aerial visualization'],
    scope: 'Exterior stills + evening study',
    software: ['Blender', '3D Modeling', 'Photoshop'],
    image: 'images/projects/villa-solstice/dusk-exterior.jpg',
    gallery: [
      'images/projects/villa-solstice/dusk-exterior.jpg',
      'images/projects/villa-solstice/night-exterior.jpg'
    ],
    text: 'A contemporary villa study defined by warm architectural lighting, deep evening tones, and a strong arrival sequence.',
    concept: 'The project is shown at the moment when the architecture becomes a lantern in the landscape. Layered facade planes, linear lighting, and the wet street create a precise, cinematic arrival image.',
    objective: 'The visual set was created to communicate the villa’s nighttime identity, frontage, and atmosphere for presentation and marketing use.'
  },
  {
    id: 'waterfront-residences',
    num: '04',
    title: 'Waterfront Residences',
    type: 'Residential Development',
    location: 'Vietnam',
    year: '2025',
    category: 'exterior',
    services: ['Real estate visualization', 'Exterior visualization', 'Aerial visualization'],
    scope: '12 stills',
    software: ['Blender', '3D Modeling', 'Photoshop'],
    image: 'images/projects/modern-villa/waterfront-context.jpg',
    gallery: [
      'images/projects/modern-villa/waterfront-context.jpg',
      'images/projects/modern-villa/residence-evening.jpg'
    ],
    text: 'A waterfront residential study balancing repeating architecture, reflective water, and a warm lived-in atmosphere.',
    concept: 'The visual story moves from the waterline to the individual residences, using reflections, palms, and soft daylight to make the development feel both coherent and inviting.',
    objective: 'The image set gives the project team a clear visual reference for facade rhythm, waterside context, and the atmosphere of the finished development.'
  },
  {
    id: 'alpine-house',
    num: '05',
    title: 'Alpine House',
    type: 'Modern Residence',
    location: 'Private residence',
    year: '2026',
    category: 'exterior',
    services: ['Exterior visualization', 'Aerial visualization', 'Real estate visualization'],
    scope: 'Exterior stills',
    software: ['Blender', '3D Modeling', 'Photoshop'],
    image: 'images/projects/alpine-house/snow-exterior.jpg',
    gallery: [
      'images/projects/alpine-house/snow-exterior.jpg'
    ],
    text: 'A forest residence suspended between the trees, with a crisp winter atmosphere and a strong sense of shelter.',
    concept: 'The image focuses on the contrast between the pale winter landscape and the home’s darker horizontal planes. Snow, tall trees, and the elevated structure make the residence feel both protected and connected to the site.',
    objective: 'The visual direction was created to communicate the project’s relationship to its landscape and the quality of its winter arrival experience.'
  },
  {
    id: 'modern-villa',
    num: '06',
    title: 'Modern Villa',
    type: 'Modern Residence',
    location: 'Italy',
    year: '2026',
    category: 'animation',
    services: ['Exterior visualization', 'Interior visualization', '3D architectural animation', 'Aerial visualization'],
    scope: 'Architectural stills + project film',
    software: ['Blender', '3D Modeling', 'Photoshop'],
    image: 'images/projects/modern-villa/exterior-arrival.jpg',
    gallery: [
      'images/projects/modern-villa/exterior-arrival.jpg',
      'images/projects/modern-villa/animation-poster.jpg'
    ],
    video: 'images/projects/modern-villa/architectural-animation-web.mp4',
    poster: 'images/projects/modern-villa/animation-poster.jpg',
    text: 'A contemporary residential study shaped by warm materials, landscape context, and the changing light of arrival.',
    concept: 'Modern Villa is presented as a complete residential story rather than a single facade. The visual set moves from the approach and landscape to an evening atmosphere where the architecture becomes part of the lived environment.',
    objective: 'The stills and animation were created to communicate the project’s material character, relationship to its surroundings, and spatial experience across a clear sequence of views.'
  }
];

if (typeof window !== 'undefined') window.PROJECTS = PROJECTS;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PROJECTS;
}
