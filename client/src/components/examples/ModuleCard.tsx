import ModuleCard from '../ModuleCard';
import earthquakeImage from '@assets/generated_images/Earthquake_safety_scenario_choices_d6ed01c5.png';
import cprImage from '@assets/generated_images/CPR_training_demonstration_d3252155.png';

export default function ModuleCardExample() {
  return (
    <div className="p-6 bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ModuleCard
          title="Earthquake Safety"
          description="Learn essential earthquake preparedness skills including drop, cover, and hold techniques."
          duration="45 minutes"
          difficulty="beginner"
          progress={75}
          isLocked={false}
          completedQuizzes={3}
          totalQuizzes={4}
          imageUrl={earthquakeImage}
          onStart={() => console.log('Starting Earthquake Safety module')}
        />
        
        <ModuleCard
          title="CPR & First Aid"
          description="Master life-saving CPR techniques and basic first aid procedures for emergency situations."
          duration="60 minutes"
          difficulty="intermediate"
          progress={0}
          isLocked={false}
          completedQuizzes={0}
          totalQuizzes={5}
          imageUrl={cprImage}
          onStart={() => console.log('Starting CPR module')}
        />
        
        <ModuleCard
          title="Advanced Emergency Response"
          description="Comprehensive emergency response protocols for complex disaster scenarios."
          duration="90 minutes"
          difficulty="advanced"
          progress={0}
          isLocked={true}
          completedQuizzes={0}
          totalQuizzes={6}
          onStart={() => console.log('Module locked')}
        />
      </div>
    </div>
  );
}