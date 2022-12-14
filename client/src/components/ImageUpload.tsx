import React, {useState} from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {styled} from "@mui/material/styles";
import {protectedRouteRedirect, uploadImage} from "../util/functions";
import {
    addImage,
    addImageCategories,
    selectAuthToken,
    setImages,
    setLoggedInUserProfilePicture,
    setProfileImageUrl
} from "../slices/userSlice";
import {useDispatch, useSelector} from "react-redux";
// @ts-ignore
import toast from "toast-me";
import axios from "axios";
import {base_be_url} from "../util/constants";
import {decodeToken} from "react-jwt";

const Input = styled("input")({
    display: "none",
});


const ImageUpload = ({
                         setIsUploadingImage,
                         isProfilePictureUpload,
                         setIsProfilePictureUpload,
                     }:
                         {
                             setIsUploadingImage: (value: boolean) => void,
                             isProfilePictureUpload: boolean,
                             setIsProfilePictureUpload: any,
                         }) => {

    // @ts-ignore
    const loggedInUserId = decodeToken(localStorage.getItem("authToken")).id
    const dispatch = useDispatch();
    const authToken = useSelector(selectAuthToken);

    const handleSubmit = async () => {
        let formData;

        if (image !== undefined && authToken) {
            setIsUploadingImage(true);
            formData = new FormData();
            formData.append("file", image);

            try {
                if (!isProfilePictureUpload) {
                    const imageData = await uploadImage(formData, authToken);
                    if (imageData) {
                        setImage(undefined);
                        dispatch(addImage(imageData.image));
                        dispatch(addImageCategories(imageData.imageLabels));
                    }
                } else {
                    formData.append("upload_preset", "ladhoeso");
                    const res = await axios.post("https://api.cloudinary.com/v1_1/dhp7dbfmf/image/upload", formData);
                    const imageUrl = res.data.secure_url;
                    const userData = await axios.post(`${base_be_url}/api/${loggedInUserId}/images/profile`, {
                        imageURL: imageUrl
                    }, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("authToken")}`
                        }
                    })
                    dispatch(setProfileImageUrl(imageUrl));
                    dispatch(setLoggedInUserProfilePicture(imageUrl))
                    dispatch(setImages(userData.data.data.images))
                }
                toast("Image uploaded successfully!", {duration: 1500});
            } catch (err: any) {
                protectedRouteRedirect(err);
                toast("Image failed to upload. Please try again later!", {duration: 1500})
            } finally {
                setIsUploadingImage(false);
                setIsProfilePictureUpload(false);
            }
        }
    }

    const [image, setImage] = useState<any>(undefined);
    return (
        <div>
            <label htmlFor="icon-button-file">
                <Input
                    onChange={(e: any) => {
                        setImage(e.target.files[0]);
                        e.target.value = null;
                    }}
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                />
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                >
                    <PhotoCamera/>
                </IconButton>
                <p>{image ? image.name : ""}</p>
            </label>
            <div className="p-2">
                <Button onClick={handleSubmit} variant="outlined">
                    Upload
                </Button>
            </div>
        </div>
    );
}

export default ImageUpload;