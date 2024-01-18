import toast from "react-hot-toast";
import { apiLink } from "../config";
import httpClient from "../httpClient";

export async function changePassword(newPassword: string, confirmnewPassword: string, cPassword: string) {
    var changePassResponse;
    if (newPassword == confirmnewPassword) {
        changePassResponse = await httpClient.post(apiLink + "/changeProfilePassword", { current_password: cPassword, new_password: newPassword });
        var response = changePassResponse.data

        if (changePassResponse.status !== 200) {
            console.log(changePassResponse.status)
            return toast.error(response)
        }

        toast.success(response)

    } else {
        toast.error("Passwords dont match")
    }

}