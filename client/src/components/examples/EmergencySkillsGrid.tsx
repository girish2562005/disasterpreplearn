import EmergencySkillsGrid from '../EmergencySkillsGrid';

export default function EmergencySkillsGridExample() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <EmergencySkillsGrid 
        onSkillStart={(skillId) => console.log('Starting skill:', skillId)}
      />
    </div>
  );
}