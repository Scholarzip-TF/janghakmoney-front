interface StatProps {
    number: string;
    label: string;
  }
  
  export const StatItem = ({ number, label }: StatProps) => (
    <div className="stat-item">
      <span className="stat-number">{number}</span>
      <span className="stat-label">{label}</span>
    </div>
  );