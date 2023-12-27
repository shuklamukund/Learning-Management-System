import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import axiosInstance from '../../Helpers/axiosInstance';
import {toast} from 'react-hot-toast'
const initialState={
    courseData:[]
}

// function to get all courses
export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
      const res = axiosInstance.get("/courses");
  
      toast.promise(res, {
        loading: "Loading courses data...",
        success: "Courses loaded successfully",
        error: "Failed to get courses",
      });
  
      const response = await res;
  
      return response.data.courses;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });

const courseSlice=createSlice({
    name:'courses',
    initialState,
    reducers:{},
    extraReducers:(bulider)=>{

    }
});

export default courseSlice.reducer;