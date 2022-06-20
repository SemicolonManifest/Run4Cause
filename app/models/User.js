import axios from "axios";
import { AxiosError } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import IncorrectLoginError from "../errors/IncorrectLoginError";
import IncorrectTokenError from "../errors/IncorrectTokenError";
import {apiUrl} from "@env";


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

  /**
   * Disconnect the user
   * @returns {Promise<boolean>}
   */
  async logout() {
    try{
    await AsyncStorage.removeItem('currentUser').catch(error => alert(error))
    await AsyncStorage.removeItem('userToken').catch(error => alert(error))
    self.currentUser = null;
    }catch(error){
      alert(error)
    }
    return true;
  }

  /**
   * Update a user
   * @returns {Promise<boolean>}
   */
  async update() {
    let form = { _method: 'PATCH',name: this.name, email: this.email };

    await axios
      .patch(apiUrl + "/profile", form,
      {
        headers: {
          authorization: "Bearer " + this.token,
          accept: "application/json",
        },
      }
        )
      .then(async(response) => {
        if (response.status == 200) {
          User.currentUser.name = this.name;
          User.currentUser.email = this.email;
          await AsyncStorage.setItem('currentUser', JSON.stringify(User.currentUser))
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

  static async authenticate(email, password) {
    let form = { username: email, password: password };

    await axios
      .post(apiUrl + "/mytoken", form)
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

  /**
   * Get a user form a token
   * @param {string} token 
   * @returns 
   */
  static async getUser(token) {
    if(User.currentUser != null){
      if(User.currentUser.token != token){
        User.currentUser = null;
        User.getUser(token);
      }
    } else {
      let user = undefined;
      return await axios
        .get(apiUrl + "/me", {
          headers: {
            authorization: "Bearer " + token,
            accept: "application/json",
          },
        })
        .then(async(response) => {
          if (response.status == 200) {
            user = new User(response.data.name, response.data.email, token);
            User.currentUser = user;
            await AsyncStorage.setItem('userToken', User.currentUser.token)
            await AsyncStorage.setItem('currentUser', JSON.stringify(User.currentUser))
            alert("ici")
          } else {
            throw new Error("Une erreur est survenue");
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            alert(User.currentUser.token)
            throw new IncorrectTokenError("Le token est incorrect");
          } else {
            throw new Error("Une erreur est survenue");
          }
        });
    } 
      return User.getCurrentUser();
  }

  /**
   * Get the current user
   * @returns {User?}
   */
  static async getCurrentUser() {
    try{
      storageUser = await AsyncStorage.getItem('currentUser')
    }catch(error){
      storageUser = null
    }

    try{
      storageToken = await AsyncStorage.getItem('userToken')
    }catch(error){
      storageToken = null
    }

    
    
    if(User.currentUser != null){
      return User.currentUser;
    }else if(storageUser != null){
      User.currentUser = JSON.parse(storageUser);
      alert(User.currentUser.token)
      return User.currentUser;
    }else if (storageToken != null) {
      return await User.getUser(storageToken);
    }else{
      return null;
    }
  }

}
