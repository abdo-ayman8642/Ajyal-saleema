// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline'
import ClassIcon from '@mui/icons-material/Class'
import NoteAltIcon from '@mui/icons-material/NoteAlt'
import SchoolIcon from '@mui/icons-material/School'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SummarizeIcon from '@mui/icons-material/Summarize'
import QuizIcon from '@mui/icons-material/Quiz'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import EventIcon from '@mui/icons-material/Event'

const navigation = () => {
  const user = useAuth()
  const role = user?.user?.role
  console.log(role)
  const volNav = [
    {
      title: 'الرئيسية',
      icon: HomeOutline,
      path: '/home'
    },
    {
      title: 'الأعوام الدراسية',
      icon: CalendarMonthIcon,
      path: '/academicYear'
    },
    {
      title: 'الإختبارات',
      icon: QuizIcon,
      path: '/exams'
    }
  ]
  const normalNav = [
    {
      title: 'الرئيسية',
      icon: HomeOutline,
      path: '/home'
    },
    {
      title: 'الأعوام الدراسية',
      icon: CalendarMonthIcon,
      path: '/academicYear'
    },

    {
      title: 'الأعضاء',
      icon: PeopleAltIcon,
      path: '/users'
    },
    // {
    //   title: 'الطلاب',
    //   icon: SchoolIcon,
    //   path: '/student'
    // },
    {
      title: 'الحصص',
      icon: ClassIcon,
      path: '/sessions'
    },
    {
      title: 'الأحداث',
      icon: EventIcon,
      path: '/events'
    },
    // {
    //   title: 'التقارير',
    //   icon: SummarizeIcon,
    //   path: '/reports'
    // },
    {
      title: 'المدرسين',
      icon: NoteAltIcon,
      path: '/teachers'
    },
    {
      title: 'الإختبارات',
      icon: QuizIcon,
      path: '/exams'
    },
    {
      title: 'الحضور',
      icon: HowToRegIcon,
      path: '/attendance'
    }
  ]
  const usedNav = role != 2 ? normalNav : volNav
  return [...usedNav]
}

export default navigation
