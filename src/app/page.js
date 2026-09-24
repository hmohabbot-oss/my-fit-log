"use client";

import Link from "next/link";
import { Footer, Header, Loader, WorkoutCard, useWorkouts } from "./components";

export default function Home() {
  const { items, status, retry } = useWorkouts();
  return <><Header active="workouts" /><main><section className="hero wrap"><div><span className="eyebrow">WORKOUT LIBRARY</span><h1>TRAIN WITH INTENT.<br />LOG EVERY SET.</h1><p>FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today’s plan, and watch the week’s work add up.</p><a className="button primary" href="#library">↘ &nbsp; BROWSE WORKOUTS</a></div><img src="/banner.png" alt="Athlete lifting weights" /></section><section className="library wrap" id="library"><div className="section-heading"><div><h2>THE LIBRARY</h2><p>Twelve lifts covering every major muscle group.</p></div><span className="eyebrow">{status === "ready" ? `${items.length} WORKOUTS` : "FITLOG COLLECTION"}</span></div>{status === "ready" ? <div className="grid">{items.map((item) => <WorkoutCard item={item} key={item.id ?? item._id} />)}</div> : <Loader status={status} retry={retry} />}</section></main><Footer /></>;
}
