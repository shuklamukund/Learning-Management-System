import {configureStore} from '@reduxjs/toolkit';
import authSliceReducer from './Slices/AuthSlice';
import courseSliceReducer from './Slices/CourseSlice';
import lectureSliceReducer from './Slices/LectureSlice';
import razorpaySliceReducer from './Slices/RazorpaySlice';
import statSliceReducer from './Slices/statSlice'
const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        course:courseSliceReducer,
        lecture:lectureSliceReducer,
        razorpay:razorpaySliceReducer,
        stat:statSliceReducer,
    },
    devTools:true
})

export default store; 