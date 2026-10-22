/** The squares shown and shared after a quiz: ✅ for right, ⬜ for wrong. Order is the order of the questions. */
export function squares(marks: boolean[]): string {
  return marks.map((m) => (m ? "🟩" : "⬜")).join("");
}

export function shareText({ title, day, marks, takeaway, link }: { title: string; day: number; marks: boolean[]; takeaway: string; link: string }): string {
  const row = marks.length ? `${squares(marks)} ${marks.filter(Boolean).length}/${marks.length}\n` : "";
  return `make me cool · day ${day}\n${title}\n${row}\n"${takeaway}"\n\nplay it free: ${link}`;
}
