<template>
    <div class="dropdown mt-2">
        <v-menu close-on-content-click offset-y>
            <template v-slot:activator="{ props }">
                <v-btn  variant="outlined"
                    class="fw-bold mx-1 dropdown-toggle" v-bind="props"
                    :class="{ 'selected-btn': selectedDealType, 'default-btn': !selectedDealType }">
                    {{ selectedDisplay }}
                </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="(option, index) in dealOptions" :key="index" @click="selectDealType(option)">
                    <v-list-item-title>{{ option }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dealOptions: ["전체", "매매", "전세", "월세"],
            selectedDealType: "",
            // dropdownOpen: false,
        };
    },
    computed: {
        selectedDisplay() {
            return this.selectedDealType || "거래 종류";
        },
    },
    methods: {
        selectDealType(option) {
            if (option === "전체") { 
                this.selectedDealType = "";
            } else {
                this.selectedDealType = option;
            }
        },
    },
};
</script>

<style scoped>
.dropdown-toggle {
    display: inline-flex;
    align-items: center;
    color: #1b3b7a;
    border-radius: 1.5rem;
    background-color: #ffffff;
}

.dropdown-toggle:hover {
    background-color: #1b3b7a;
    color: #ffffff;
}

.dropdown-menu.show {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    padding: 0.5rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 1rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.dropdown-item {
    display: flex;
    align-items: center;
}

.form-check-input {
    margin-right: 0.5rem;
}

.dropdown-toggle {
    border-radius: 1.5rem;
}

.default-btn {
    border-color: lightgray;
    color: lightgray;
    font-weight: bold;
}

.selected-btn {
    border-color: #1b3b7a;
    background-color: #1b3b7a;
    color: #ffffff;
}

.v-list-item {
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    transition: background-color 0.2s ease;
}

.v-list-item:hover {
    background-color: #e0f7fa;
}
</style>
