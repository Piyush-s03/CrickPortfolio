import React, { useState } from 'react';

const clubData = [
  {
    name: 'Vidarbha Cricket Association',
    location: 'Nagpur, Maharashtra',
    description: 'One of the oldest cricket associations promoting cricket in the Vidarbha region.',
    website: 'https://www.vca.co.in/',
  },
  {
    name: 'Raisoni Cricket Club',
    location: 'Nagpur',
    description: 'A growing club that encourages young cricket talent in Nagpur.',
    website: '#',
  },
  {
    name: 'Maharashtra Cricket Association',
    location: 'Pune, Maharashtra',
    description: 'The governing body for cricket activities in Maharashtra (excluding Mumbai).',
    website: 'https://www.maharashtracricketassociation.com/',
  },
  {
    name: 'Mumbai Cricket Association',
    location: 'Mumbai, Maharashtra',
    description: 'The official cricket association for Mumbai and surrounding regions.',
    website: 'https://www.mumbaicricket.com/',
  },
  {
    name: 'Board of Control for Cricket in India (BCCI)',
    location: 'Pan India',
    description: 'The national governing body for cricket in India.',
    website: 'https://www.bcci.tv/',
  },
];

const Clubs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clubInfo, setClubInfo] = useState(null);
  const [error, setError] = useState('');

  const searchClub = async () => {
    const term = searchTerm.trim();
    if (!term) {
      setError('Please enter a club name.');
      return;
    }

    setError('');
    setClubInfo(null);

    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Club not found');

      const data = await res.json();
      setClubInfo({
        title: data.title,
        description: data.extract,
        image: data.thumbnail?.source || null,
      });
    } catch (err) {
      setError('Club not found. Try names like "BCCI", "Mumbai Cricket Association", etc.');
    }
  };

  return (
    <section id="clubs" className="py-5 bg-dark text-white">
      <div className="container">
        <h2 className="text-center mb-4 display-6 fw-bold">
          Cricket Clubs in India <i className="fas fa-users ms-2"></i>
        
        

        </h2>

        <div className="input-group mb-4">

          <p>Board of Control for Cricket in India (BCCI), is the governing body of cricket in India, It is a full member of the International Cricket Council (ICC), the international governing body of cricket. BCCI is made up of full and associate member associations. These member associations are grouped into zones, depending on their location in India, North zone, Central zone, East zone, West zone and South zone.

Most of the member associations govern cricket in their respective states while some govern the sport in their city/regions such as Mumbai, Saurashtra, Vadodara and Vidharbha, some govern it in union territories such as Jammu and Kashmir, Pondicherry and Chandigarh, and some represents the government institutions such as Indian Railways and Indian Armed Forces' Services</p>
          <input
            type="text"
            className="form-control bg-transparent text-light border-secondary"
            placeholder="Search any BCCI-affiliated club in India (e.g., Mumbai Cricket Association)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchClub()}
          />
          <button className="btn btn-outline-warning" onClick={searchClub}>
            Search
          </button>
        </div>

        {error && <p className="text-danger">{error}</p>}

        {clubInfo && (
          <div className="card mx-auto mb-4 bg-light text-dark" style={{ maxWidth: '600px' }}>
            {clubInfo.image && (
              <img
                src={clubInfo.image}
                className="card-img-top"
                alt={clubInfo.title}
                style={{ maxHeight: '300px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{clubInfo.title}</h5>
              <p className="card-text">{clubInfo.description}</p>
            </div>
          </div>
        )}

        <div className="row">
          {clubData.map((club, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="card h-100 shadow-sm">
                <div className="card-body text-dark">
                  <h5 className="card-title">{club.name}</h5>
                  <p><strong>Location:</strong> {club.location}</p>
                  <p>{club.description}</p>
                  <a
                    href={club.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-primary"
                  >
                    Visit Club
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Clubs;
