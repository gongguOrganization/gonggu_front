/* export const postUser = async (users, user) => {
    const { status } = await customAxios("post", "/user/join", user);
    if (status !== 201) {
        throw new Error("error");
    }

    // return [...users, newUser];
};

export const loginApi = async (users, user) => {
    const { data } = await customAxios("post", "/user/login", user);

    return { isLogin: data.token ? true : false, user: data.user, token: data.token };
}; */