<template>
    <div class="favorite-region-container">
        
        <!-- 관심 지역 추가 -->
        <div class="add-region-form">
            <v-text-field v-model="newRegion" label="새 관심 지역 입력" placeholder="관심 지역 이름" outlined></v-text-field>
            <v-btn color="primary" @click="addRegion">추가</v-btn>
        </div>
        <v-divider class="my-4"></v-divider>

        <!-- 관심 지역 목록 -->
        <div class="p-1">
            <h3>관심 지역 목록</h3>
            <v-data-table :items="regions" :headers="headers" item-value="id" class="elevation-1">
                <!-- <template v-slot:top>
                    <v-text-field v-model="search" label="검색" placeholder="관심 지역 검색" clearable
                        class="mx-4"></v-text-field>
                </template> -->
                <template class="modal-header" v-slot:item.actions="{ item }">
                    <!-- <v-btn icon color="primary" @click="editRegion(item)">
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn> -->
                    <v-btn icon color="error" @click="deleteRegion(item.id)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </div>

        <!-- 관심 지역 수정 다이얼로그 -->
        <!-- <v-dialog v-model="isEditDialogOpen" max-width="500px">
            <v-card>
                <v-card-title>관심 지역 수정</v-card-title>
                <v-card-text>
                    <v-text-field v-model="editableRegion.name" label="관심 지역 이름" outlined></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="saveRegionEdit">저장</v-btn>
                    <v-btn color="default" @click="cancelEdit">취소</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
    </div>
</template>

<script setup>
import { ref } from "vue";

const regions = ref([{ id: 1, name: "서울 강남구" }]);
const headers = [
    { text: "관심 지역 이름", value: "name" },
    { text: "액션", value: "actions", sortable: false },
];
const newRegion = ref("");
const search = ref("");
const isEditDialogOpen = ref(false);
const editableRegion = ref({});

const addRegion = () => {
    const newId = regions.value.length + 1;
    regions.value.push({ id: newId, name: newRegion.value });
    newRegion.value = "";
};

const deleteRegion = (id) => {
    regions.value = regions.value.filter((region) => region.id !== id);
};

const editRegion = (region) => {
    editableRegion.value = { ...region };
    isEditDialogOpen.value = true;
};

const saveRegionEdit = () => {
    const index = regions.value.findIndex((r) => r.id === editableRegion.value.id);
    if (index !== -1) regions.value[index] = { ...editableRegion.value };
    isEditDialogOpen.value = false;
};

const cancelEdit = () => {
    isEditDialogOpen.value = false;
};
</script>

<style scoped>
.favorite-region-container {
    padding: 1rem;
}

.add-region-form {
    display: flex;
    /* width: 100%;
    justify-content: space-between;
    align-items: center; */
    gap: 1rem;
    margin-bottom: 1rem;
}

.modal-header {
    display: inline;
}
</style>
