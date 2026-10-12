
import { useMemo, useState } from 'react'
import NearbyMap, { type MapListing } from './NearbyMap'
import './App.css'

type Category = 'All' | 'Deals' | 'Events' | 'Places'

const listings: MapListing[] = [
  {
    id: 1,
    title: 'The Sunday Table',
    category: 'Deals',
    subtitle: 'A little something for your afternoon.',
    location: 'Sample café listing',
    distance: '250 m',
    time: 'Sample offer · Check details',
    price: '20% off',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85',
    position: [16.5062, 80.6480],
  },
  {
    id: 2,
    title: 'An Evening in Bloom',
    category: 'Events',
    subtitle: 'Live music in an intimate garden setting.',
    location: 'Sample event listing',
    distance: '600 m',
    time: 'Sample event · Time unverified',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=85',
    position: [16.5100, 80.6350],
  },
  {
    id: 3,
    title: 'Objects & Other Stories',
    category: 'Places',
    subtitle: 'Books, art and considered objects.',
    location: 'Sample bookstore listing',
    distance: '850 m',
    time: 'Hours unverified',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=85',
    position: [16.5000, 80.6550],
  },
  {
    id: 4,
    title: 'Slow Mornings',
    category: 'Deals',
    subtitle: 'Fresh pastries and coffee, made slowly.',
    location: 'Sample bakery listing',
    distance: '1.1 km',
    time: 'Sample offer · Check details',
    price: 'Combo offer',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=85',
    position: [16.5150, 80.6600],
  },
  {
    id: 5,
    title: 'The Flower Market',
    category: 'Events',
    subtitle: 'Seasonal stems and independent growers.',
    location: 'Sample market listing',
    distance: '1.4 km',
    time: 'Sample event · Time unverified',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85',
    position: [16.4980, 80.6380],
  },
  {
    id: 6,
    title: 'A Quiet Corner',
    category: 'Places',
    subtitle: 'A little green escape from the everyday.',
    location: 'Sample garden listing',
    distance: '1.8 km',
    time: 'Details unverified',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=85',
    position: [16.5180, 80.6450],
  },
]

const categories: Category[] = ['All', 'Deals', 'Events', 'Places']

function App() {
  const [category, setCategory] = useState<Category>('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<MapListing | null>(null)

  const filteredListings = useMemo(() => {
    const query = search.trim().toLowerCase()

    return listings.filter((listing) => {
      const categoryMatches =
        category === 'All' || listing.category === category

      const searchable = [
        listing.title,
        listing.subtitle,
        listing.location,
        listing.category,
      ].join(' ').toLowerCase()

      return categoryMatches && searchable.includes(query)
    })
  }, [category, search])

  return (
    <main className="site-shell" id="home">
      <header className="site-header">
        <a
          className="wordmark"
          href="#home"
          aria-label="Nearby home"
          onClick={() => {
            setSearch('')
            setCategory('All')
            setSelected(null)
          }}
        >
          <span className="wordmark-main">nearby</span>
          <span className="wordmark-sub">A FIELD GUIDE TO WHAT'S AROUND</span>
        </a>

        <nav className="header-nav" aria-label="Main navigation">
          <a href="#discover">Discover</a>
          <a href="#map">The map</a>
          <span className="availability">
            <span className="availability-dot" />
            VIJAYAWADA EDITION
          </span>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">GOOD THINGS ARE CLOSER THAN YOU THINK</p>
          <h1>
            The world,
            <br />
            just <em>around you.</em>
          </h1>
          <p className="hero-description">
            Independent places, little discoveries, special offers and
            gatherings worth stepping out for.
          </p>
          <a className="text-link" href="#discover">
            WANDER A LITTLE <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="hero-art">
          <img
            src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=85"
            alt="Soft blush and cream seasonal flowers"
          />
          <div className="hero-art-caption">
            <span>01 / AROUND THE CORNER</span>
            <span>Little things, lovely places.</span>
          </div>
          <span className="hero-side-note">A GUIDE TO YOUR NEIGHBOURHOOD</span>
        </div>
      </section>

      <section className="discover-section" id="discover">
        <div className="section-intro">
          <div>
            <p className="eyebrow">COLLECTED AROUND YOU</p>
            <h2>Something <em>lovely</em> is happening.</h2>
          </div>
          <p className="section-description">
            A thoughtful collection of things to see, places to go and
            reasons to get out the door.
          </p>
        </div>

        <div className="discovery-tools">
          <label className="search-box">
            <span className="search-symbol" aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Find a place, an offer, a little event..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search listings"
            />
            {search && (
              <button
                className="clear-search"
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
            <span className="search-hint">SEARCH</span>
          </label>

          <div className="category-tabs" aria-label="Filter listings">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? 'category-tab active' : 'category-tab'}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="results-heading">
          <p>{category === 'All' ? 'A LITTLE BIT OF EVERYTHING' : category.toUpperCase()}</p>
          <span>{String(filteredListings.length).padStart(2, '0')} FINDS</span>
        </div>

        {filteredListings.length > 0 ? (
          <div className="listing-grid">
            {filteredListings.map((listing, index) => (
              <button
                className="listing-card"
                type="button"
                key={listing.id}
                onClick={() => setSelected(listing)}
                aria-label={`View details for ${listing.title}`}
              >
                <span className="card-image-wrap">
                  <img
                    className="card-image"
                    src={listing.image}
                    alt=""
                    loading="lazy"
                  />
                  <span className="card-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {listing.price && (
                    <span className="offer-stamp">{listing.price}</span>
                  )}
                  <span className="image-arrow" aria-hidden="true">↗</span>
                </span>

                <span className="card-meta">
                  <span>{listing.category}</span>
                  <span>{listing.distance} away*</span>
                </span>
                <span className="card-title">{listing.title}</span>
                <span className="card-description">{listing.subtitle}</span>
                <span className="card-location">{listing.location}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p className="empty-title">Nothing here just yet.</p>
            <p>Try another search or explore a different category.</p>
            <button
              className="text-link"
              type="button"
              onClick={() => {
                setSearch('')
                setCategory('All')
              }}
            >
              CLEAR YOUR SEARCH ↗
            </button>
          </div>
        )}

        <p className="sample-note">
          *Distances, places, offers and events are illustrative sample data.
        </p>
      </section>

      <NearbyMap
        listings={filteredListings}
        onSelect={setSelected}
      />

      <section className="closing-note" id="about">
        <p className="eyebrow">A NOTE FROM US</p>
        <h2>
          Take the long way
          <br />
          <em>home.</em>
        </h2>
        <p>
          The best discoveries aren't always planned. Sometimes they're
          waiting just around the corner.
        </p>
      </section>

      <footer className="site-footer">
        <a className="footer-wordmark" href="#home">nearby.</a>
        <p>MADE FOR THE JOY OF FINDING SOMETHING NEW.</p>
        <a href="#home">BACK TO THE BEGINNING ↑</a>
      </footer>

      {selected && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setSelected(null)
          }}
          role="presentation"
        >
          <section
            className="detail-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close listing"
            >
              ×
            </button>

            <img className="modal-image" src={selected.image} alt="" />

            <div className="modal-content">
              <p className="eyebrow">{selected.category.toUpperCase()} / AROUND YOU</p>
              <h2 id="detail-title">{selected.title}</h2>
              <p className="modal-description">{selected.subtitle}</p>
              {selected.price && <p className="modal-offer">{selected.price}</p>}

              <div className="modal-details">
                <p><span>PLACE</span>{selected.location}</p>
                <p><span>ESTIMATED DISTANCE</span>{selected.distance}</p>
                <p><span>WHEN</span>{selected.time}</p>
              </div>

              <p className="demo-disclaimer">
                Concept preview · This is not a verified business or live offer.
              </p>
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
