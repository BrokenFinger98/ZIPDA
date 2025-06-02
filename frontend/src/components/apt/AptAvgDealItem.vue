<script setup>
  import { meterToPyung, koreanPrice } from '@/utils/house'

  const { avgDeal } = defineProps({
    avgDeal: Object,
  })
</script>

<template>
  <tr>
    <th class="w-22 text-center">{{ meterToPyung(avgDeal.area) }} 평</th>
    <td class="w-55 px-2 py-2">
      <!-- <div class="mx-auto">
        <div class="d-flex justify-start ga-4">
          <h4>매매</h4> -->
          <div>
            <p>{{ koreanPrice(Math.floor(avgDeal.avgPrice)) }} 원</p>
          </div>
        <!-- </div> -->
    </td>
    <td class="w-33 px-2 py-2">
        <!-- <div class="d-flex justify-start ga-4">
          <h4>전세</h4> -->
          <div>
            <p>{{ koreanPrice(avgDeal.rentPrice) || '-' }} 원</p>
          </div>
        <!-- </div>
      </div> -->
    </td>
  </tr>
</template>

<style scoped>

th {
  font-weight: 500;
}

</style>
