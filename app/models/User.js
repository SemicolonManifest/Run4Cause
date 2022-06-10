import axios from "axios";
import { AxiosError } from "axios";
import IncorrectLoginError from "../errors/IncorrectLoginError";
import IncorrectTokenError from "../errors/IncorrectTokenError";
export default class User {
  token;
  name;
  email;
  static currentUser;

  constructor(name, email, token) {
    this.name = name;
    this.email = email;
    this.token = token;
  }

  static async authenticate(email, password) {
    let result;
    let form = { username: email, password: password };
    await axios
      .post("https://mockapi.mycpnv.ch/api/rfc" + "/mytoken", form)
      .then(async(response) => {
        if (response.status == 200) {
          User.currentUser = null;
          await User.getUser(response.data);
        } else {
          throw new Error("Une erreur est survenue");
        }
      })
      .catch((error) => {
        switch (true) {
          case error instanceof AxiosError:
            if (error.response.status == 401) {
              throw new IncorrectLoginError(
                "Le login ou le mot de passe est incorrect"
              );
            } else {
              throw new Error("Une erreur est survenue");
            }
          case error instanceof IncorrectTokenError:
            throw error;
          default:
            throw new Error("Une erreur est survenue");
        }
      });

    return true;
  }

  static async getUser(token) {
    if (User.currentUser == null || User.currentUser.token != token) {
      let user = undefined;
      return await axios
        .get("https://mockapi.mycpnv.ch/api/rfc" + "/me", {
          headers: {
            authorization: "Bearer " + token,
            accept: "application/json",
          },
        })
        .then((response) => {
          if (response.status == 200) {
            user = new User(response.data.name, response.data.email, token);
            User.currentUser = user;
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
    } else {
      return User.currentUser;
    }
  }
}
