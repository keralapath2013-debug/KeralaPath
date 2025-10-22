import './Destinations.css';

const destinations = [
  {
    name: 'Munnar',
    description: 'Rolling tea plantations and misty mountains',
    image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Alleppey',
    description: 'Serene backwaters and houseboat experiences',
    image: 'https://images.pexels.com/photos/3152128/pexels-photo-3152128.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Kochi',
    description: 'Historic port city with colonial charm',
    image: 'https://images.pexels.com/photos/3152121/pexels-photo-3152121.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Wayanad',
    description: 'Lush forests and wildlife sanctuaries',
    image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Kovalam',
    description: 'Golden beaches and crystal-clear waters',
    image: 'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    name: 'Thekkady',
    description: 'Spice plantations and Periyar wildlife',
    image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800'
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
