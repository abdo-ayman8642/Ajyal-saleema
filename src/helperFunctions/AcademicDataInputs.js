export const academicDataInputs = formType => {
  switch (formType) {
    case 'years':
      return {
        formInputs: [
          {
            name: 'name',
            label: 'السنة'
          }
        ],
        title: 'العام'
      }

      break

    case 'govs':
      return {
        formInputs: [
          {
            name: 'name',
            label: 'المحافظة'
          },
          {
            name: 'code',
            label: 'ادخل الكود'
          }
        ],
        title: 'المحافظة'
      }

      break
    case 'grades':
      return {
        formInputs: [
          {
            name: 'name',
            label: 'المرحلة التعليمية'
          }
        ],
        title: 'المرحلة التعليمية'
      }

      break
    case 'schools':
      return {
        formInputs: [
          {
            name: 'name',
            label: 'المدرسة'
          },
          {
            name: 'code',
            label: 'ادخل الكود'
          }
        ],
        title: 'إضافة المدرسة'
      }

      break
    case 'administrations':
      return {
        formInputs: [
          {
            name: 'name',
            label: 'الإدارة التعليمية'
          },
          {
            name: 'code',
            label: 'ادخل الكود'
          }
        ],
        title: 'إضافة إدارة'
      }

      break
    case 'camps':
      return {
        formInputs: [
          {
            name: 'name',
            label: 'الكامب'
          },
          {
            name: 'code',
            label: 'ادخل الكود'
          }
        ],
        title: 'إضافة كامب'
      }

      break
    case 'classes':
      return {
        formInputs: [
          {
            name: 'name',
            label: 'الفصل'
          }
        ],
        title: 'إضافة فصل'
      }

      break
    case 'students':
      return {
        formInputs: [
          {
            name: 'name',
            label: 'اسم الطالب'
          },
          {
            name: 'gender',
            label: 'الجنس',
            type: 'select',
            options: [
              {
                value: 'male',
                label: 'ذكر'
              },
              {
                value: 'female',
                label: 'انثي'
              }
            ]
          },
          {
            name: 'date',
            label: 'تاريخ',
            type: 'date'
          }
        ],
        title: 'إضافة طالب'
      }

      break
    default:
      break
  }
}
