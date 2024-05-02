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
