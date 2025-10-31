import { useState } from "react";
import {
  Calendar,
  Users,
  Clock,
  Search,
  Plus,
  Award,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import CheifGuestPhoto from "./assets/images.jpg";

const eventTypes = [
  "All",
  "Technical",
  "Workshop",
  "Cultural",
  "Seminar",
  "Sports",
];

// Mock event API
const eventAPI = {
  events: [
    {
      id: 1,
      title: "Web Development Workshop",
      description: "Learn modern web development with React and Node.js",
      date: "2025-11-15",
      time: "10:00 AM",
      venue: "Tech Lab 1",
      type: "Workshop",
      capacity: 50,
      attendees: 35,
      registeredUsers: [],
    },
    {
      id: 2,
      title: "AI/ML Seminar",
      description: "Explore the future of Artificial Intelligence",
      date: "2025-11-20",
      time: "2:00 PM",
      venue: "Auditorium",
      type: "Seminar",
      capacity: 200,
      attendees: 150,
      registeredUsers: [],
    },
  ],
  getAllEvents() {
    return this.events;
  },
  createEvent(data) {
    const newEvent = {
      ...data,
      id: this.events.length + 1,
      attendees: 0,
      registeredUsers: [],
    };
    this.events.push(newEvent);
  },
  updateEvent(id, data) {
    const index = this.events.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.events[index] = { ...this.events[index], ...data };
    }
  },
  deleteEvent(id) {
    this.events = this.events.filter((e) => e.id !== id);
  },
  registerAttendee(id, data) {
    const event = this.events.find((e) => e.id === id);
    if (event) {
      event.registeredUsers.push(data);
      event.attendees += 1;
    }
  },
};

// Event Card Component
function EventCard({ event, onRegister, onEdit, onDelete }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-red-950/30 border-2 border-red-500/20 rounded-lg p-6 shadow-lg hover:shadow-red-500/20 transition-all duration-300 hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg shadow-red-500/50">
          {event.type}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(event)}
            className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="text-red-400 hover:text-red-300 text-sm font-semibold transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
      <p className="text-gray-300 text-sm mb-4">{event.description}</p>
      <div className="space-y-2 text-sm text-gray-400 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{event.venue}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span>
            {event.attendees} / {event.capacity} registered
          </span>
        </div>
      </div>
      <button
        onClick={() => onRegister(event)}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
        disabled={event.attendees >= event.capacity}
      >
        {event.attendees >= event.capacity ? "Event Full" : "Register Now"}
      </button>
    </div>
  );
}

function EventModal({ open, onClose, onSubmit, event, mode }) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    description: event?.description || "",
    date: event?.date || "",
    time: event?.time || "",
    venue: event?.venue || "",
    type: event?.type || "Technical",
    capacity: event?.capacity || 50,
    name: "",
    email: "",
    phone: "",
  });

  if (!open) return null;

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      venue: "",
      type: "Technical",
      capacity: 50,
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gray-900 border-2 border-red-500/30 rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl shadow-red-500/20 animate-scaleIn">
        <h2 className="text-2xl font-bold text-white mb-4">
          {mode === "register"
            ? "Register for Event"
            : mode === "edit"
            ? "Edit Event"
            : "Create Event"}
        </h2>
        <div className="space-y-4">
          {mode === "register" ? (
            <>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition-colors"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Event Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition-colors"
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition-colors"
                rows={3}
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition-colors"
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Venue"
                value={formData.venue}
                onChange={(e) =>
                  setFormData({ ...formData, venue: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition-colors"
              />
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition-colors"
              >
                {eventTypes
                  .filter((t) => t !== "All")
                  .map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </select>
              <input
                type="number"
                placeholder="Capacity"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    capacity: parseInt(e.target.value),
                  })
                }
                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 text-white focus:border-red-500 focus:outline-none transition-colors"
                min="1"
              />
            </>
          )}
          <div className="flex gap-4 pt-2">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
            >
              {mode === "register"
                ? "Register"
                : mode === "edit"
                ? "Update"
                : "Create"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [events, setEvents] = useState(eventAPI.getAllEvents());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  const openModal = (mode, event = null) => {
    setModalMode(mode);
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleSubmitEvent = (data) => {
    if (modalMode === "create") {
      eventAPI.createEvent(data);
    } else if (modalMode === "edit" && selectedEvent) {
      eventAPI.updateEvent(selectedEvent.id, data);
    }
    setEvents(eventAPI.getAllEvents());
    closeModal();
  };

  const handleRegisterAttendee = (data) => {
    if (selectedEvent) {
      eventAPI.registerAttendee(selectedEvent.id, data);
      setEvents(eventAPI.getAllEvents());
      closeModal();
    }
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      eventAPI.deleteEvent(id);
      setEvents(eventAPI.getAllEvents());
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || event.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalAttendees = events.reduce((sum, e) => sum + e.attendees, 0);
  const upcomingEvents = events.filter(
    (e) => new Date(e.date) > new Date()
  ).length;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <style>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes redPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes lightning {
          0%, 100% { transform: translateX(-100%); opacity: 0; }
          50% { transform: translateX(100%); opacity: 0.3; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.3); }
          50% { box-shadow: 0 0 40px rgba(239, 68, 68, 0.6); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-gradient-shift {
          animation: gradientShift 15s ease infinite;
        }
        .animate-red-pulse {
          animation: redPulse 3s ease-in-out infinite;
        }
        .animate-lightning {
          animation: lightning 8s ease-in-out infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
        .shadow-red-glow {
          box-shadow: 0 4px 20px rgba(239, 68, 68, 0.3);
        }
        .shadow-strong {
          box-shadow: 0 8px 40px rgba(239, 68, 68, 0.5);
        }
      `}</style>
      {/* Animated Background with Red & Black Effects */}
      <div className="fixed inset-0 -z-10 bg-black">
        <div
          className="absolute inset-0 animate-gradient-shift bg-gradient-to-br from-red-900/20 via-black to-red-900/20"
          style={{ backgroundSize: "400% 400%" }}
        />
        <div
          className="absolute inset-0 animate-red-pulse"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.15), transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 animate-lightning"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, rgba(239, 68, 68, 0.1) 50%, transparent 100%)",
          }}
        />
      </div>
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 via-red-950 to-gray-900 shadow-red-glow sticky top-0 z-50 border-b-2 border-red-500">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-500 rounded-full flex items-center justify-center text-2xl font-bold shadow-red-glow animate-pulse-glow">
                CEC
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-wider drop-shadow-lg">
                  CITY ENGINEERING COLLEGE
                </h1>
                <p className="text-sm md:text-base font-semibold text-red-400 tracking-widest mt-1">
                  EVENT MANAGEMENT PORTAL
                </p>
              </div>
            </div>
            <button
              onClick={() => openModal("create")}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2 shadow-red-glow hover:shadow-strong transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              CREATE EVENT
            </button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-red-950/50 to-black py-20 md:py-28 border-b-2 border-red-500 relative overflow-hidden">
        {/* Additional animated effects */}
        <div
          className="absolute inset-0 animate-red-pulse"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.1), transparent 50%)",
            animationDelay: "0s",
          }}
        />
        <div
          className="absolute inset-0 animate-red-pulse"
          style={{
            background:
              "radial-gradient(circle at 80% 50%, rgba(239, 68, 68, 0.1), transparent 50%)",
            animationDelay: "1.5s",
          }}
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 animate-float drop-shadow-2xl">
            EMPOWERING FUTURE ENGINEERS
          </h2>
          <p className="text-xl md:text-2xl text-red-400 font-semibold mb-12 tracking-wide">
            Join us for world-class events, workshops, and seminars
          </p>

          {/* Chief Guest Card with Photo */}
          <div className="inline-flex items-center gap-6 p-8 bg-gradient-to-r from-black/80 via-red-950/50 to-black/80 backdrop-blur-sm border-2 border-red-500/50 rounded-lg max-w-2xl animate-pulse-glow">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl animate-red-pulse" />
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-4xl font-bold border-4 border-red-400 shadow-red-glow relative z-10">
                D
              </div>
              <Award className="w-8 h-8 text-yellow-500 absolute -top-2 -right-2 z-20 drop-shadow-lg" />
            </div>
            <div className="text-left">
              <p className="text-sm md:text-base text-red-400/90 font-semibold uppercase tracking-wider">
                Chief Guest
              </p>
              <p className="text-3xl md:text-4xl font-black text-white my-2 drop-shadow-lg">
                DARSHANTHOGUDEEPA
              </p>
              <p className="text-sm md:text-base italic text-gray-300">
                Technology Innovator & Industry Leader
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-8">
        {/* Search and Filter */}
        <div className="bg-gradient-to-br from-gray-900 to-red-950/30 border-2 border-red-500/20 rounded-lg p-6 space-y-4 shadow-red-glow">
          <div className="flex items-center gap-3 p-3 bg-black/50 rounded-lg border border-red-500/20">
            <Search className="w-5 h-5 text-red-400" />
            <input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-none text-white placeholder-gray-500"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {eventTypes.map((type) => (
              <button
                key={type}
                className={`px-4 py-2 rounded-full font-bold transition-all duration-300 ${
                  filterType === type
                    ? "bg-red-500 text-white shadow-lg shadow-red-500/50"
                    : "bg-gray-800 text-gray-300 border border-red-500/30 hover:border-red-500 hover:bg-gray-700"
                }`}
                onClick={() => setFilterType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-900 to-red-950/30 border-2 border-red-500/20 rounded-lg p-6 flex items-center gap-4 shadow-red-glow hover:shadow-strong transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-red-glow">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-semibold">
                Total Events
              </p>
              <p className="text-3xl font-bold text-white">{events.length}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-red-950/30 border-2 border-red-500/20 rounded-lg p-6 flex items-center gap-4 shadow-red-glow hover:shadow-strong transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-red-glow">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-semibold">
                Total Participants
              </p>
              <p className="text-3xl font-bold text-white">{totalAttendees}</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-red-950/30 border-2 border-red-500/20 rounded-lg p-6 flex items-center gap-4 shadow-red-glow hover:shadow-strong transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-red-glow">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-400 font-semibold">
                Upcoming Events
              </p>
              <p className="text-3xl font-bold text-white">{upcomingEvents}</p>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onRegister={(e) => openModal("register", e)}
              onEdit={(e) => openModal("edit", e)}
              onDelete={handleDeleteEvent}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="bg-gradient-to-br from-gray-900 to-red-950/30 border-2 border-red-500/20 rounded-lg p-12 text-center shadow-red-glow">
            <p className="text-gray-400 text-lg">
              No events found matching your criteria
            </p>
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-red-950 to-gray-900 mt-20 border-t-2 border-red-500">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>events@cityengineering.edu</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 123-456-7890</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Address</h4>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-1" />
                <p>
                  City Engineering College
                  <br />
                  Engineering Campus Road
                  <br />
                  Bangalore, Karnataka 560001
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <p className="cursor-pointer hover:underline hover:text-red-400 transition-colors">
                  About Us
                </p>
                <p className="cursor-pointer hover:underline hover:text-red-400 transition-colors">
                  Departments
                </p>
                <p className="cursor-pointer hover:underline hover:text-red-400 transition-colors">
                  Admissions
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>© 2025 City Engineering College. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* Modal */}
      <EventModal
        open={showModal}
        onClose={closeModal}
        onSubmit={
          modalMode === "register" ? handleRegisterAttendee : handleSubmitEvent
        }
        event={selectedEvent}
        mode={modalMode}
      />
    </div>
  );
}
