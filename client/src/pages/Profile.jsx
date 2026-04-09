import { useEffect, useState } from "react";
import { getAllResources, deleteResource } from "../services/api.js";
import ResourceCard from "../components/ResourceCard.jsx";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [myResources, setMyResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await getAllResources();
        const userData = JSON.parse(atob(token.split(".")[1]));
        const filtered = res.data.filter((r) => r.user._id === userData.id);
        setMyResources(filtered);
      } catch (error) {
        console.error("Error fetching profile resources:", error);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchResources();
  }, [token]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;
    try {
      await deleteResource(id, token);
      setMyResources((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Failed to delete resource:", err);
    }
  };

  const handleUpdate = (id) => {
    // Navigate to a separate update page (you need to implement UpdateResource page)
    navigate(`/update-resource/${id}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-12 relative">
  {/* Background Decorative Elements */}
  <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

  <div className="max-w-7xl mx-auto relative z-10">
    {/* Profile Header Card */}
    <div className="mb-12 p-8 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>

      <div className="relative">
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">My Collection</h1>
        <p className="text-slate-400 font-medium">
          Managing <span className="text-purple-400">{myResources.length}</span> published resources
        </p>
      </div>
    </div>

    {/* Content Grid */}
    {loading ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-64 bg-white/5 rounded-3xl animate-pulse border border-white/5"
          />
        ))}
      </div>
    ) : myResources.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
        {myResources.map((res) => (
          <div key={res._id} className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <ResourceCard resource={res} />

            {/* Delete Button */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleDelete(res._id)}
                className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center py-20 px-6 rounded-[2rem] border-2 border-dashed border-white/10 bg-white/[0.02]">
        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
          <svg
            className="w-8 h-8 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No Resources Yet</h3>
        <p className="text-slate-400 text-center max-w-sm">
          You haven't uploaded any documents. Start sharing your knowledge with the community!
        </p>
      </div>
    )}
  </div>
</div>
  );
};

export default Profile;
