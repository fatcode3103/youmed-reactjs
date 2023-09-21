import httpRequest from "../utils/httpRequest";

const postQuerySearchApi = async ({ q, type }) => {
    let res = await httpRequest.post(`post-query-search?q=${q}&type=${type}`);
    return res;
};

const postQuerySearchSpecialtyApi = async ({ specialtyId, type }) => {
    let res = await httpRequest.post(
        `post-query-search-specialty?specialtyId=${specialtyId}&type=${type}`
    );
    return res;
};

export { postQuerySearchApi, postQuerySearchSpecialtyApi };
