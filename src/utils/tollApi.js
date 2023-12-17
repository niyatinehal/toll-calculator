// api.js
import axios from "axios";

const BASE_URL =
  "https://apis.tollguru.com/toll/v2/origin-destination-waypoints";
const API_TOKEN = "tgGRLFTQ6DMm2bRmjPGF4tMmTGrJ4n2p";

export const calculateToll = async (tollRequest) => {
  console.log(tollRequest);
  try {
    const response = await axios.post(BASE_URL, tollRequest, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_TOKEN,
        Authorization:
          "Bearer eyJraWQiOiJST1VtaTNnT0pkOVE3QWxQUWtLWXNsM3BzQStuSkFOTHVpV0pCQlMyTEpBPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2ZjFhNDcwMS0wYmU2LTRlZTEtOTVkYi0xZjFjNzgyZWM4YTAiLCJldmVudF9pZCI6ImJlNDZmZGQwLWYyNzYtNGJlMC05Y2NkLTEyNzY2OWFmMzc3NSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDIyMDUwOTksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX0cwU2QzU2tXbyIsImV4cCI6MTcwMjczODE1OCwiaWF0IjoxNzAyNzM0NTU5LCJqdGkiOiI0MWEwZGE3Yy04MTE1LTQ1YzEtYmFmNi0xZDc5YjQ4ODUxZTMiLCJjbGllbnRfaWQiOiI1NGQ5bWhwOGpzcTMxc2lxczNlNmtkZmF2cCIsInVzZXJuYW1lIjoibml5YXRpbmVoYWw2N0BnbWFpbC5jb20ifQ.kqJtZTDfuHpDzqGsdYdpGy-s3HktdLiXLjUGTBVSzYEq_BCmT81BRcB_Kbc9xLLTO0GWuPsOlNr4B8MAbSOP5VvH-tPKUHL6hKwYf6x-oSSctp3eoocqIe3PG_tfZX_QFDFrZdaaq67Xb3gsn9EH5bY6D9H1kptSNPmZu6B8PthQPfRwsS-D_lh-pKDILc5DXYYtCA93mExOa5nF3tK3JwGpy2p--p38AIrSINbvNFWqT8FaPD_JCClAO-1Vv46GSeEsB7y0uQWhfeNXjft-clpyyaIwd8I44FedIWiM4u9fZL2IizhlG_38mKtxk2Vc5AqRZZehNMW8WtAglulC5A",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error Response Status:", error.response.status);
      console.error("Error Response Data:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", error.message);
    }

    throw error;
  }
};
