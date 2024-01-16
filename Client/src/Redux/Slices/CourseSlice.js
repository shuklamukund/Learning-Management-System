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
  
      console.log('data response>',(await res).data);
      return response.data.courses;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  });

// function to create a new course
export const createNewCourse = createAsyncThunk(
  "/get/courses",
  async (data) => {
    console.log('data we are sending',data);
    try {
      
      const res =await axiosInstance.post("/courses", data);

      console.log('res is',res);
      toast.promise(res, {
        loading: "Creating the course...",
        success: "Course created successfully",
        error: "Failed to create course",
      });

      const response = await res;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }
);

// function to delete the course
export const deleteCourse = createAsyncThunk("/course/delete", async (id) => {
  try {
    const res = axiosInstance.delete(`courses/${id}`);

    toast.promise(res, {
      loading: "Deleting the course...",
      success: "Courses deleted successfully",
      error: "Failed to delete course",
    });

    const response = await res;

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
});

const courseSlice=createSlice({
    name:'courses',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
              state.courseData = [...action.payload];
            }
          });

    }
});

export default courseSlice.reducer;