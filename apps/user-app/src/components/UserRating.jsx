import { useState, useEffect } from "react";

export default function UserRating({ userId, swapId, role = "learner", onRated }) {
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [avg, setAvg] = useState(null);
  const [count, setCount] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:4000/api/rating/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setAvg(data.average);
        setCount(data.count);
      });
  }, [userId, success]);

  async function submitRating(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:4000/api/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, stars: rating, role, swapId }),
      });
      if (!res.ok) throw new Error("Failed to submit rating");
      setSuccess("Thank you for your rating!");
      setRating(0);
      onRated && onRated();
    } catch (err) {
      setError(err.message || "Failed to submit rating");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="my-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold">Rating:</span>
        {avg !== null ? (
          <span className="text-yellow-500 font-bold">{avg.toFixed(1)} / 5</span>
        ) : (
          <span className="text-gray-400">No ratings yet</span>
        )}
        {count > 0 && <span className="text-xs text-gray-500">({count})</span>}
      </div>
      <form className="flex items-center gap-2" onSubmit={submitRating}>
        {[1, 2, 3, 4, 5].map(i => (
          <button
            type="button"
            key={i}
            className={`text-2xl ${i <= rating ? "text-yellow-400" : "text-gray-300"}`}
            onClick={() => setRating(i)}
            disabled={submitting}
            aria-label={`Rate ${i} star${i > 1 ? "s" : ""}`}
          >
            ★
          </button>
        ))}
        <button
          className="ml-2 px-3 py-1 bg-indigo-600 text-white rounded disabled:opacity-50"
          type="submit"
          disabled={submitting || !rating}
        >
          Submit
        </button>
      </form>
      {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
      {success && <div className="text-green-600 text-sm mt-1">{success}</div>}
    </div>
  );
}
