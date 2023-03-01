import axios from "axios";

const instance = axios.create({
    baseURL: "https://pixabay.com/api",

});

export const searchImages = async (search, _page = 1) => {
    const { data } = await instance.get("/", {
        params: {
            q: search,
            page: _page,
            key: "31657799-a6515ed5d1c3f7f5a7bc6e4d5",
            image_type: "photo",
            orientation: "horizontal",
            per_page: 12,
        }
    });
    return data;
};