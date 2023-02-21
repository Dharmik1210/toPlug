const fileterList = [
  'all',
  'mine',
  'webdevlopment',
  'appdevelopment',
  'design',
  'marketing',
  'sales',
];
export default function ProejctFilter({ currentFilter, changeFilter }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };
  return (
    <div className="project-filter">
      <nav>
        <p>Filter by:</p>
        {fileterList.map((filter) => (
          <button
            key={filter}
            onClick={() => handleClick(filter)}
            className={currentFilter === filter ? 'active' : ''}
          >
            {filter}
          </button>
        ))}
      </nav>
    </div>
  );
}
