import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserDetails, ImageData } from "../types";

type SliceState = {
    loading: boolean;
    isUserDataRetrieved: boolean;
    error: string | undefined;
    userData: UserDetails;
    authToken: string | undefined;
}

export const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        isUserDataRetrieved: false,
        error: undefined,
        userData: {
            username: '',
            userId: '',
            userBio: '',
            profileImageUrl: '',
            images: [],
            feedImages: [],
            followers: [],
            followings: [],
            imageCategories: [],
            loggedInUserProfilePicture: "",
        },
        authToken: undefined,
    } as SliceState,
    reducers: {
        addImage(state, action) {
            state.userData.images.push(action.payload)
        },
        addImageCategories(state, action) {
            state.userData.imageCategories.push(...action.payload);
        },
        setImages(state, action) {
            state.userData.images = action.payload;
        },
        setFeedImages(state, action) {
            state.userData.feedImages = action.payload;
        },
        removeImage(state, action) {
            state.userData.images.filter((image: ImageData) => image.id !== action.payload);
        },
        setUsername(state, action) {
            state.userData.username = action.payload;
        },
        setUserId(state, action) {
            state.userData.userId = action.payload;
        },

        setUserBio(state, action) {
            state.userData.userBio = action.payload;
        },
        setAuthToken(state, action) {
            state.authToken = action.payload;
        },
        setFollowers(state, action) {
            state.userData.followers = action.payload;
        },
        setFollowings(state, action) {
            state.userData.followings = action.payload;
        },
        setProfileImageUrl(state, action) {
            state.userData.profileImageUrl = action.payload;
        },
        setImageCategories(state, action) {
            state.userData.imageCategories = action.payload;
        },
        setLoggedInUserProfilePicture(state, action) {
            state.userData.loggedInUserProfilePicture = action.payload;
        }
    },

    extraReducers(builder) {
        /* TODO: state changes related to async thunk calls */
    }

});


export const { addImage, removeImage, setUserBio, setUsername,
    setImages, setFeedImages, setAuthToken, setFollowers, setFollowings, setProfileImageUrl,setUserId,
    setImageCategories, addImageCategories, setLoggedInUserProfilePicture } = userSlice.actions;

export const selectUserData = (state: any) => state.user.userData;
export const selectAuthToken = (state: any) => state.user.authToken;
export const selectLoggedInUserProfilePicture = (state: any) => state.user.loggedInUserProfilePicture;
export const selectIsLoadingUserData = (state: any) => state.user.loading;
export const selectIsUserDataRetrieved = (state: any) => state.user.isUserDataRetrieved;
export default userSlice.reducer;