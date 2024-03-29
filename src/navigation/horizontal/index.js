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
  const permissions = user?.user?.permissions?.nav

  const usedNav = []

  usedNav.push({
    title: 'الرئيسية',
    icon: HomeOutline,
    path: '/home'
  })

  permissions?.['academic'] &&
    usedNav.push({
      title: 'الأعوام الدراسية',
      icon: CalendarMonthIcon,
      path: '/academicYear'
    })

  permissions?.['teachers'] &&
    usedNav.push({
      title: 'المدرسين',
      icon: NoteAltIcon,
      path: '/teachers'
    })

  permissions?.['sessions'] &&
    usedNav.push({
      title: 'الحصص',
      icon: ClassIcon,
      path: '/sessions'
    })

  permissions?.['exams'] &&
    usedNav.push({
      title: 'الإختبارات',
      icon: QuizIcon,
      path: '/exams'
    })

  permissions?.['events'] &&
    usedNav.push({
      title: 'الأحداث',
      icon: EventIcon,
      path: '/events'
    })

  permissions?.['attendance'] &&
    usedNav.push({
      title: 'الحضور',
      icon: HowToRegIcon,
      path: '/attendance'
    })

  usedNav.push({
    title: 'الأعضاء',
    icon: PeopleAltIcon,
    path: '/users'
  })

  //const usedNav = role != 2 ? normalNav : volNav
  return [...usedNav]
}

export default navigation
