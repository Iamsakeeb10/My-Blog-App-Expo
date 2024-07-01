import axios from "axios";

const BASE_URL = "http://dev23.finder.com.bd/api/v1";

const LOGIN_URL = "http://dev23.finder.com.bd/api/v1/users/login";

export async function loginUser(email, password) {
  try {
    const requestBody = {
      user_id: email,
      password: encodeBase64(password),
    };

    // console.log("-------requestbody:", requestBody);

    const response = await axios.post(LOGIN_URL, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // console.log("----response", response);

    const data = response.data;

    // console.log("----data", data);

    return data;
  } catch (error) {
    console.log(error);
  }
}

// Converting encode data to base64...
const encodeBase64 = (input) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let str = input;
  let output = "";

  for (
    let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || ((map = "="), i % 1);
    output += map.charAt(63 & (block >> (8 - (i % 1) * 8)))
  ) {
    charCode = str.charCodeAt((i += 3 / 4));

    if (charCode > 0xff) {
      console.log(
        "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
      );
    }

    block = (block << 8) | charCode;
  }

  return output;
};

// Sending request for getting profile data...
const GET_URL = "http://dev23.finder.com.bd/api/v1/users/customers/profile";

export const fetchProfileData = async (user) => {
  try {
    const response = await axios.get(GET_URL, {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    const responseData = response.data;
    // console.log("profile data:", responseData);

    return responseData;
  } catch (error) {
    console.log("Error fetching profile data:", error);
  }
};

// Change password api req...
const PATCH_URL = BASE_URL + "/users/customers/profile/change-password";

export const changeUserPassword = async (curPass, newPass, user) => {
  const requestBody = {
    current_password: encodeBase64(curPass),
    new_password: encodeBase64(newPass),
  };

  try {
    const response = await axios.patch(PATCH_URL, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    return response;
  } catch (error) {
    console.log("Password change error:", error);
  }
};
// Change full name api req...

const NAME_CHANGE_URL = BASE_URL + "/users/customers/profile";

export const changeFullName = async (fullName, user) => {
  const payload = {
    name: fullName,
  };

  try {
    const response = await axios.patch(NAME_CHANGE_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.log("Error changing full name:", error);
  }
};
// Password verification api req...

const CHANGE_EMAIL_URL = BASE_URL + "/users/password-verification";

export const bottomSheetChangePassword = async (password, user) => {
  const payload = {
    password: encodeBase64(password),
    verification_reason: "email-change",
  };

  try {
    const response = await axios.post(CHANGE_EMAIL_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    console.log(response);

    return response;
  } catch (error) {
    console.log("Error changing password:", error);
  }
};
// Change email api req...
const CHANGE_USER_EMAIL_URL = BASE_URL + "/users/verification-code";

export const changeUserEmail = async (email, user) => {
  const payload = {
    verification_entity: email,
  };

  try {
    const response = await axios.post(CHANGE_USER_EMAIL_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    return response;
  } catch (error) {
    console.log("Error changing user email:", error);
  }
};
// Api req for changing email through verification code...

const VERIFY_EMAIL_URL =
  "http://dev23.finder.com.bd:8010/users/customers/profile/change-contact-info";

export const verifyEmail = async (updatedEmail, enteredCode, userId, user) => {
  const payload = {
    verification_entity: updatedEmail,
    verification_code: enteredCode,
    verification_id: userId,
  };

  try {
    const response = await axios.patch(VERIFY_EMAIL_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    return response;
  } catch (error) {
    console.log("Error verifying email:", error);
  }
};

// Change email api req...
const EMAIL_URL_FOR_CREATING_USER = BASE_URL + "/users/verification-code";

export const emailVerificationForCreatingUser = async (email, user) => {
  const payload = {
    verification_entity: email,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  if (user && user.access_token) {
    headers.Authorization = `Bearer ${user.access_token}`;
  }

  try {
    const response = await axios.post(EMAIL_URL_FOR_CREATING_USER, payload, {
      headers: headers,
    });

    return response;
  } catch (error) {
    console.log("Error verifying email for creating user:", error);
  }
};
// Creating user....
const CREATING_USER_URL = BASE_URL + "/users/customers/registration";

export const creatingUser = async (name, email, code, password) => {
  const payload = {
    name: name,
    email: email,
    verification_code: code,
    password: encodeBase64(password),
  };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(CREATING_USER_URL, payload, {
      headers: headers,
    });

    return response;
  } catch (error) {
    console.log("Error creating user:", error);
  }
};
// Api req to add mobile number...
const ADD_MOBILE_NUMBER_URL = BASE_URL + "/users/verification-code";

export const addMobileNumber = async (mobileNumber, user) => {
  const payload = {
    verification_entity: mobileNumber,
  };

  try {
    const response = await axios.post(ADD_MOBILE_NUMBER_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    return response;
  } catch (error) {
    console.log("Error adding mobile number:", error);
  }
};
// Adding mobile number through verification code...

const ADD_MOBILE_NUMBER_OTP_URL =
  "http://dev23.finder.com.bd:8010/users/customers/profile/change-contact-info";

export const verifyMobileNumber = async (phoneNumber, enteredCode, user) => {
  const payload = {
    verification_entity: phoneNumber,
    verification_code: enteredCode,
  };

  try {
    const response = await axios.patch(ADD_MOBILE_NUMBER_OTP_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    return response;
  } catch (error) {
    console.log("Error verifying mobile number:", error);
  }
};
// Uploading image to api..
const IMAGE_UPLOADING_URL = BASE_URL + "/users/customers/profile";

export const uploadImageToApi = async (pickedImage, user) => {
  try {
    const formData = new FormData();
    formData.append("profile_picture", {
      uri: pickedImage,
      name: "profile_image.jpg",
      type: "image/jpg",
    });

    const response = await axios.patch(IMAGE_UPLOADING_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    return response;
  } catch (error) {
    console.log("Error uploading image:", error);
  }
};
// Deleting image to api..
const DELETE_IMAGE_UPLOADING_URL = BASE_URL + "/users/customers/profile";

export const deleteImageFromAPI = async (pickedImage, user) => {
  try {
    const formData = new FormData();

    if (pickedImage) {
      formData.append("profile_picture", {
        uri: pickedImage,
        name: "profile_image.jpg",
        type: "image/jpg",
      });
    } else {
      formData.append("profile_picture", "");
    }

    const response = await axios.patch(DELETE_IMAGE_UPLOADING_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    return response;
  } catch (error) {
    console.log("Error deleting image:", error);
  }
};

// Api req to reset password...
const RESET_PASS_URL = BASE_URL + "/users/customers/forgot-password";

export const resetUserPassword = async (email) => {
  const payload = {
    verification_entity: email,
  };

  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(RESET_PASS_URL, payload, {
      headers: headers,
    });

    return response;
  } catch (error) {
    console.log("Error creating user:", error);
  }
};
