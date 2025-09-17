import { createContext, useContext, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

type Language = 'en' | 'hi' | 'pa' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.modules': 'Learning Modules',
    'nav.emergency': 'Emergency Skills',
    'nav.scenarios': 'Scenarios',
    'nav.achievements': 'Achievements',
    'nav.profile': 'Profile',
    'nav.students': 'My Students',
    'nav.reports': 'Progress Reports',
    
    // Auth
    'auth.title': 'DisasterPrep Learn',
    'auth.description': 'Access your emergency preparedness training platform',
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.fullName': 'Full Name',
    'auth.role': 'Role',
    'auth.student': 'Student',
    'auth.teacher': 'Teacher',
    'auth.admin': 'Administrator',
    'auth.signIn': 'Sign In',
    'auth.createAccount': 'Create Account',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back to your emergency preparedness training',
    'dashboard.totalUsers': 'Total Users',
    'dashboard.activeStudents': 'Active Students',
    'dashboard.completedModules': 'Completed Modules',
    'dashboard.averageScore': 'Average Score',
    'dashboard.passRate': 'Pass Rate',
    
    // Modules
    'modules.title': 'Learning Modules',
    'modules.description': 'Choose a module to start your emergency preparedness training',
    'modules.earthquake': 'Earthquake Safety',
    'modules.earthquakeDesc': 'Learn essential earthquake preparedness skills including drop, cover, and hold techniques',
    'modules.cpr': 'CPR & First Aid',
    'modules.cprDesc': 'Master life-saving CPR techniques and basic first aid procedures',
    'modules.advanced': 'Advanced Emergency Response',
    'modules.advancedDesc': 'Comprehensive emergency response protocols for complex disaster scenarios',
    
    // Emergency Skills
    'emergency.title': 'Emergency Skills Training',
    'emergency.description': 'Learn essential life-saving techniques for various emergency situations',
    'emergency.cpr': 'CPR Training',
    'emergency.cprDesc': 'Learn cardiopulmonary resuscitation techniques',
    'emergency.fainting': 'Fainting Response',
    'emergency.faintingDesc': 'How to help someone who has fainted',
    'emergency.ors': 'ORS Preparation',
    'emergency.orsDesc': 'Oral rehydration solution preparation',
    'emergency.beeSting': 'Bee Sting Treatment',
    'emergency.beeStingDesc': 'First aid for bee stings and allergic reactions',
    'emergency.snakeBite': 'Snake Bite Emergency',
    'emergency.snakeBiteDesc': 'Critical response to snake bite incidents',
    
    // Achievements
    'achievements.title': 'Your Achievements',
    'achievements.description': 'Celebrate your emergency preparedness milestones',
    'achievements.firstAid': 'First Aid Expert',
    'achievements.cprHero': 'CPR Hero',
    'achievements.earthquakeSurvivor': 'Earthquake Survivor',
    'achievements.fireSafety': 'Fire Safety Champion',
    'achievements.emergencyKit': 'Emergency Kit Master',
    'achievements.quickResponse': 'Quick Response Award',
    
    // Common
    'common.start': 'Start',
    'common.continue': 'Continue',
    'common.complete': 'Complete',
    'common.locked': 'Locked',
    'common.progress': 'Progress',
    'common.logout': 'Logout',
    'common.backToHome': 'Back to Home',
    'common.getStarted': 'Get Started',
    'common.signIn': 'Sign In'
  },
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.modules': 'सीखने के मॉड्यूल',
    'nav.emergency': 'आपातकालीन कौशल',
    'nav.scenarios': 'परिस्थितियां',
    'nav.achievements': 'उपलब्धियां',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.students': 'मेरे छात्र',
    'nav.reports': 'प्रगति रिपोर्ट',
    
    // Auth
    'auth.title': 'डिजास्टर प्रेप लर्न',
    'auth.description': 'अपने आपातकालीन तैयारी प्रशिक्षण प्लेटफॉर्म तक पहुंचें',
    'auth.login': 'लॉगिन',
    'auth.signup': 'साइन अप',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.fullName': 'पूरा नाम',
    'auth.role': 'भूमिका',
    'auth.student': 'छात्र',
    'auth.teacher': 'शिक्षक',
    'auth.admin': 'प्रशासक',
    'auth.signIn': 'साइन इन करें',
    'auth.createAccount': 'खाता बनाएं',
    
    // Dashboard
    'dashboard.welcome': 'आपकी आपातकालीन तैयारी प्रशिक्षण में वापस स्वागत है',
    'dashboard.totalUsers': 'कुल उपयोगकर्ता',
    'dashboard.activeStudents': 'सक्रिय छात्र',
    'dashboard.completedModules': 'पूर्ण मॉड्यूल',
    'dashboard.averageScore': 'औसत स्कोर',
    'dashboard.passRate': 'पास दर',
    
    // Modules
    'modules.title': 'सीखने के मॉड्यूल',
    'modules.description': 'अपनी आपातकालीन तैयारी प्रशिक्षण शुरू करने के लिए एक मॉड्यूल चुनें',
    'modules.earthquake': 'भूकंप सुरक्षा',
    'modules.earthquakeDesc': 'ड्रॉप, कवर और होल्ड तकनीकों सहित आवश्यक भूकंप तैयारी कौशल सीखें',
    'modules.cpr': 'सीपीआर और प्राथमिक चिकित्सा',
    'modules.cprDesc': 'जीवन रक्षक सीपीआर तकनीकों और बुनियादी प्राथमिक चिकित्सा प्रक्रियाओं में महारत हासिल करें',
    'modules.advanced': 'उन्नत आपातकालीन प्रतिक्रिया',
    'modules.advancedDesc': 'जटिल आपदा परिदृश्यों के लिए व्यापक आपातकालीन प्रतिक्रिया प्रोटोकॉल',
    
    // Emergency Skills
    'emergency.title': 'आपातकालीन कौशल प्रशिक्षण',
    'emergency.description': 'विभिन्न आपातकालीन स्थितियों के लिए आवश्यक जीवन रक्षक तकनीकें सीखें',
    'emergency.cpr': 'सीपीआर प्रशिक्षण',
    'emergency.cprDesc': 'कार्डियोपल्मोनरी रिससिटेशन तकनीकें सीखें',
    'emergency.fainting': 'बेहोशी की प्रतिक्रिया',
    'emergency.faintingDesc': 'बेहोश हुए व्यक्ति की मदद कैसे करें',
    'emergency.ors': 'ओआरएस तैयारी',
    'emergency.orsDesc': 'मौखिक पुनर्जलीकरण समाधान तैयारी',
    'emergency.beeSting': 'मधुमक्खी के डंक का इलाज',
    'emergency.beeStingDesc': 'मधुमक्खी के डंक और एलर्जी प्रतिक्रियाओं के लिए प्राथमिक चिकित्सा',
    'emergency.snakeBite': 'सांप काटने की आपातकाल',
    'emergency.snakeBiteDesc': 'सांप काटने की घटनाओं के लिए महत्वपूर्ण प्रतिक्रिया',
    
    // Achievements
    'achievements.title': 'आपकी उपलब्धियां',
    'achievements.description': 'अपनी आपातकालीन तैयारी की उपलब्धियों का जश्न मनाएं',
    'achievements.firstAid': 'प्राथमिक चिकित्सा विशेषज्ञ',
    'achievements.cprHero': 'सीपीआर हीरो',
    'achievements.earthquakeSurvivor': 'भूकंप सर्वाइवर',
    'achievements.fireSafety': 'अग्नि सुरक्षा चैंपियन',
    'achievements.emergencyKit': 'आपातकालीन किट मास्टर',
    'achievements.quickResponse': 'त्वरित प्रतिक्रिया पुरस्कार',
    
    // Common
    'common.start': 'शुरू करें',
    'common.continue': 'जारी रखें',
    'common.complete': 'पूर्ण',
    'common.locked': 'लॉक',
    'common.progress': 'प्रगति',
    'common.logout': 'लॉगआउट',
    'common.backToHome': 'होम पर वापस',
    'common.getStarted': 'शुरू करें',
    'common.signIn': 'साइन इन करें'
  },
  pa: {
    // Navigation
    'nav.dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'nav.modules': 'ਸਿੱਖਣ ਮਾਡਿਊਲ',
    'nav.emergency': 'ਐਮਰਜੈਂਸੀ ਸਕਿਲਸ',
    'nav.scenarios': 'ਹਾਲਾਤ',
    'nav.achievements': 'ਪ੍ਰਾਪਤੀਆਂ',
    'nav.profile': 'ਪ੍ਰੋਫਾਈਲ',
    'nav.students': 'ਮੇਰੇ ਵਿਦਿਆਰਥੀ',
    'nav.reports': 'ਪ੍ਰਗਤੀ ਰਿਪੋਰਟਾਂ',
    
    // Auth
    'auth.title': 'ਡਿਜ਼ਾਸਟਰ ਪ੍ਰੈਪ ਲਰਨ',
    'auth.description': 'ਆਪਣੇ ਐਮਰਜੈਂਸੀ ਤਿਆਰੀ ਸਿਖਲਾਈ ਪਲੇਟਫਾਰਮ ਤੱਕ ਪਹੁੰਚ ਪ੍ਰਾਪਤ ਕਰੋ',
    'auth.login': 'ਲਾਗਇਨ',
    'auth.signup': 'ਸਾਈਨ ਅੱਪ',
    'auth.email': 'ਈਮੇਲ',
    'auth.password': 'ਪਾਸਵਰਡ',
    'auth.fullName': 'ਪੂਰਾ ਨਾਮ',
    'auth.role': 'ਭੂਮਿਕਾ',
    'auth.student': 'ਵਿਦਿਆਰਥੀ',
    'auth.teacher': 'ਅਧਿਆਪਕ',
    'auth.admin': 'ਪ੍ਰਸ਼ਾਸਕ',
    'auth.signIn': 'ਸਾਈਨ ਇਨ ਕਰੋ',
    'auth.createAccount': 'ਖਾਤਾ ਬਣਾਓ',
    
    // Dashboard
    'dashboard.welcome': 'ਤੁਹਾਡੀ ਐਮਰਜੈਂਸੀ ਤਿਆਰੀ ਸਿਖਲਾਈ ਵਿੱਚ ਵਾਪਸ ਜੀ ਆਇਆਂ ਨੂੰ',
    'dashboard.totalUsers': 'ਕੁੱਲ ਉਪਭੋਗਤਾ',
    'dashboard.activeStudents': 'ਸਰਗਰਮ ਵਿਦਿਆਰਥੀ',
    'dashboard.completedModules': 'ਪੂਰੇ ਮਾਡਿਊਲ',
    'dashboard.averageScore': 'ਔਸਤ ਸਕੋਰ',
    'dashboard.passRate': 'ਪਾਸ ਦਰ',
    
    // Common
    'common.start': 'ਸ਼ੁਰੂ ਕਰੋ',
    'common.continue': 'ਜਾਰੀ ਰੱਖੋ',
    'common.complete': 'ਪੂਰਾ',
    'common.locked': 'ਬੰਦ',
    'common.progress': 'ਪ੍ਰਗਤੀ',
    'common.logout': 'ਲਾਗਆਉਟ',
    'common.backToHome': 'ਘਰ ਵਾਪਸ',
    'common.getStarted': 'ਸ਼ੁਰੂ ਕਰੋ',
    'common.signIn': 'ਸਾਈਨ ਇਨ ਕਰੋ'
  },
  mr: {
    // Navigation
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.modules': 'शिकण्याचे मॉड्यूल',
    'nav.emergency': 'आणीबाणीचे कौशल्य',
    'nav.scenarios': 'परिस्थिती',
    'nav.achievements': 'सिद्धी',
    'nav.profile': 'प्रोफाइल',
    'nav.students': 'माझे विद्यार्थी',
    'nav.reports': 'प्रगती अहवाल',
    
    // Auth
    'auth.title': 'डिझास्टर प्रेप लर्न',
    'auth.description': 'तुमच्या आणीबाणी तयारी प्रशिक्षण प्लॅटफॉर्मवर प्रवेश मिळवा',
    'auth.login': 'लॉगिन',
    'auth.signup': 'साइन अप',
    'auth.email': 'ईमेल',
    'auth.password': 'पासवर्ड',
    'auth.fullName': 'पूर्ण नाव',
    'auth.role': 'भूमिका',
    'auth.student': 'विद्यार्थी',
    'auth.teacher': 'शिक्षक',
    'auth.admin': 'प्रशासक',
    'auth.signIn': 'साइन इन करा',
    'auth.createAccount': 'खाते तयार करा',
    
    // Dashboard
    'dashboard.welcome': 'तुमच्या आणीबाणी तयारी प्रशिक्षणात परत येण्यास स्वागत',
    'dashboard.totalUsers': 'एकूण वापरकर्ते',
    'dashboard.activeStudents': 'सक्रिय विद्यार्थी',
    'dashboard.completedModules': 'पूर्ण मॉड्यूल',
    'dashboard.averageScore': 'सरासरी गुण',
    'dashboard.passRate': 'उत्तीर्ण दर',
    
    // Common
    'common.start': 'सुरुवात करा',
    'common.continue': 'चालू ठेवा',
    'common.complete': 'पूर्ण',
    'common.locked': 'लॉक',
    'common.progress': 'प्रगती',
    'common.logout': 'लॉगआउट',
    'common.backToHome': 'घरी परत',
    'common.getStarted': 'सुरुवात करा',
    'common.signIn': 'साइन इन करा'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    console.log('Language changed to:', lang);
  };

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' }
  ];

  return (
    <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
      <SelectTrigger className="w-40" data-testid="select-language">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}