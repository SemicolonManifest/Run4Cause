import axios from "axios";
import { AxiosError } from "axios";
import IncorrectTokenError from "../errors/IncorrectTokenError";
import {apiUrl} from "@env";

export default class LocationManager{

    #token;

    constructor(token){
        this.#token = token;
    }

    async submitLocation(latitude, longitude){
        let form = { lat: latitude, long: longitude };
        await axios
            .post(apiUrl + "/location", form,{
            headers: {
                authorization: "Bearer " + this.#token,
                accept: "application/json",
              },}
              )
            .then(async(response) => {
                if (response.status == 200) {
                    return true;
                } else {
                    throw new Error("Une erreur est survenue");
                }
            })
            .catch((error) => {
                
                if (error.response.status == 401) {
                    throw new IncorrectTokenError("Le token est incorrect");
                  } else {
                    throw new Error("Une erreur est survenue");
                  }
            });
        return true;
    }
}