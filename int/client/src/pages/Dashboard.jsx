import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const loadData = async () => {
      try {
        const profileRes = await api.get("/auth/profile");
        setProfile(profileRes.data);

        const taskRes = await api.get("/tasks");
        setTasks(taskRes.data);
      } catch (error) {
        console.error("Dashboard load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

 
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await api.post("/tasks", { title });
      setTitle("");
      loadTasks();
    } catch (error) {
      console.error("Add task error:", error);
    }
  };

 
  const loadTasks = async () => {
    const res = await api.get("/tasks");
    setTasks(res.data);
  };

 
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (error) {
      console.error("Delete task error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
      
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-bold mb-1">
            Welcome, {profile?.name}
          </h2>
          <p className="text-gray-500">{profile?.email}</p>
        </div>

       
        <div className="flex gap-3 mb-4">
          <input
            className="flex-1 border p-3 rounded"
            placeholder="Add new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={addTask}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 rounded"
          >
            Add
          </button>
        </div>

        
        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="space-y-3">
          {tasks
            .filter((task) =>
              task.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >
                <span>{task.title}</span>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            ))}

          {tasks.length === 0 && (
            <p className="text-gray-500 text-center">
              No tasks found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
