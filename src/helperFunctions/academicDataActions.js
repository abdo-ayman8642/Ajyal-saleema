import {
  addAdministration,
  addClass,
  addGov,
  addGrade,
  addSchool,
  addStudent,
  addYear,
  deleteAdministration,
  deleteClass,
  deleteGov,
  deleteGrade,
  deleteSchool,
  deleteStudent,
  deleteYear,
  editAdministration,
  editClass,
  editGov,
  editGrade,
  editSchool,
  editStudent,
  editYear
} from 'src/store/apps/academicData/actions'

export const handleActions = (actionType, dataType) => {
  switch (actionType) {
    case 'edit':
      switch (dataType) {
        case 'schools':
          return editSchool
          break
        case 'camps':
          return editSchool
          break
        case 'classes':
          return editClass
          break
        case 'years':
          return editYear
          break
        case 'govs':
          return editGov
          break
        case 'administrations':
          return editAdministration
          break
        case 'grades':
          return editGrade
          break
        case 'students':
          return editStudent
          break
        default:
          break
      }
      break
    case 'delete':
      switch (dataType) {
        case 'schools':
          return deleteSchool
          break
        case 'camps':
          return deleteSchool
          break
        case 'classes':
          return deleteClass
          break
        case 'years':
          return deleteYear
          break
        case 'govs':
          return deleteGov
          break
        case 'administrations':
          return deleteAdministration
          break
        case 'grades':
          return deleteGrade
          break
        case 'students':
          return deleteStudent
          break
        default:
          break
      }
      break
    case 'add':
      switch (dataType) {
        case 'schools':
          return addSchool
          break
        case 'camps':
          return addSchool
          break
        case 'classes':
          return addClass
          break
        case 'years':
          return addYear
          break
        case 'govs':
          return addGov
          break
        case 'administrations':
          return addAdministration
          break
        case 'grades':
          return addGrade
          break
        case 'students':
          return addStudent
          break
        default:
          break
      }
      break
    default:
      break
  }
}
