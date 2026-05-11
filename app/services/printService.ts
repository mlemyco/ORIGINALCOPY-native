import axios from "axios";
import { supabase } from "../utils/supabase";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const addPrintsToDb = async (count: number) => {
    const { data, error } = await supabase
        .from("prints")
        .insert({ count: count })
        .select();

    if (data) {
        console.log("added prints to db:", data);
    }
};

const printPhoto = async (imgDataUrl: string, numCopies: number) => {
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

export const printAndSavePhoto = async (
    imgDataUrl: string,
    numCopies: number,
) => {
    const response = await printPhoto(imgDataUrl, numCopies);
    if (response) {
        addPrintsToDb(numCopies);
    }
};
