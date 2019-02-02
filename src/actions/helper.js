import {authRef, usersRef} from "../config/firebase";

/*
* get auth user .
* */
export const getAuthUser = () => {
    try {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(authRef.currentUser);
            }, 0);
        });
    } catch (e) {
        console.log('error - removeFriendsPosts', e);
    }
};

/*
* get list of user friends .
* */
export function getAllMyFriends(uid) {
    return new Promise(resolve => {
        try {
            let myFriends = [];
            usersRef.child(uid + "/myFriends").on("value", snapshot => {
                snapshot.forEach(function (data) {
                    let friend = {id: data.val().id, email: data.val().email};
                    myFriends.push(friend);
                });
            });
            setInterval(() => {
                resolve(myFriends);
            }, 800);
        } catch (e) {
            console.log('error - getAllMyFriends', e);
        }
    });
}

/*
* get all posts from usr friends .
* */
export function getAllPostsFormMyFriends(myFriends) {
    return new Promise(resolve => {
        try {
            let friendsMyPost = [];
            myFriends.forEach(function (friend) {
                usersRef.child(friend.id + "/myPosts").on("value", snapshot => {
                    snapshot.forEach(function (data) {
                        let post = {
                            content: data.val().content,
                            publishDate: data.val().publishDate,
                            author: data.val().email,
                            id: data.key
                        };
                        friendsMyPost.push(post);
                    });
                });
            });
            setInterval(() => {
                resolve(friendsMyPost);
            }, 800);
        } catch (e) {
            console.log('error - getAllPostsFormMyFriends', e);
        }
    });
}

/*
* get all users .
* */
export const getAllUsers = (userMail) => {
    return new Promise(resolve => {
        try {
            let allUsers = [];
            usersRef.on("value", snapshot => {
                snapshot.forEach(function (data) {
                    data.forEach(function (subData) {
                        let email = subData.val().email;
                        if (userMail !== email && email != null) {
                            let user = {id: data.key, email: email};
                            allUsers.push(user);
                        }
                    });
                });
            });
            setInterval(() => {
                resolve(allUsers);
            }, 800);
        } catch (e) {
            console.log('error - getAllUsers', e);
        }
    });
};

/*
* get incoming friends request .
* */
export const getIncomingRequests = async (authUser) => {
    return new Promise(resolve => {
        try {
            let inComingRequest = [];
            let uid = authUser.uid;
            usersRef.child(uid + "/incomingRequests").on("value", snapshot => {
                snapshot.forEach(function (data) {
                    let user = {email: data.val().email, id: data.val().id};
                    inComingRequest.push(user);
                });
                resolve(inComingRequest);
            });
        } catch (e) {
            console.log('error - removeFriendsPosts', e);
        }
    });
};

/*
* get key of specific incoming request .
* */
const getKeyOfIncomingRequest = async (authUid, id) => {
    return new Promise(resolve => {
        try {
            usersRef.child(authUid + "/incomingRequests").on("value", snapshot => {
                snapshot.forEach(function (data) {
                    let userId = data.val().id;
                    if (userId === id) {
                        resolve(data.key);
                    }
                });
            });
        } catch (e) {
            console.log('error - getKeyOfIncomingRequest', e);
        }
    });
};

/*
* get key of specific send request .
* */
const getKeyOfSendRequest = async (authUid, id) => {
    return new Promise(resolve => {
        try {
            usersRef.child(id + "/sendRequests").on("value", snapshot => {
                snapshot.forEach(function (data) {
                    let userId = data.val().requestUserId;
                    if (userId === authUid) {
                        resolve(data.key);
                    }
                });
            });
        } catch (e) {
            console.log('error - getKeyOfSendRequest', e);
        }
    });
};

/*
* remove incoming request and send request by keys .
* */
export const removeRequestKeys = async (authUid, id) => {
    try {
        let key = await getKeyOfIncomingRequest(authUid, id);
        usersRef.child(authUid + "/incomingRequests/" + key).remove();
        key = await getKeyOfSendRequest(authUid, id);
        usersRef.child(id + "/sendRequests/" + key).remove();
    } catch (e) {
        console.log('error - removeRequestKeys', e);
    }
};

/*
* remove duplicates from given array .
* */
export function arrayUnique(array) {
    try {
        let a = array.concat();
        for (let i = 0; i < a.length; ++i) {
            for (let j = i + 1; j < a.length; ++j) {
                if (a[i].email === a[j].email) {
                    a.splice(j--, 1);
                    a.splice(i--, 1);
                }
            }
        }
        return a;
    } catch (e) {
        console.log('error - arrayUnique', e);
    }
}
