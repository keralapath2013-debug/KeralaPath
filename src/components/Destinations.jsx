import './Destinations.css';

const destinations = [
  {
    name: 'Fort Kochi',
    description: 'Fort Kochi is a coastal heritage quarter where colonial-era streets, Chinese fishing nets, art cafés, and old-world architecture blend with a relaxed sea breeze atmosphere.',
    image: 'https://scontent.fcok8-1.fna.fbcdn.net/v/t39.30808-6/494645702_1097399312408313_5572608186590145887_n.jpg?stp=dst-jpg_p180x540_tt6&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=rTWcohTztL0Q7kNvwHHTXE-&_nc_oc=AdkgyHSIm4beQ1pwv0e1F4-T_C04pMud0upgoPSB9iGvZdBO7mXDiIoTfcdJIsLvWwQ&_nc_zt=23&_nc_ht=scontent.fcok8-1.fna&_nc_gid=NuhHKxLeHXHgm6IjJaCEag&oh=00_Afqi0Pp33TxKPMWoB3ZZfTJyAzlhrHC96VeIQ2xg37Uxyg&oe=6963E156'
  },
  {
    name: 'Munnar',
    description: 'Munnar is a hill station of rolling tea gardens, cool misty valleys, winding mountain roads, and silence broken only by streams and birdsong',
    image: 'https://www.keralatourism.org/_next/image/?url=http%3A%2F%2F127.0.0.1%2Fktadmin%2Fimg%2Fpages%2Flarge-desktop%2Fmagical-visuals-of-munnar-1728565460_08c5a8ecaa8bde307f57.webp&w=1920&q=75'
  },
  {
    name: 'Thekkady',
    description: 'Thekkady is a forested wilderness escape, known for its serene Periyar Lake, wildlife-rich jungles, spice-scented plantations, and peaceful boat safaris through lush green hills.',
    image: 'https://www.soil2soulexpeditions.com/admin/public/images/cities/image_file/48334/Thekkady.jpg'
  },
  {
    name: 'Alleppey',
    description: 'Alleppey is a backwater haven where tranquil canals, swaying coconut palms, houseboats, and emerald paddy fields create a slow, dreamy rhythm of life on the water.',
    image: 'https://keralatourism.travel/images/destinations/headers/alleppey-kerala-tourism-entry-fee-timings-holidays-reviews-header.jpg'
  },
  {
    name: 'Varkala',
    description: 'Varkala is a dramatic seaside town where red laterite cliffs drop to golden beaches, with waves, cliff-top cafés, and sunset views creating a calm, bohemian vibe.',
    image: 'https://hblimg.mmtcdn.com/content/hubble/img/varkala/mmt/activities/m_activities_varkala_varkala_beach_l_403_537.jpg'
  },
  {
    name: 'Kovalam',
    description: 'Kovalam is a crescent-shaped beach destination where golden sands, lighthouse views, gentle waves, and palm-lined shores come together for a laid-back seaside escape.',
    image: 'https://www.viacation.com/_next/image?url=https%3A%2F%2Fwp.viacation.com%2Fwp-content%2Fuploads%2F2025%2F01%2F7xm413228-1.jpg&w=1280&q=75'
  }
];

export default function Destinations() {
  return (
    <section id="destinations" className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Popular Destinations</h2>
          <p className="lead text-muted">Explore the most breathtaking places in Kerala</p>
        </div>

        <div className="row g-4">
          {destinations.map((destination, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card destination-card h-100 border-0 shadow">
                <div className="destination-img-wrapper">
                  <img
                    src={destination.image}
                    className="card-img-top"
                    alt={destination.name}
                  />
                  <div className="destination-overlay"></div>
                </div>
                <div className="card-body">
                  <h5 className="card-title text-success fw-bold">{destination.name}</h5>
                  <p className="card-text text-muted">{destination.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
