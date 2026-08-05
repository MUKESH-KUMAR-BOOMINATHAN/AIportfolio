export interface ActivityItem {
  title: string;
  iconName: "Mic" | "Megaphone" | "MessageSquareText" | "PenTool";
  achievement: string;
  description: string;
  tag: string;
}

export const ACTIVITIES: ActivityItem[] = [
  {
    title: "Emceeing & Event Hosting",
    iconName: "Mic",
    achievement: "University Main Stage Coordinator",
    tag: "Communication",
    description: "Hosted the main stage for university-level mega fests, including official College Day celebrations and the annual Pongal Fest. Managed stage scheduling and directed live audiences of over 2,000+ students, faculty, and VIP guests."
  },
  {
    title: "Adzap (Improv Ad Pitching)",
    iconName: "Megaphone",
    achievement: "2nd Prize — Techutsav National Level Symposium",
    tag: "Improvisation & Sales",
    description: "Won second place in a high-pressure, competitive product-pitching event. Formulated and delivered a creative, persuasive sales pitch for a randomly assigned, bizarre product within a strict 60-second limit."
  },
  {
    title: "Competitive Debating",
    iconName: "MessageSquareText",
    achievement: "Finalist — SRM University Milan Intercollege",
    tag: "Critical Thinking",
    description: "Represented my college and debated complex contemporary topics focusing on AI ethics, digital privacy, and technology policies at the prestigious Milan inter-college cultural festival hosted by SRM University."
  },
  {
    title: "Creative Script Writing",
    iconName: "PenTool",
    achievement: "1st Prize — SRM University Milan Intercollege",
    tag: "Creative Storytelling",
    description: "Awarded first place at the national-level festival Milan for writing an original theatrical script. Focused on structuring narrative dialogues, scene pacing, and developing engaging character arcs."
  }
];
