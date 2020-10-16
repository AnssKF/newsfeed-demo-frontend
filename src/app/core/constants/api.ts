

export const K_AUTH_API = {
    LOGIN: () => `/api/user/login/`,
    SIGNUP: () => `/api/user/signup/`,
    TOKEN_VERIFY: () => `/api/token/verify/`
}

export const K_POST_API = {
    FETCH: () => `/api/post/`,
    BYID: (id: number) => `/api/post/${id}/`
}

export const K_COMMENT_API = {
    FETCH: () => `/api/comment/`
}

export const K_LIKE_APU = {
    POST: () => `/api/like/`,
    DELETE: (id: number) => `/api/like/${id}/`
}