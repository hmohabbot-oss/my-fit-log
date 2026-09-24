# FitLog — Workout Library & Daily Fitness Planner

FitLog is a modern, responsive web application designed for gym-goers and fitness enthusiasts to browse curated workout routines, plan daily training sessions, and track cumulative workout stats[cite: 10]. Built strictly following the Figma specifications with Next.js App Router and Tailwind CSS[cite: 10, 11].

---

## 🔗 Links

- **Live URL:** [https://my-fit-log-bay.vercel.app/]
- **GitHub Repository:** [https://github.com/hmohabbot-oss/my-fit-log.git]

---

## 📋 Overview

The primary goal of this project is to provide a dark-themed, distraction-free interface where users can fetch workout data from an external API, review detailed movement instructions, and manage their daily lifting routine[cite: 10]. It features dynamic metrics calculation, tab-based routine management, sorting capabilities, and persistent local storage[cite: 10, 11].

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)[cite: 11]
- **Frontend Library:** React
- **Styling:** Tailwind CSS[cite: 11]
- **Icons:** Lucide React
- **Notifications:** React Hot Toast[cite: 10]
- **State Management:** React Context API & Browser LocalStorage[cite: 11]

---

## ⚡ Key Features

1. **Responsive Workout Library Grid:** Dynamic data fetching from the FitLog API, rendered as a 3-column responsive card layout displaying workout tags, equipment, duration, calories, and user ratings[cite: 10].
2. **Deep-Dive Workout Details:** Dedicated dynamic pages (`/workout/[id]`) showing complete exercise specifications (sets, reps, difficulty, equipment) alongside ordered movement instructions[cite: 10].
3. **Daily Routine & Watchlist Manager:** Allows adding lifts to "Today's Plan" (enforcing a daily maximum cap of 5 lifts) or saving them for future reference, with live counter badges in the navigation bar[cite: 10, 11].
4. **Real-Time Dynamic Metric Tracker:** Dashboard stats on `/my-plan` that calculate total exercises, minutes, and burned calories dynamically based on the active tab[cite: 10].
5. **Sort & Routine Action Controls:** Built-in sorting filter by Duration, Calories, or Rating, along with "Mark as Done" completion toggles and removal options for each logged lift[cite: 10, 11].
6. **State Persistence & Validation:** Prevents duplicate entries with responsive toast alerts and keeps user plans intact across browser refreshes via localStorage integration[cite: 10, 11].

---

## 💻 Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/fit-log.git](https://github.com/your-username/fit-log.git)
   cd fit-log