const base_url = "http://dev23.finder.com.bd/api/v1";

const url = "http://dev23.finder.com.bd/api/v1/users/login";

export async function loginUser(email, password) {
  try {
    const requestBody = {
      user_id: email,
      password: encodeBase64(password),
    };

    // console.log("-------requestbody:", requestBody);

    const response = await fetch(url, {
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
const get_url = "http://dev23.finder.com.bd/api/v1/users/customers/profile";

export const fetchProfileData = async (user) => {
  try {
    const response = await fetch(get_url, {
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
const patch_url = base_url + "/users/customers/profile/change-password";

export const changeUserPassword = async (curPass, newPass, user) => {
  const requestBody = {
    current_password: encodeBase64(curPass),
    new_password: encodeBase64(newPass),
  };

  try {
    const response = await fetch(patch_url, {
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

const name_change_url = base_url + "/users/customers/profile";

export const changeFullName = async (fullName, user) => {
  const payload = {
    name: fullName,
  };

  try {
    const response = await fetch(name_change_url, {
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

const change_email_url = base_url + "/users/password-verification";

export const bottomSheetChangePassword = async (password, user) => {
  const payload = {
    password: encodeBase64(password),
    verification_reason: "email-change",
  };

  try {
    const response = await fetch(change_email_url, {
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
const change_user_email_url = base_url + "/users/verification-code";

export const changeUserEmail = async (email, user) => {
  const payload = {
    verification_entity: email,
  };

  try {
    const response = await fetch(change_user_email_url, {
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
