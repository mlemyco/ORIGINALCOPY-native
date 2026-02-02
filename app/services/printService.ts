import axios from "axios";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const printPhoto = async (imgDataUrl: string, numCopies: number) => {
    console.log("apiurl:", API_URL);
    const currentDate = new Date();

    // const blob = await (await fetch(imgDataUrl)).blob();

    const formData = new FormData();
    formData.append("image", {
        uri: imgDataUrl,
        name: `${currentDate.toLocaleString()}.jpg`,
        type: "image/jpeg",
    } as any);
    formData.append("time", currentDate.toISOString());
    formData.append("numCopies", numCopies.toString());

    return axios
        .post(API_URL + "/print", formData)
        .then((response) => {
            console.log(response.data);
            return response.data;
        })
        .catch((error) => {
            console.error(error);
            throw new Error("Printing failed.");
        });
};
