import toast from "react-hot-toast";
import { apiLink } from "../config";
import httpClient from "../httpClient";

export async function handleFormSubmit(event: { preventDefault: () => void; }) {
    event.preventDefault();

    var formData = new FormData();

    const fileInput: any = document.getElementById('imageInput');

    if (fileInput && fileInput.files.length > 0) {

        formData.append('image', fileInput.files[0]);

        const response = await httpClient.post(apiLink + "/updateProfileImage", formData);

        toast.success(response.data);

        window.location.reload()
    } else {
        toast.error("Please select an image");
    }
}