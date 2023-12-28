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

// function to create a new course
export const createNewCourse = createAsyncThunk(
  "/get/courses",
  async (data) => {
    try {
      // creating the form data from user data
      let formData = new FormData();
      formData.append("title", data?.title);
      formData.append("description", data?.description);
      formData.append("category", data?.category);
      formData.append("createdBy", data?.createdBy);
      formData.append("thumbnail", data?.thumbnail);

      const res = axiosInstance.post("/courses", formData);

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

const courseSlice=createSlice({
    name:'courses',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
              state.coursesData = [...action.payload];
            }
          });

    }
});

export default courseSlice.reducer;