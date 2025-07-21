import React, { useEffect, useState } from "react";

const fallbackEvents = {
  past: [
    {
      title: "ICC ODI World Cup 2023",
      date: "Oct – Nov 2023",
      location: "India",
      description: "Australia won the tournament for the 6th time.",
      icon: "fas fa-history"
    }
  ],
  present: [
    {
      title: "The Hundred 2025",
      date: "July – August 2025",
      location: "England",
      description: "Ongoing 100-ball format cricket league.",
      icon: "fas fa-bolt"
    }
  ],
  upcoming: [
    {
      title: "Champions Trophy 2025",
      date: "Feb – Mar 2025",
      location: "Pakistan",
      description: "Return of the ICC Champions Trophy.",
      icon: "fas fa-calendar-plus"
    },
    {
      title: "ICC T20 World Cup 2026",
      date: "June 2026",
      location: "India & Sri Lanka",
      description: "Major T20 event with 20 nations.",
      icon: "fas fa-star"
    }
  ]
};

const EventCard = ({ event, type }) => (
  <div className="col-md-6 col-lg-4 mb-4">
    <div className="card h-100 text-dark shadow border-0">
      <div className="card-body">
        <h5 className="card-title">
          <i className={`${event.icon} text-${type} me-2`}></i>
          {event.title}
        </h5>
        <p className="mb-1"><strong>Date:</strong> {event.date}</p>
        <p className="mb-1"><strong>Location:</strong> {event.location}</p>
        <p className="card-text">{event.description}</p>
      </div>
    </div>
  </div>
);

const Events = () => {
  const [category, setCategory] = useState("all");
  const [events, setEvents] = useState(fallbackEvents);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch("/api/upcoming-events");
        const data = await res.json();
        setEvents(prev => ({
          ...prev,
          upcoming: data.upcoming || prev.upcoming
        }));
      } catch {
        console.log("Using fallback upcoming events.");
      }
    };
    fetchUpcoming();
  }, []);

  const filterEvents = (list) => {
    return list.filter(event =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase())
    );
  };

  const displayEvents = () => {
    if (category === "all") {
      return [...events.past, ...events.present, ...events.upcoming];
    }
    return events[category] || [];
  };

  return (
    <section id="events" className="py-5 bg-dark text-white">
      <div className="container">
        <h2 className="text-center mb-4 display-5 fw-bold">
          <i className="fas fa-calendar-alt text-warning me-2"></i>
          Cricket Events – Past, Present & Future
        </h2>

       
        <div className="d-flex justify-content-center gap-2 mb-4 flex-wrap">
          {["all", "past", "present", "upcoming"].map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm ${category === cat ? "btn-warning" : "btn-outline-light"}`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        
        <div className="mb-4 text-center">
          <input
            type="text"
            className="form-control w-75 mx-auto"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="row">
          {filterEvents(displayEvents()).length > 0 ? (
            filterEvents(displayEvents()).map((event, i) => (
              <EventCard key={i} event={event} type={category === "past" ? "info" : category === "present" ? "success" : "warning"} />
            ))
          ) : (
            <p className="text-center text-muted">No events found for your search.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;
