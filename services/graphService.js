// this page is verifying bot and generate user details from MS account by using "GRAPH API"
const axios = require("axios");

// Generating token from bot's credentials and tenentId
async function getGraphAccessToken(tenantId, botID, botPassword) {
  const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;

  try {
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: botID,
        client_secret: botPassword,
        scope: "https://graph.microsoft.com/.default",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("❌ Token Error:", error.response?.data || error.message);
    throw new Error(
      `Token fetch failed: ${
        error.response?.data?.error_description || error.message
      }`
    );
  }
}

// Graph API (Using here to findout users details like (email, profile name, etc) - when activationg bot for the first time) 
async function getUserEmail(aadObjectId, tenantId, botID, botPassword) {
  // return token by calling 'getGraphAccessToken' from bot's credentials and tenentId
  const accessToken = await getGraphAccessToken(tenantId, botID, botPassword);

  // generating user email from bot recieved aadObjectId
  const graphUrl = `https://graph.microsoft.com/v1.0/users/${aadObjectId}`;

  try {
    const response = await axios.get(graphUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const user = response.data;
    const email = user.mail || user.userPrincipalName; // storing user email in variable
    return email; // ✅ Ensure the function returns the email
  } catch (error) {
    console.error(
      "❌ Email Fetch Error:",
      error.response?.data || error.message
    );
    return null; // Return null instead of undefined on error
  }
}

// Export the function
module.exports = { getUserEmail };