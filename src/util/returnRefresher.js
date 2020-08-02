const axios = require("axios");
const apiUrl = require("../constant");

module.exports = async (fun, context) => {

    let accessToken = context.$cookie.get("accessToken");
    let loginUserName = context.$store.getters.getLogin;
    let refreshToken = context.$cookie.get("refreshToken");

    try {

        let retVal = await fun(accessToken)
        return { isComplete: true, data: retVal, msg: "" }

    } catch (error) {

        if (error.response == undefined)
            return { isComplete: false, data: "", msg: "Image is empty" }

        if (error.response.status == 403) {

            let newToken = await syncToken(loginUserName, refreshToken, accessToken, context)

            if (newToken == null)
                return { isComplete: false, data: "", msg: "error authenticate user" }

            try {
                let retVal = await fun(newToken.data.accessToken)
                return { isComplete: true, data: retVal, msg: "" }
            } catch (err) {
                return { isComplete: false, data: null, msg: err.response.data.messages }
            }
        }
        else {
            console.log(error)
            return { isComplete: false, data: null, msg: error.response.data.messages }
        }

    }
}

async function syncToken(loginUserName, refreshToken, accessToken, context) {
    try {
        console.log("Unauthorized")

        const url = `${apiUrl}/auth/token/`;
        const data = { userName: loginUserName, refreshToken: refreshToken, accessToken: accessToken };
        const headers = { "Content-Type": "application/json", };

        let newToken = await axios.post(url, data, headers);

        context.$cookie.delete("accessToken");
        context.$cookie.set("accessToken", newToken.data.accessToken);

        return newToken
    } catch (err) {
        console.log(err)

        return null
    }
}