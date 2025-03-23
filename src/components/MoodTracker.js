import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const emojis = ["😄", "🙂", "😐", "😔", "😢"];

const MoodTracker = () => {
  const [selected, setSelected] = useState("");
  const [currentMood, setCurrentMood] = useState("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchMood = async () => {
      const moodRef = collection(db, "moods");
      const q = query(moodRef, where("date", "==", today));
      const snap = await getDocs(q);
      if (!snap.empty) {
        const mood = snap.docs[0].data().mood;
        setCurrentMood(mood);
        setSelected(mood);
      }
    };
    fetchMood();
  }, []);

  const saveMood = async (mood) => {
    setSelected(mood);
    try {
      await addDoc(collection(db, "moods"), {
        mood,
        date: today,
      });
      setCurrentMood(mood);
      toast.success("🌟 Mood saved!");
    } catch (err) {
      toast.error("❌ Failed to save mood");
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>🧠 How are you feeling today?</h3>
      <div style={{ fontSize: "2rem" }}>
        {emojis.map((emo) => (
          <button
            key={emo}
            style={{
              background: selected === emo ? "#fbab57" : "transparent",
              border: "none",
              fontSize: "2rem",
              margin: "0.25rem",
              cursor: "pointer",
            }}
            onClick={() => saveMood(emo)}
          >
            {emo}
          </button>
        ))}
      </div>
      {currentMood && (
        <p style={{ marginTop: "1rem" }}>Today's mood: <strong>{currentMood}</strong></p>
      )}
    </div>
  );
};

export default MoodTracker;
