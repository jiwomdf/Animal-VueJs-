const axios = require("axios");

module.exports = async (fun, context) => {

    let accessToken = context.$cookie.get("accessToken");
    let loginUserName = context.$store.state.loginUserName;
    let refreshToken = context.$cookie.get("refreshToken");

    try {

        const retval = await fun(accessToken)
        console.log(retval);

    } catch (error) {

        if (error.response.status == 403) {
            const url = "http://localhost:3000/auth/token/";
            const data = { userName: loginUserName, refreshToken: refreshToken, accessToken: accessToken };
            const headers = { "Content-Type": "application/json", };

            let retVal = await axios.post(url, data, headers);

            console.log("Unauthorized")
            context.$cookie.delete("accessToken");
            context.$cookie.set("accessToken", retVal.data.accessToken);

            const retval = await fun(retVal.data.accessToken)

            console.log(retval);
        }
    }
}