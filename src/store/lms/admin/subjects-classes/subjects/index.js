import { createSlice } from '@reduxjs/toolkit';

import {
    addQuiz,
    addSubject,
    deleteQuiz,
    deleteSubject,
    editSubject,
    getAllocatedSubjects,
    getSubjectQuizzes,
    getSubjects,
    getSubjectsInClass,
} from './actions';

const initialState = {
    subjects: [],
    subjectsGroup: null,
    loading: false,
    error: null,
    success: true,
};

const subjectSlice = createSlice({
    name: 'subjects',
    initialState,
    reducers: {},
    extraReducers: {
        //Show subjects
        [getSubjects.pending]: (state) => {
            state.loading = true;
        },
        [getSubjects.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.subjects = payload.data;
        },
        [getSubjects.rejected]: (state) => {
            state.loading = false;

            //   toast.error('There is something went wrong!');
        },

        //add subject
        [addSubject.pending]: (state) => {
            state.saveLoading = true;
        },
        [addSubject.fulfilled]: (state, { payload }) => {
            state.saveLoading = false;

            if (payload.status) {
                state.subjects.push(payload.data);

                // toast.success('Added Successfully!');
            }

            if (!payload.status) {
                toast.error(payload.msg);
            }
        },
        [addSubject.rejected]: (state, action) => {
            state.saveLoading = false;

            //   toast.error('There is something went wrong!');
        },

        //edit subject
        [editSubject.pending]: (state) => {
            state.saveLoading = true;
        },
        [editSubject.fulfilled]: (state, { payload }) => {
            state.saveLoading = false;
            if (payload.status) {
                state.subjects = state.subjects.map((item) =>
                    item.id === payload.data.id ? payload.data : item
                );

                // toast.success('Updated successfully!');
            } else {
                // toast.error(payload.msg);
            }
        },
        [editSubject.rejected]: (state) => {
            state.saveLoading = false;
        },

        //delete subject
        [deleteSubject.pending]: (state) => {
            state.deleteloading = true;
        },
        [deleteSubject.fulfilled]: (state, { payload }) => {
            state.deleteloading = false;

            if (payload.data.status) {
                state.subjects = state.subjects.filter(
                    (item) => item.id !== payload.id
                );
                toast.success('Deleted successfully!');
            }

            if (!payload.data.status) {
                toast.error(payload.data.msg);
            }
        },
        [deleteSubject.rejected]: (state) => {
            state.deleteloading = false;
            toast.error('Something went wrong!');
        },

        //get allocated subject
        [getAllocatedSubjects.pending]: (state) => {
            state.deleteloading = true;
        },
        [getAllocatedSubjects.fulfilled]: (state, { payload }) => {
            state.getAllocatedloading = false;

            if (payload.status) {
                state.allocatedSubjects = payload.data.lms_subjects
            } else {
                // toast.error(payload.msg);

            }


        },
        [getAllocatedSubjects.rejected]: (state) => {
            state.getAllocatedloading = false;

            //   toast.error('Something went wrong!');
        },

        //getSubjectsInClass
        [getSubjectsInClass.pending]: (state) => {
            state.getSubjectsInClassLoading = true;
        },
        [getSubjectsInClass.fulfilled]: (state, { payload }) => {
            state.getSubjectsInClassLoading = false;

            if (payload.status) {
                state.subjectsGroup = payload.data.lms_subjects
            } else {
                // toast.error(payload.msg);
            }

        },
        [getSubjectsInClass.rejected]: (state) => {
            state.getSubjectsInClassLoading = false;

            //   toast.error('Something went wrong!');
        },

        //get subjects Quizes
        [getSubjectQuizzes.pending]: (state) => {
            state.getSubjectQuizzesLoading = true;
        },
        [getSubjectQuizzes.fulfilled]: (state, { payload }) => {
            state.getSubjectQuizzesLoading = false;

            if (payload.status) {
                state.quizzes = payload.data.lms_quizzes
            } else {
                // toast.error(payload.msg);
            }

        },
        [getSubjectQuizzes.rejected]: (state) => {
            state.getSubjectQuizzesLoading = false;

            //   toast.error('Something went wrong!');
        },

        //Delete quiz
        [deleteQuiz.pending]: (state) => {
            state.deleteQuizeLoading = true;
        },
        [deleteQuiz.fulfilled]: (state, { payload }) => {
            state.deleteQuizeLoading = false;

            if (payload.status) {
                // toast.success("Deleted Successfully!")
            } else {
                // toast.error(payload.msg);
            }

        },
        [deleteQuiz.rejected]: (state) => {
            state.deleteQuizeLoading = false;
            toast.error('Something went wrong!');
        },

        //Add quiz
        [addQuiz.pending]: (state) => {
            state.addQuizeLoading = true;
        },
        [addQuiz.fulfilled]: (state, { payload }) => {
            state.addQuizeLoading = false;

            if (payload.status) {
                toast.success("Added Successfully!")

                // state.quizes = state.quizes.push(payload.data)
            } else {
                toast.error(payload.msg);
            }

        },
        [addQuiz.rejected]: (state) => {
            state.addQuizeLoading = false;
            
            //   toast.error('Something went wrong!');
        },
    },
});

export default subjectSlice.reducer;
