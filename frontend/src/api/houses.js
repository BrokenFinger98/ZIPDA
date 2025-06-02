import axios from 'axios';

const { VITE_API_BASE_URL } = import.meta.env;

export const fetchHouses = async (sido, gugun, dong, houseType) => {
  try {
    const response = await axios.get(`${VITE_API_BASE_URL}/houses`, {
      params: {
        sido,
        gugun,
        dong,
        houseType,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch houses:', error);
    throw error;
  }
};
import request from '@/utils/request'

export function getHouse(houseId) {
  return request({
    url: `/houses/${houseId}`,
    method: 'get',
  })
}

export function updateHouse(houseId, data) {
  return request({
    url: `/houses/${houseId}`,
    method: 'put',
    data,
  })
}

export function deleteHouse(houseId) {
  return request({
    url: `/houses/${houseId}`,
    method: 'delete',
  })
}

export function getAllHouses(sido, gugun, dong, houseType, page, size) {
  return request({
    url: '/houses',
    method: 'get',
    params: {
      sido,
      gugun,
      dong,
      houseType,
      page,
      size,
    },
  })
}

export function createHouse(data) {
  return request({
    url: '/houses',
    method: 'post',
    data,
  })
}

export function createDealForHouse(houseId, data) {
  return request({
    url: `/houses/${houseId}/deals`,
    method: 'post',
    data,
  })
}



export function createHouseLike(houseId) {
  return request({
    url: `/houses/like/${houseId}`,
    method: "post",
  });
}

export function deleteHouseLike(houseId) {
  return request({
    url: `/houses/like/${houseId}`,
    method: "delete",
  });
}

