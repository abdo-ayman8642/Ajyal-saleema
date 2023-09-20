// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import departments from 'src/store/lms/admin/subjects-classes/departments'
import grades from 'src/store/lms/admin/subjects-classes/grades'
import classes from 'src/store/lms/admin/subjects-classes/classes'
import subjects from 'src/store/lms/admin/subjects-classes/subjects'
import student from './apps/student'
import sessions from './apps/sessions'
import teachers from './apps/teachers'
import exams from './apps/exams'
import academicData from './apps/academicData'
import attendance from './apps/attendance'
import events from './apps/events'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    departments,
    grades,
    classes,
    subjects,
    student,
    sessions,
    teachers,
    exams,
    academicData,
    attendance,
    events
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
