export default function SkillSection({ title, skills, color, emptyText }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className={`text-lg font-bold mb-2 ${color}`}>{title}</h3>
      {skills.length === 0 ? (
        <div className="text-gray-400 italic">{emptyText}</div>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <li key={s.id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
