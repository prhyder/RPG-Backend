const secrets = {
    //dbUri: process.env.MERN_COMMENTBOX_DB_URI
    dbUri: "mongodb://secondUser:easypassword0@ds161183.mlab.com:61183/mern-comment-box"
};

export const getSecret = key => secrets[key];