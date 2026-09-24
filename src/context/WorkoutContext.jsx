"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const WorkoutContext = createContext();

export function WorkoutProvider({ children }) {
  const [todayPlan, setTodayPlan] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // LocalStorage থেকে ডেটা লোড
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog_today_plan");
      const storedSaved = localStorage.getItem("fitlog_saved_workouts");
      if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
      if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // LocalStorage আপডেট
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog_today_plan", JSON.stringify(todayPlan));
      localStorage.setItem("fitlog_saved_workouts", JSON.stringify(savedWorkouts));
    }
  }, [todayPlan, savedWorkouts, isLoaded]);

  // Add to Today's Plan
  const addToTodayPlan = (workout) => {
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.error("Already in your today's plan!");
      return;
    }
    if (todayPlan.length >= 5) {
      toast.error("Cap of 5 lifts reached for today! Finish them first.");
      return;
    }
    setTodayPlan((prev) => [...prev, { ...workout, done: false }]);
    toast.success("Added to today's plan!");
  };

  // Save for Later
  const addToSaved = (workout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      toast.error("Already saved for later!");
      return;
    }
    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success("Saved for later!");
  };

  // Remove workout
  const removeFromPlan = (id) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from plan");
  };

  const removeFromSaved = (id) => {
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from saved list");
  };

  // Mark as Done toggle
  const toggleMarkAsDone = (id) => {
    setTodayPlan((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = !item.done;
          toast.success(updated ? "Marked as done!" : "Marked as uncompleted");
          return { ...item, done: updated };
        }
        return item;
      })
    );
  };

  return (
    <WorkoutContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        addToTodayPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleMarkAsDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export const useWorkout = () => useContext(WorkoutContext);