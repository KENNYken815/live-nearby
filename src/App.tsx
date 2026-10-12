
import { useMemo, useState } from 'react'
import NearbyMap, { type MapListing } from './NearbyMap'
import './App.css'

type CategoryFilter = 'All' | MapListing['category']

const listings: MapListing[] = [
  {
    id: 'deal-1',
    title: 'The Sunday Table',
    category: 'Deals',
    subtitle: 'A little treat for your afternoon',
    location: 'Central Vijayawada',
    distance: '0.8 km',
    time: 'Today',
    price: 'Special offer',
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80',
    position: [16.5062, 80.648],
  },
  {
    id: 'event-1',
    title: 'An Evening of Art',
    category: 'Events',
    subtitle: 'Art, conversations and local creativity',
    location: 'Benz Circle area',
    distance: '1.6 km',
    time: 'This weekend',
    image:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=900&q=80',
    position: [16.5105, 80.653],
  },
  {
    id: 'place-1',
    title: 'A Quiet Coffee Corner',
    category: 'Places',
    subtitle: 'Slow mornings and a good cup of coffee',
    location: 'Governorpet area',
    distance: '1.2 km',
    time: 'Explore anytime',
    price: 'Price varies',
    image:
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=80',
    position: [16.518, 80.632],
  },
  {
    id: 'deal-2',
    title: 'A Sweet Little Break',
    category: 'Deals',
    subtitle: 'Discover something delicious nearby',
    location: 'MG Road area',
    distance: '2.1 km',
    time: 'Check locally',
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
    position: [16.5025, 80.657],
  },
]

const categories: CategoryFilter[] = [
  'All',
  'Deals',
  'Events',
  'Places',
]

function App() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>('All')
  const [selectedListing, setSelectedListing] =
    useState<MapListing | null>(null)

  const filteredListings = useMemo(() => {
    const query = search.trim().toLowerCase()

    return listings.filter((listing) => {
      const matchesCategory =
        activeCategory === 'All' ||
        listing.category === activeCategory

      const searchableText = [
        listing.title,
        listing.subtitle,
        listing.location,
        listing.category,
      ]
        .join(' ')
        .toLowerCase()

      return matchesCategory && searchableText.includes(query)
    })
  }, [search, activeCategory])

  return (
    <div className="app-shell" id="home">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Live Nearby home">
          <span className="brand-mark">l.</span>
          <span>live nearby</span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#discover">Discover</a>
          <a href="#map">Explore map</a>
        </nav>

        <a className="header-cta" href="#discover">
          Find your nearby
        </a>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">YOUR NEIGHBOURHOOD, REIMAGINED</p>

            <h1>
              Lovely things
              <br />
              are <em>closer</em> than
              <br />
              you think.
            </h1>

            <p className="hero-description">
              Find local places, little deals and interesting events
              waiting just around the corner.
            </p>

            <a className="primary-button" href="#discover">
              Explore nearby <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="hero-art">
            <img
              src="/icons.svg"
              alt=""
              className="hero-decoration"
              aria-hidden="true"
            />
            <div className="hero-image-frame">
              <img
                src="/src/assets/hero.png"
                alt="A gentle, editorial illustration for local discovery"
                className="hero-image"
              />
            </div>
            <span className="hero-note">A little closer to life.</span>
          </div>
        </section>

        <section className="discover-section" id="discover">
          <div className="section-heading">
            <div>
              <p className="eyebrow">YOUR LITTLE LOCAL GUIDE</p>
              <h2>What feels like you today?</h2>
              <p className="section-description">
                Browse the neighbourhood and find your next favourite.
              </p>
            </div>
          </div>

          <div className="discovery-controls">
            <label className="search-bar">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search places, deals, events..."
                aria-label="Search nearby listings"
              />
              {search && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </label>

            <div className="category-tabs" aria-label="Filter by category">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={
                    activeCategory === category
                      ? 'category-tab active'
                      : 'category-tab'
                  }
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="listing-grid">
            {filteredListings.map((listing) => (
              <article className="listing-card" key={listing.id}>
                <button
                  type="button"
                  className="listing-image-button"
                  onClick={() => setSelectedListing(listing)}
                  aria-label={`View ${listing.title}`}
                >
                  <img
                    className="listing-image"
                    src={listing.image}
                    alt=""
                    loading="lazy"
                  />
                  <span className={`listing-category ${listing.category.toLowerCase()}`}>
                    {listing.category}
                  </span>
                </button>

                <div className="listing-card-content">
                  <p className="listing-location">
                    {listing.location} · {listing.distance}
                  </p>

                  <h3>{listing.title}</h3>

                  <p className="listing-subtitle">{listing.subtitle}</p>

                  <div className="listing-card-footer">
                    <span>{listing.price ?? listing.time}</span>
                    <button
                      type="button"
                      className="text-button"
                      onClick={() => setSelectedListing(listing)}
                    >
                      Discover <span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredListings.length === 0 && (
            <div className="empty-state">
              <h3>Nothing around that search just yet.</h3>
              <p>Try another word or choose a different category.</p>
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setSearch('')
                  setActiveCategory('All')
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <NearbyMap
          listings={filteredListings}
          selectedListing={selectedListing}
          onSelect={setSelectedListing}
        />
      </main>

      <footer className="site-footer">
        <a className="brand" href="#home">
          <span className="brand-mark">l.</span>
          <span>live nearby</span>
        </a>
        <p>Find something lovely, just around the corner.</p>
        <span className="footer-caption">MADE FOR EVERYDAY DISCOVERIES</span>
      </footer>

      {selectedListing && (
        <div
          className="modal-backdrop"
          role="presentation"
          onClick={() => setSelectedListing(null)}
        >
          <section
            className="listing-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelectedListing(null)}
              aria-label="Close details"
            >
              ×
            </button>

            <img
              className="modal-image"
              src={selectedListing.image}
              alt=""
            />

            <div className="modal-content">
              <p className="eyebrow">{selectedListing.category}</p>
              <h2 id="modal-title">{selectedListing.title}</h2>
              <p>{selectedListing.subtitle}</p>
              <p>
                {selectedListing.location} · {selectedListing.distance}
              </p>
              <p>{selectedListing.time}</p>
              {selectedListing.price && <p>{selectedListing.price}</p>}
              <button
                type="button"
                className="primary-button"
                onClick={() => setSelectedListing(null)}
              >
                Back to exploring
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
