const BASE_URL = "http://dev23.finder.com.bd/api/v1";

const LOGIN_URL = "http://dev23.finder.com.bd/api/v1/users/login";

export async function loginUser(email, password) {
  try {
    const requestBody = {
      user_id: email,
      password: encodeBase64(password),
    };

    // console.log("-------requestbody:", requestBody);

    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // console.log("----response", response);

    const data = await response.json();

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
    const response = await fetch(GET_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });

    const responseData = await response.json();
    // console.log("profile data----------", responseData);

    return responseData;
  } catch (error) {
    console.log(error);
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
    const response = await fetch(PATCH_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: JSON.stringify(requestBody),
    });

    return response;
  } catch (error) {
    console.log("pasError------", error);
  }
};

// Change full name api req...

const NAME_CHANGE_URL = BASE_URL + "/users/customers/profile";

export const changeFullName = async (fullName, user) => {
  const payload = {
    name: fullName,
  };

  try {
    const response = await fetch(NAME_CHANGE_URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
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
    const response = await fetch(CHANGE_EMAIL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};

// Change email api req...
const CHANGE_USER_EMAIL_URL = BASE_URL + "/users/verification-code";

export const changeUserEmail = async (email, user) => {
  const payload = {
    verification_entity: email,
  };

  try {
    const response = await fetch(CHANGE_USER_EMAIL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },

      body: JSON.stringify(payload),
    });

    return response;
  } catch (error) {
    console.log(error);
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
    const response = await fetch(VERIFY_EMAIL_URL, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.access_token}`,
      },
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error) {
    console.log(error);
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
    const response = await fetch(EMAIL_URL_FOR_CREATING_USER, {
      method: "POST",
      headers: headers,

      body: JSON.stringify(payload),
    });

    return response;
  } catch (error) {
    console.log(error);
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
    "Content-type": "application/json",
  };

  try {
    const response = await fetch(CREATING_USER_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(payload),
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
