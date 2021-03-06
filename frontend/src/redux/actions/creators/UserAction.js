// * Import required modules/dependencies
import axios from "axios";

// * Import all store related stuffs
import * as actionTypes from "../types/actionTypes";

// * Import utilites
import displayFlash from "../../../utils/flashEvent";
import { baseUrl } from "../../../utils/constant";

export const getuserRequest = () => {
  return {
    type: actionTypes.GET_USER_DETAIL_REQUEST,
  };
};

export const getuserSuccess = (response) => {
  return {
    type: actionTypes.GET_USER_DETAIL_SUCCESS,
    user: response.data.user,
    status: response.status,
  };
};

export const getuserFailure = (response) => {
  return {
    type: actionTypes.GET_USER_DETAIL_FAILURE,
    message: response.message,
    status: response.status,
  };
};

export const getuserFetch = () => (dispatch) => {
  dispatch(getuserRequest());

  axios
    .get(baseUrl + "/user/get-user-detail", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          localStorage.getItem("chat_auth_token") ||
          sessionStorage.getItem("chat_auth_token")
        }`,
      },
      params: {
        username: "",
      },
    })
    .then((response) => {
      dispatch(getuserSuccess(response));
    })
    .catch((error) => {
      dispatch(
        getuserFailure({
          message: error.response
            ? error.response.statusText || error.response.data.message
            : "Unable to connect to server, please try again later",
          status: error.response ? error.response.status || 503 : 503,
        })
      );
      displayFlash.emit("get-message", {
        message: `${
          error.response
            ? error.response.statusText || error.response.data.message
            : "Unable to connect to server, please try again later"
        }`,
        type: "danger",
      });
    });
};

export const removeuser = () => {
  return {
    type: actionTypes.REMOVE_USER_DETAIL,
  };
};

// export const updateuserRequest = () => {
//   return {
//     type: actionTypes.UPDATE_USER_DETAIL_REQUEST,
//   };
// };

// export const updateuserSuccess = (response) => {
//   return {
//     type: actionTypes.UPDATE_USER_DETAIL_SUCCESS,
//     newUser: response.data.user,
//     status: response.status,
//   };
// };

// export const updateuserFailure = (response) => {
//   return {
//     type: actionTypes.UPDATE_USER_DETAIL_FAILURE,
//     message: response.message,
//     status: response.status,
//   };
// };

// export const updateuserFetch = (data) => (dispatch) => {
//   dispatch(updateuserRequest());

//   axios
//     .put(baseUrl + "/user/update-user-detail", JSON.stringify(data), {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${
//           localStorage.getItem("chat_auth_token") ||
//           sessionStorage.getItem("chat_auth_token")
//         }`,
//       },
//     })
//     .then((response) => {
//       dispatch(updateuserSuccess(response));
//       displayFlash.emit("get-message", {
//         message: response.data.message,
//         type: "success",
//       });
//     })
//     .catch((error) => {
//       console.log(error.response);
//       dispatch(
//         updateuserFailure({
//           message: error.response
//             ? error.response.statusText || error.response.data.message
//             : "Unable to connect to server, please try again later",
//           status: error.response ? error.response.status || 503 : 503,
//         })
//       );
//       displayFlash.emit("get-message", {
//         message: `${
//           error.response
//             ? error.response.data.message || error.response.data
//             : "Unable to connect to server, please try again later"
//         }`,
//         type: "danger",
//       });
//     });
// };
