export function addFavoriteDeal(dealId, data) {
  return request({
    url: `/deals/like/${dealId}`,
    method: 'post',
    data,
  })
}

import axios from "axios";

export const getLikedHouses = async () => {
    const response = await axios.get("/houses/like");
    return response.data;
};

export const toggleFavorite = async (houseId, likeStatus) => {
    const method = likeStatus ? "POST" : "DELETE";
    const url = `/houses/like/${houseId}`;
    return axios({
        method,
        url,
    });
};
